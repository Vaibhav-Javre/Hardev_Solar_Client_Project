import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB using a cached singleton connection suitable for serverless.
 * - 10s timeout gives MongoDB Atlas sufficient time for TLS handshake and replica-set discovery.
 * - Forces IPv4 (family: 4) to avoid IPv6 DNS delays common in cloud serverless environments.
 * - Avoids locking out subsequent requests with artificial cooldowns.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("[MongoDB] Missing MONGODB_URI environment variable.");
    return null;
  }

  // 1. If active and fully connected, return immediately
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. If in the process of connecting, await in-flight promise
  if (cached.conn && cached.conn.connection.readyState === 2 && cached.promise) {
    try {
      return await cached.promise;
    } catch {
      cached.promise = null;
      cached.conn = null;
    }
  }

  // 3. If disconnected or stale, create a new connection promise
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 10000, // 10s for replica set discovery
      connectTimeoutMS: 10000,         // 10s for initial TLS/socket connection
      socketTimeoutMS: 45000,          // 45s query socket timeout
      family: 4,                       // Force IPv4 to eliminate IPv6 DNS lookup delays
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        console.log("[MongoDB] Connected successfully to database.");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        console.error("[MongoDB] Connection failed:", err?.message || err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    console.error("[MongoDB] Unable to establish connection:", (error as Error)?.message || error);
    return null;
  }
}

export default connectToDatabase;
