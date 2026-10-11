/**
 * End-to-End API Integration Test for Solar Calculator & Admin Integration
 */

async function run() {
  const baseUrl = "http://localhost:3000";
  console.log("==================================================");
  console.log("STARTING SOLAR CALCULATOR E2E INTEGRATION TEST");
  console.log("==================================================\n");

  // Step 1: Check Solar Calculator Page
  console.log("1. Verifying /solar-calculator responds with HTTP 200...");
  const pageRes = await fetch(`${baseUrl}/solar-calculator`);
  if (!pageRes.ok) {
    throw new Error(`Failed to load /solar-calculator: status ${pageRes.status}`);
  }
  const pageHtml = await pageRes.text();
  if (!pageHtml.includes("Calculate Your Solar Requirement")) {
    throw new Error("Page HTML does not contain calculator header!");
  }
  console.log("✓ /solar-calculator is live and rendering properly.");

  // Step 2: Submit a lead directly simulating calculator submission
  console.log("\n2. Submitting enquiry with calculator context...");
  const leadPayload = {
    fullName: "Rajesh Shinde",
    phone: "9823456789",
    city: "Pune",
    propertyType: "Commercial",
    monthlyBill: "₹4,000 – ₹8,000",
    estimatedCapacityKW: "8 kW",
    source: "solar_calculator",
    calculatorUsed: true,
    estimatedSystemSize: "8",
    estimatedMonthlyGeneration: 960,
    estimatedAnnualGeneration: 11520,
    estimatedMonthlySavings: 9600,
    estimatedAnnualSavings: 115200,
    estimatedPaybackYears: 4.2,
    roofAreaSqFt: 720,
    message: "Requested commercial solar proposal from interactive calculator.",
  };

  const submitRes = await fetch(`${baseUrl}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadPayload),
  });

  const submitJson = await submitRes.json();
  if (!submitRes.ok || !submitJson.success) {
    throw new Error(`Lead submission failed: ${JSON.stringify(submitJson)}`);
  }
  const leadId = submitJson.leadId;
  console.log(`✓ Lead created successfully with ID: ${leadId}`);

  // Step 3: Authenticate Admin
  console.log("\n3. Authenticating Admin via /api/admin/auth/login...");
  const loginRes = await fetch(`${baseUrl}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@swayaminfraverse.com",
      password: "SwayamSolar@2026!",
    }),
  });

  if (!loginRes.ok) {
    throw new Error(`Admin login failed: status ${loginRes.status}`);
  }
  const setCookie = loginRes.headers.get("set-cookie");
  if (!setCookie) {
    throw new Error("No session cookie set on admin login!");
  }
  const cookieHeader = setCookie.split(";")[0];
  console.log("✓ Admin authenticated successfully.");

  // Step 4: Verify lead in /api/admin/leads
  console.log("\n4. Verifying lead in Admin Leads list with calculator data...");
  const leadsRes = await fetch(`${baseUrl}/api/admin/leads?search=Rajesh`, {
    headers: { Cookie: cookieHeader },
  });
  if (!leadsRes.ok) {
    throw new Error(`Admin leads fetch failed: status ${leadsRes.status}`);
  }
  const leadsJson = await leadsRes.json();
  const matchedLead = leadsJson.leads.find((l) => l.fullName === "Rajesh Shinde");

  if (!matchedLead) {
    throw new Error("Lead 'Rajesh Shinde' not found in admin leads list!");
  }

  console.log("✓ Matched Lead in Admin List:");
  console.log(`  - Name: ${matchedLead.fullName}`);
  console.log(`  - Source: ${matchedLead.source}`);
  console.log(`  - Calculator Used: ${matchedLead.calculatorUsed}`);
  console.log(`  - Estimated System Size: ${matchedLead.estimatedSystemSize}`);
  console.log(`  - Est. Monthly Gen: ${matchedLead.estimatedMonthlyGeneration} units`);
  console.log(`  - Est. Monthly Savings: ₹${matchedLead.estimatedMonthlySavings}`);
  console.log(`  - Est. Annual Savings: ₹${matchedLead.estimatedAnnualSavings}`);
  console.log(`  - Est. Payback: ${matchedLead.estimatedPaybackYears} years`);
  console.log(`  - Roof Area: ${matchedLead.roofAreaSqFt} sq. ft`);

  if (!matchedLead.calculatorUsed || matchedLead.estimatedMonthlyGeneration !== 960) {
    throw new Error("Calculator context was not properly persisted in the lead!");
  }

  // Step 5: Verify single lead detail endpoint
  console.log(`\n5. Verifying single lead detail /api/admin/leads/${matchedLead._id}...`);
  const singleRes = await fetch(`${baseUrl}/api/admin/leads/${matchedLead._id}`, {
    headers: { Cookie: cookieHeader },
  });
  if (!singleRes.ok) {
    throw new Error(`Failed to fetch single lead: status ${singleRes.status}`);
  }
  const singleJson = await singleRes.json();
  if (!singleJson.success || !singleJson.lead) {
    throw new Error("Single lead fetch returned unsuccessful!");
  }
  console.log("✓ Single lead detail API successfully returned all calculator metrics.");

  console.log("\n==================================================");
  console.log("ALL E2E INTEGRATION TESTS PASSED SUCCESSFULLY! ✓");
  console.log("==================================================");
}

run().catch((err) => {
  console.error("\n❌ E2E Test Failed:", err);
  process.exit(1);
});
