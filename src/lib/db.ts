import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailureTime: number;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const FAILURE_COOLDOWN_MS = 30000; // 30 seconds cooldown between retries if offline

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  lastFailureTime: 0,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB using a cached singleton connection.
 * Avoids creating redundant connections on every API request.
 * Handles missing configuration and connection errors gracefully.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    return null;
  }

  // If already connected, return cached connection immediately
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  // If a recent connection attempt failed, fail fast during cooldown window
  const now = Date.now();
  if (cached.lastFailureTime && now - cached.lastFailureTime < FAILURE_COOLDOWN_MS) {
    return null;
  }

  // If a connection attempt is in flight, await it
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 1500,
      connectTimeoutMS: 1500,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.lastFailureTime = 0;
        console.log("[MongoDB] Connected successfully to database.");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        cached.lastFailureTime = Date.now();
        console.warn("[MongoDB] Offline or unreachable, operating in instant in-memory fallback mode:", err.message || err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (_error) {
    cached.promise = null;
    cached.conn = null;
    return null;
  }
}

export default connectToDatabase;
