/**
 * Unit Test Suite for Swayam Infraverse Solar Calculator Utility
 * 
 * Verifies all 10 core calculation requirements:
 * 1. Normal residential case
 * 2. Normal commercial case
 * 3. Low bill (clamped to min supported size 3 kW)
 * 4. High bill (clamped to max supported size 50 kW)
 * 5. Unit-based calculation
 * 6. Bill-based calculation
 * 7. Invalid input (NaN, negative, undefined)
 * 8. Zero input
 * 9. Maximum supported system size
 * 10. Rounding behavior and determinism
 */

import {
  calculateSolarRequirement,
  snapToPracticalSystemSize,
} from "../src/lib/solar-calculator";
import {
  SOLAR_ASSUMPTIONS,
  PRACTICAL_SYSTEM_SIZES_KW,
} from "../src/lib/solar-config";

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, details?: any) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✓ [PASS] ${testName}`);
  } else {
    console.error(`✗ [FAIL] ${testName}`);
    if (details) {
      console.error("  Details:", details);
    }
  }
}

console.log("==================================================");
console.log("RUNNING SOLAR CALCULATOR ENGINE UNIT TESTS");
console.log("==================================================\n");

// Test 1: Normal residential case (e.g. ₹3,500 monthly bill)
const res1 = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: 3500,
});
assert(
  res1.estimatedSystemSize >= 3 &&
  res1.estimatedSystemSize <= 50 &&
  res1.estimatedMonthlyGeneration === res1.estimatedSystemSize * 120 &&
  res1.estimatedAnnualGeneration === res1.estimatedMonthlyGeneration * 12 &&
  res1.propertyTypeDisplay === "Residential",
  "1. Normal residential case returns valid capacity and generation",
  res1
);

// Test 2: Normal commercial case (e.g. ₹15,000 monthly bill)
const res2 = calculateSolarRequirement({
  propertyType: "commercial",
  monthlyBill: 15000,
});
assert(
  res2.estimatedSystemSize >= 3 &&
  res2.propertyTypeDisplay === "Commercial" &&
  res2.estimatedMonthlySavings > 0 &&
  res2.estimatedPaybackPeriodYears > 0,
  "2. Normal commercial case calculates commercial tariffs and payback",
  res2
);

// Test 3: Low bill (e.g. ₹300) should clamp to minimum supported capacity (3 kW)
const res3 = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: 300,
});
assert(
  res3.estimatedSystemSize === SOLAR_ASSUMPTIONS.minSupportedCapacityKW &&
  res3.estimatedSystemSize === 3,
  "3. Low bill correctly clamps to minimum supported capacity (3 kW)",
  { size: res3.estimatedSystemSize }
);

// Test 4: High bill (e.g. ₹5,00,000) should clamp to maximum supported capacity (50 kW)
const res4 = calculateSolarRequirement({
  propertyType: "commercial",
  monthlyBill: 500000,
});
assert(
  res4.estimatedSystemSize === SOLAR_ASSUMPTIONS.maxSupportedCapacityKW &&
  res4.estimatedSystemSize === 50,
  "4. High bill correctly clamps to maximum supported capacity (50 kW)",
  { size: res4.estimatedSystemSize }
);

// Test 5: Unit-based calculation (e.g. 600 units/month)
// 600 units / 120 units/kW = 5 kW
const res5 = calculateSolarRequirement({
  propertyType: "residential",
  monthlyUnitsKWh: 600,
});
assert(
  res5.estimatedSystemSize === 5 &&
  res5.estimatedMonthlyGeneration === 600 &&
  res5.estimatedAnnualGeneration === 7200,
  "5. Unit-based calculation prioritizes kWh units directly (600 kWh -> 5 kW)",
  { size: res5.estimatedSystemSize, gen: res5.estimatedMonthlyGeneration }
);

// Test 6: Bill-based calculation determinism
const res6a = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: 4000,
});
const res6b = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: 4000,
});
assert(
  res6a.estimatedSystemSize === res6b.estimatedSystemSize &&
  res6a.estimatedMonthlySavings === res6b.estimatedMonthlySavings &&
  res6a.estimatedAnnualSavings === res6b.estimatedAnnualSavings,
  "6. Bill-based calculation is purely deterministic across identical inputs",
  { a: res6a.estimatedSystemSize, b: res6b.estimatedSystemSize }
);

// Test 7: Invalid input (NaN, negative, undefined values)
const res7 = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: -5000 as any,
  monthlyUnitsKWh: NaN as any,
});
assert(
  !isNaN(res7.estimatedSystemSize) &&
  !isNaN(res7.estimatedMonthlyGeneration) &&
  !isNaN(res7.estimatedMonthlySavings) &&
  res7.estimatedSystemSize >= 3,
  "7. Invalid input (NaN, negative) safely handled without crashing or NaN",
  res7
);

// Test 8: Zero input
const res8 = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: 0,
});
assert(
  res8.estimatedSystemSize === 3 &&
  !isNaN(res8.estimatedMonthlySavings),
  "8. Zero input safely falls back to default baseline (3 kW)",
  res8
);

// Test 9: Maximum supported system size ceiling check
const snappedHuge = snapToPracticalSystemSize(150);
const snappedNegative = snapToPracticalSystemSize(-10);
assert(
  snappedHuge === 50 && snappedNegative === 3,
  "9. Practical size snapping strictly enforces [3 kW, 50 kW] boundary",
  { huge: snappedHuge, negative: snappedNegative }
);

// Test 10: Rounding behavior & customer-friendly precision
const res10 = calculateSolarRequirement({
  propertyType: "residential",
  monthlyBill: 3777.33,
});
assert(
  Number.isInteger(res10.estimatedMonthlySavings) &&
  Number.isInteger(res10.estimatedAnnualSavings) &&
  Number.isInteger(res10.estimatedMonthlyGeneration) &&
  Number.isInteger(res10.estimatedAnnualGeneration) &&
  Number.isInteger(res10.estimatedRoofAreaRequiredSqFt) &&
  typeof res10.estimatedPaybackPeriodYears === "number" &&
  res10.estimatedPaybackPeriodYears > 0,
  "10. Rounding produces clean whole integer currency and sensible decimal payback",
  {
    monthlySavings: res10.estimatedMonthlySavings,
    annualSavings: res10.estimatedAnnualSavings,
    payback: res10.estimatedPaybackPeriodYears,
  }
);

console.log("\n--------------------------------------------------");
console.log(`TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
console.log("--------------------------------------------------");

if (passedTests !== totalTests) {
  process.exit(1);
}
