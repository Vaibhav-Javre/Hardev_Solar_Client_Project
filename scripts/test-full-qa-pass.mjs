/**
 * Comprehensive QA & User Journey Test Suite for Swayam Infraverse
 */

const BASE_URL = "http://localhost:3000";

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName, details) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ [PASS] ${testName}`);
  } else {
    console.error(`✗ [FAIL] ${testName}`);
    if (details) console.error("  Details:", details);
  }
}

async function run() {
  console.log("==================================================");
  console.log("SWAYAM INFRAVERSE - FULL PRODUCTION QA SUITE");
  console.log("==================================================\n");

  // -------------------------------------------------------------------------
  // 1. PUBLIC ROUTES & SEO HEALTH CHECK
  // -------------------------------------------------------------------------
  console.log("--- 1. Testing Public Routes & SEO ---");
  const publicRoutes = [
    "/",
    "/about",
    "/services",
    "/services/residential-solar",
    "/services/commercial-solar",
    "/projects",
    "/projects/5-kw-residential-rooftop-solar",
    "/solar-calculator",
    "/contact",
    "/faq",
    "/sitemap.xml",
    "/robots.txt",
  ];

  for (const route of publicRoutes) {
    const res = await fetch(`${BASE_URL}${route}`);
    assert(res.status === 200, `Public route ${route} returned HTTP 200`, { status: res.status });
  }

  // Verify robots.txt blocks /admin
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await robotsRes.text();
  assert(
    robotsText.includes("Disallow: /admin") || robotsText.includes("disallow: /admin"),
    "robots.txt prevents crawling of /admin paths",
    { robotsText }
  );

  // -------------------------------------------------------------------------
  // 2. STANDARD CONTACT FORM LEAD SUBMISSION (No calculator)
  // -------------------------------------------------------------------------
  console.log("\n--- 2. Testing Standard Contact Lead Submission ---");
  const contactLeadPayload = {
    fullName: "Amit Sharma",
    phone: "9812345678",
    email: "amit.sharma@example.com",
    city: "Nashik",
    propertyType: "Residential",
    monthlyBill: "₹2,500 – ₹4,000",
    interestedService: "Residential Solar",
    message: "Interested in a standard rooftop installation for bungalow.",
    source: "contact_page",
  };

  const contactRes = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactLeadPayload),
  });
  const contactJson = await contactRes.json();
  assert(
    (contactRes.status === 200 || contactRes.status === 201) && contactJson.success && contactJson.leadId,
    "Standard contact lead submitted successfully",
    contactJson
  );
  const contactLeadId = contactJson.leadId;

  // -------------------------------------------------------------------------
  // 3. SOLAR CALCULATOR ENQUIRY SUBMISSION (With full context)
  // -------------------------------------------------------------------------
  console.log("\n--- 3. Testing Solar Calculator Lead Submission ---");
  const calcLeadPayload = {
    fullName: "Sunita Deshmukh",
    phone: "9876501234",
    email: "sunita@example.com",
    city: "Pune",
    propertyType: "Residential",
    monthlyBill: "₹4,000 – ₹8,000 / month",
    estimatedCapacityKW: "8 kW",
    source: "solar_calculator",
    calculatorUsed: true,
    estimatedSystemSize: "8",
    estimatedMonthlyGeneration: 960,
    estimatedAnnualGeneration: 11520,
    estimatedMonthlySavings: 7680,
    estimatedAnnualSavings: 92160,
    estimatedPaybackYears: 4.8,
    roofAreaSqFt: 720,
    message: "Pre-filled from Solar Calculator: estimated 8 kW plant.",
  };

  const calcRes = await fetch(`${BASE_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(calcLeadPayload),
  });
  const calcJson = await calcRes.json();
  assert(
    (calcRes.status === 200 || calcRes.status === 201) && calcJson.success && calcJson.leadId,
    "Calculator lead submitted successfully with calculation context",
    calcJson
  );
  const calcLeadId = calcJson.leadId;

  // -------------------------------------------------------------------------
  // 4. ADMIN AUTHENTICATION SECURITY AUDIT
  // -------------------------------------------------------------------------
  console.log("\n--- 4. Testing Admin API Security & Authentication ---");
  
  // Unauthenticated request must receive 401
  const unauthRes = await fetch(`${BASE_URL}/api/admin/leads`);
  assert(unauthRes.status === 401, "Unauthenticated access to /api/admin/leads rejected with 401", {
    status: unauthRes.status,
  });

  // Invalid login attempt must fail with 401
  const wrongLoginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@swayaminfraverse.com", password: "WrongPassword123" }),
  });
  assert(wrongLoginRes.status === 401, "Invalid password login rejected with 401", {
    status: wrongLoginRes.status,
  });

  // Valid login
  const loginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@swayaminfraverse.com", password: "SwayamSolar@2026!" }),
  });
  assert(loginRes.status === 200, "Valid admin login succeeded with 200", { status: loginRes.status });

  const setCookie = loginRes.headers.get("set-cookie");
  const cookieHeader = setCookie?.split(";")[0] || "";
  assert(cookieHeader.includes("admin_session="), "admin_session HTTP-Only cookie was issued");

  // -------------------------------------------------------------------------
  // 5. ADMIN DASHBOARD STATS VERIFICATION
  // -------------------------------------------------------------------------
  console.log("\n--- 5. Testing Admin Dashboard Stats ---");
  const statsRes = await fetch(`${BASE_URL}/api/admin/stats`, {
    headers: { Cookie: cookieHeader },
  });
  const statsJson = await statsRes.json();
  assert(
    statsRes.status === 200 && statsJson.success && statsJson.stats.totalLeads >= 2,
    "Admin stats endpoint returns real MongoDB/memory pipeline counts",
    statsJson.stats
  );

  // -------------------------------------------------------------------------
  // 6. ADMIN LEADS SEARCH, FILTER & DETAIL VERIFICATION
  // -------------------------------------------------------------------------
  console.log("\n--- 6. Testing Admin Leads Management ---");
  
  // Verify calculator lead in list
  const leadsRes = await fetch(`${BASE_URL}/api/admin/leads?search=Sunita`, {
    headers: { Cookie: cookieHeader },
  });
  const leadsJson = await leadsRes.json();
  const sunitaLead = leadsJson.leads?.find((l) => l.fullName === "Sunita Deshmukh");
  assert(
    Boolean(sunitaLead) && sunitaLead.calculatorUsed === true && sunitaLead.estimatedMonthlyGeneration === 960,
    "Calculator lead retrieved in admin with full context intact",
    sunitaLead
  );

  // Verify non-calculator lead in list
  const amitRes = await fetch(`${BASE_URL}/api/admin/leads?search=Amit`, {
    headers: { Cookie: cookieHeader },
  });
  const amitJson = await amitRes.json();
  const amitLead = amitJson.leads?.find((l) => l.fullName === "Amit Sharma");
  assert(
    Boolean(amitLead) && amitLead.calculatorUsed === false,
    "Standard contact lead correctly reflects calculatorUsed: false",
    amitLead
  );

  // Update status to CONTACTED
  const updateRes = await fetch(`${BASE_URL}/api/admin/leads/${calcLeadId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ status: "CONTACTED" }),
  });
  const updateJson = await updateRes.json();
  assert(
    updateRes.status === 200 && updateJson.success,
    "Lead status successfully updated to CONTACTED",
    updateJson
  );

  // -------------------------------------------------------------------------
  // 7. PROJECT PUBLISHING LIFECYCLE
  // -------------------------------------------------------------------------
  console.log("\n--- 7. Testing Project Showcase Publishing Lifecycle ---");
  
  // Create unpublished draft project
  const createProjRes = await fetch(`${BASE_URL}/api/admin/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({
      title: "Test Draft Industrial Solar Plant",
      slug: "test-draft-industrial-solar-plant",
      description: "A draft commercial project for QA testing.",
      capacity: "40 kW",
      location: "Chakan MIDC, Pune",
      type: "Commercial",
      published: false,
    }),
  });
  const createProjJson = await createProjRes.json();
  assert((createProjRes.status === 200 || createProjRes.status === 201) && createProjJson.success, "Admin successfully created draft project");
  const testProjId = createProjJson.project?._id || createProjJson.id;

  // Verify it does NOT appear on public API
  const publicProjRes1 = await fetch(`${BASE_URL}/api/projects`);
  const publicProjJson1 = await publicProjRes1.json();
  const foundDraftInPublic = publicProjJson1.projects?.some((p) => p.slug === "test-draft-industrial-solar-plant");
  assert(!foundDraftInPublic, "Unpublished draft project does NOT appear in public projects API");

  // Publish the project
  const pubProjRes = await fetch(`${BASE_URL}/api/admin/projects/${testProjId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ published: true }),
  });
  assert(pubProjRes.status === 200, "Admin successfully published project");

  // Verify it NOW appears on public API
  const publicProjRes2 = await fetch(`${BASE_URL}/api/projects`);
  const publicProjJson2 = await publicProjRes2.json();
  const foundPublished = publicProjJson2.projects?.some((p) => p.slug === "test-draft-industrial-solar-plant");
  assert(foundPublished, "Published project immediately appears on public projects API");

  // Clean up: delete test project
  const delProjRes = await fetch(`${BASE_URL}/api/admin/projects/${testProjId}`, {
    method: "DELETE",
    headers: { Cookie: cookieHeader },
  });
  assert(delProjRes.status === 200, "Admin successfully deleted test project");

  // Deleting again should return 404
  const delProjRes2 = await fetch(`${BASE_URL}/api/admin/projects/${testProjId}`, {
    method: "DELETE",
    headers: { Cookie: cookieHeader },
  });
  assert(delProjRes2.status === 404, "Deleting non-existent project correctly returns HTTP 404", {
    status: delProjRes2.status,
  });

  // -------------------------------------------------------------------------
  // 8. TESTIMONIAL MANAGEMENT LIFECYCLE
  // -------------------------------------------------------------------------
  console.log("\n--- 8. Testing Testimonials Management Lifecycle ---");
  
  const createTestimonialRes = await fetch(`${BASE_URL}/api/admin/testimonials`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({
      customerName: "Vikas Kulkarni",
      location: "Kothrud, Pune",
      review: "Excellent rooftop solar installation and transparent guidance throughout.",
      rating: 5,
      published: false,
    }),
  });
  const createTestimonialJson = await createTestimonialRes.json();
  assert((createTestimonialRes.status === 200 || createTestimonialRes.status === 201) && createTestimonialJson.success, "Admin created test testimonial");
  const testTestimonialId = createTestimonialJson.testimonial?._id || createTestimonialJson.id;

  // Check public endpoint hides draft
  const publicTestimonialRes1 = await fetch(`${BASE_URL}/api/testimonials`);
  const publicTestimonialJson1 = await publicTestimonialRes1.json();
  const foundDraftReview = publicTestimonialJson1.testimonials?.some((t) => t.customerName === "Vikas Kulkarni");
  assert(!foundDraftReview, "Draft testimonial does NOT appear on public API");

  // Publish review
  const pubReviewRes = await fetch(`${BASE_URL}/api/admin/testimonials/${testTestimonialId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader },
    body: JSON.stringify({ published: true }),
  });
  assert(pubReviewRes.status === 200, "Admin successfully published testimonial");

  // Check public endpoint shows published review
  const publicTestimonialRes2 = await fetch(`${BASE_URL}/api/testimonials`);
  const publicTestimonialJson2 = await publicTestimonialRes2.json();
  const foundPublishedReview = publicTestimonialJson2.testimonials?.some((t) => t.customerName === "Vikas Kulkarni");
  assert(foundPublishedReview, "Published testimonial immediately appears on public API");

  // Clean up: delete test testimonial
  const delReviewRes = await fetch(`${BASE_URL}/api/admin/testimonials/${testTestimonialId}`, {
    method: "DELETE",
    headers: { Cookie: cookieHeader },
  });
  assert(delReviewRes.status === 200, "Admin successfully deleted test testimonial");

  // -------------------------------------------------------------------------
  // 9. CLEAN UP TEST LEADS & 404 VERIFICATION
  // -------------------------------------------------------------------------
  console.log("\n--- 9. Testing Lead Deletion & Missing Record 404 ---");
  const delLeadRes1 = await fetch(`${BASE_URL}/api/admin/leads/${contactLeadId}`, {
    method: "DELETE",
    headers: { Cookie: cookieHeader },
  });
  assert(delLeadRes1.status === 200, `Successfully deleted test contact lead ${contactLeadId}`);

  const delLeadRes2 = await fetch(`${BASE_URL}/api/admin/leads/${calcLeadId}`, {
    method: "DELETE",
    headers: { Cookie: cookieHeader },
  });
  assert(delLeadRes2.status === 200, `Successfully deleted test calculator lead ${calcLeadId}`);

  // Deleting again should return 404
  const delLeadRes3 = await fetch(`${BASE_URL}/api/admin/leads/${calcLeadId}`, {
    method: "DELETE",
    headers: { Cookie: cookieHeader },
  });
  assert(delLeadRes3.status === 404, "Deleting already deleted lead correctly returns HTTP 404", {
    status: delLeadRes3.status,
  });

  // -------------------------------------------------------------------------
  // 10. ADMIN LOGOUT VERIFICATION
  // -------------------------------------------------------------------------
  console.log("\n--- 10. Testing Admin Logout ---");
  const logoutRes = await fetch(`${BASE_URL}/api/admin/auth/logout`, {
    method: "POST",
    headers: { Cookie: cookieHeader },
  });
  assert(logoutRes.status === 200, "Logout API returned HTTP 200");

  const clearedCookie = logoutRes.headers.get("set-cookie") || "";
  assert(clearedCookie.includes("admin_session=;") || clearedCookie.includes("Max-Age=0"), "Session cookie was cleared on logout");

  console.log("\n==================================================");
  console.log(`QA TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
  console.log("==================================================");

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("\n❌ QA Test Failed:", err);
  process.exit(1);
});
