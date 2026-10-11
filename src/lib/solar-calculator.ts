/**
 * Hardev Solar Services × Swayam Infraverse - Dedicated Solar Sizing & Savings Calculation Engine
 * 
 * Central calculation engine accepting user inputs and returning structured,
 * indicative estimates for rooftop solar installations (3 kW to 50 kW).
 * 
 * All outputs are marked and formatted as ESTIMATES.
 */

import {
  SOLAR_ASSUMPTIONS,
  DEFAULT_BILL_BRACKETS,
  PRACTICAL_SYSTEM_SIZES_KW,
  CALCULATOR_DISCLAIMER,
  SolarAssumptions,
} from "./solar-config";

export type PropertyType = "residential" | "commercial";

export type BillBracket =
  | "below_1500"
  | "1500_2500"
  | "2500_4000"
  | "4000_8000"
  | "8000_15000"
  | "above_15000"
  | "above_8000"; // backward compatibility alias

export interface SolarCalculatorInputs {
  /**
   * Installation customer category: residential home or commercial establishment
   */
  propertyType: PropertyType;

  /**
   * Monthly electricity bill in INR. If provided, must be > 0.
   */
  monthlyBill?: number;

  /**
   * Predefined bill range identifier (e.g. "2500_4000")
   */
  billBracket?: BillBracket | string;

  /**
   * Direct monthly electricity consumption in kWh units.
   * If provided and > 0, takes precedence over bill-based consumption estimation.
   */
  monthlyUnitsKWh?: number;

  /**
   * Direct preferred system capacity (3 kW to 50 kW).
   * If provided, overrides automated sizing.
   */
  preferredSystemSizeKW?: number;

  /**
   * Available shadow-free rooftop terrace area in sq. ft.
   * Optional field used for physical roof viability comparison.
   */
  availableRoofAreaSqFt?: number;

  /**
   * City / Location of installation (optional)
   */
  city?: string;

  /**
   * Optional custom overrides for calculation assumptions (e.g. testing)
   */
  customAssumptions?: Partial<SolarAssumptions>;
}

export interface SolarCalculationResult {
  /**
   * Recommended / estimated solar capacity in kW (e.g. 5)
   */
  estimatedSystemSize: number;

  /**
   * Formatted capacity display (e.g. "5 kW")
   */
  estimatedSystemSizeDisplay: string;

  /**
   * Alias for backward compatibility
   */
  recommendedCapacityKW: number;

  /**
   * Estimated monthly solar generation in kWh (units)
   */
  estimatedMonthlyGeneration: number;

  /**
   * Alias for backward compatibility
   */
  estimatedUnitsPerMonth: number;

  /**
   * Estimated annual solar generation in kWh (units)
   */
  estimatedAnnualGeneration: number;

  /**
   * Estimated monthly savings in INR
   */
  estimatedMonthlySavings: number;

  /**
   * Estimated annual savings in INR
   */
  estimatedAnnualSavings: number;

  /**
   * Indicative payback period in years (e.g. 4.2 years)
   */
  estimatedPaybackPeriodYears: number;

  /**
   * Estimated shadow-free rooftop space required in sq. ft
   */
  estimatedRoofAreaRequiredSqFt: number;

  /**
   * Alias for backward compatibility
   */
  estimatedRoofAreaSqFt: number;

  /**
   * Estimated annual CO2 offset in kg / year
   */
  estimatedCO2OffsetKgPerYear: number;

  /**
   * If availableRoofAreaSqFt was provided, indicates whether the estimated system fits
   */
  roofAreaFits: boolean | null;

  /**
   * Formatted display of the input bill range / amount
   */
  billRangeDisplay: string;

  /**
   * Formatted property type display
   */
  propertyTypeDisplay: string;

  /**
   * Estimated monthly units consumed (kWh)
   */
  estimatedMonthlyConsumptionUnits: number;

  /**
   * Central disclaimer text
   */
  disclaimer: string;
}

/**
 * Backward-compatible BILL_BRACKETS export
 */
export const BILL_BRACKETS = DEFAULT_BILL_BRACKETS.map((b) => ({
  id: b.id as BillBracket,
  label: b.label,
  approxMonthlyBill: b.approxMonthlyBill,
}));

/**
 * Normalizes and clamps system size to practical commercial steps
 * within Hardev Solar Services' verified scope (3 kW to 50 kW).
 */
export function snapToPracticalSystemSize(
  rawCapacity: number,
  minKW: number = SOLAR_ASSUMPTIONS.minSupportedCapacityKW,
  maxKW: number = SOLAR_ASSUMPTIONS.maxSupportedCapacityKW
): number {
  if (isNaN(rawCapacity) || rawCapacity <= 0) {
    return minKW;
  }

  if (rawCapacity <= minKW) {
    return minKW;
  }

  if (rawCapacity >= maxKW) {
    return maxKW;
  }

  // Find the closest practical standard size
  let closest = PRACTICAL_SYSTEM_SIZES_KW[0];
  let minDiff = Math.abs(rawCapacity - closest);

  for (const size of PRACTICAL_SYSTEM_SIZES_KW) {
    const diff = Math.abs(rawCapacity - size);
    if (diff < minDiff) {
      minDiff = diff;
      closest = size;
    }
  }

  return closest;
}

/**
 * Core calculation function for solar sizing and indicative savings.
 * 
 * Pure, deterministic function that:
 * 1. Sanitizes inputs (protecting against NaN, Infinity, negative values).
 * 2. Determines monthly consumption via direct units or bill tariff division.
 * 3. Sizes solar capacity (clamped between 3 kW and 50 kW).
 * 4. Computes generation, monetary savings, and indicative payback period.
 * 5. Returns structured results with clear "Estimated" semantics.
 */
export function calculateSolarRequirement(
  inputs: SolarCalculatorInputs | {
    propertyType: PropertyType;
    billBracket?: BillBracket;
    customBillAmount?: number;
  }
): SolarCalculationResult {
  // Support legacy input signature
  const normalizedInputs: SolarCalculatorInputs = {
    propertyType: inputs.propertyType || "residential",
    monthlyBill:
      "monthlyBill" in inputs
        ? inputs.monthlyBill
        : "customBillAmount" in inputs
        ? inputs.customBillAmount
        : undefined,
    billBracket: "billBracket" in inputs ? inputs.billBracket : undefined,
    monthlyUnitsKWh: "monthlyUnitsKWh" in inputs ? inputs.monthlyUnitsKWh : undefined,
    preferredSystemSizeKW: "preferredSystemSizeKW" in inputs ? inputs.preferredSystemSizeKW : undefined,
    availableRoofAreaSqFt: "availableRoofAreaSqFt" in inputs ? inputs.availableRoofAreaSqFt : undefined,
    city: "city" in inputs ? inputs.city : undefined,
    customAssumptions: "customAssumptions" in inputs ? inputs.customAssumptions : undefined,
  };

  const assumptions: SolarAssumptions = {
    ...SOLAR_ASSUMPTIONS,
    ...(normalizedInputs.customAssumptions || {}),
  };

  const propertyType = normalizedInputs.propertyType === "commercial" ? "commercial" : "residential";
  const tariff =
    propertyType === "commercial"
      ? assumptions.defaultTariffCommercial
      : assumptions.defaultTariffResidential;

  // 1. Determine monthly consumption in kWh units
  let monthlyUnits = 0;
  let billRangeDisplay = "₹2,500 – ₹4,000 / month";
  let effectiveMonthlyBill = 0;

  // Priority A: Direct user consumption in units (kWh)
  if (
    typeof normalizedInputs.monthlyUnitsKWh === "number" &&
    !isNaN(normalizedInputs.monthlyUnitsKWh) &&
    normalizedInputs.monthlyUnitsKWh > 0
  ) {
    monthlyUnits = Math.round(normalizedInputs.monthlyUnitsKWh);
    effectiveMonthlyBill = Math.round(monthlyUnits * tariff);
    billRangeDisplay = `${monthlyUnits.toLocaleString("en-IN")} units (kWh) / month`;
  }
  // Priority B: Direct custom bill amount
  else if (
    typeof normalizedInputs.monthlyBill === "number" &&
    !isNaN(normalizedInputs.monthlyBill) &&
    normalizedInputs.monthlyBill > 0
  ) {
    effectiveMonthlyBill = Math.round(normalizedInputs.monthlyBill);
    monthlyUnits = Math.round(effectiveMonthlyBill / (tariff > 0 ? tariff : 8.0));
    billRangeDisplay = `₹${effectiveMonthlyBill.toLocaleString("en-IN")} / month`;
  }
  // Priority C: Bill bracket selection
  else if (normalizedInputs.billBracket) {
    const matched = DEFAULT_BILL_BRACKETS.find(
      (b) => b.id === normalizedInputs.billBracket || (b.id === "above_15000" && normalizedInputs.billBracket === "above_8000")
    );
    if (matched) {
      effectiveMonthlyBill = matched.approxMonthlyBill;
      monthlyUnits = Math.round(effectiveMonthlyBill / tariff);
      billRangeDisplay = matched.label;
    } else {
      effectiveMonthlyBill = 3500;
      monthlyUnits = Math.round(effectiveMonthlyBill / tariff);
      billRangeDisplay = "₹2,500 – ₹4,000 / month";
    }
  }
  // Default fallback if no input provided
  else {
    effectiveMonthlyBill = 3500;
    monthlyUnits = Math.round(effectiveMonthlyBill / tariff);
    billRangeDisplay = "₹2,500 – ₹4,000 / month";
  }

  // 2. Determine System Capacity (kW)
  let systemSizeKW = assumptions.minSupportedCapacityKW;

  if (
    typeof normalizedInputs.preferredSystemSizeKW === "number" &&
    !isNaN(normalizedInputs.preferredSystemSizeKW) &&
    normalizedInputs.preferredSystemSizeKW > 0
  ) {
    // User explicitly chose a system capacity
    systemSizeKW = Math.min(
      Math.max(normalizedInputs.preferredSystemSizeKW, assumptions.minSupportedCapacityKW),
      assumptions.maxSupportedCapacityKW
    );
  } else {
    // Automated sizing based on monthly units:
    // Raw capacity = monthlyUnits / (generationPerKwPerMonth)
    const rawCapacity = monthlyUnits / Math.max(assumptions.generationPerKwPerMonth, 1);
    systemSizeKW = snapToPracticalSystemSize(
      rawCapacity,
      assumptions.minSupportedCapacityKW,
      assumptions.maxSupportedCapacityKW
    );
  }

  // 3. Estimated Generation
  // Monthly units = systemSizeKW * generationPerKwPerMonth
  const estimatedMonthlyGeneration = Math.round(systemSizeKW * assumptions.generationPerKwPerMonth);
  const estimatedAnnualGeneration = estimatedMonthlyGeneration * 12;

  // 4. Estimated Savings (indicative electricity cost offset)
  // Monthly savings = units generated * applicable tariff
  // Clamped so savings don't unrealistically exceed actual bill if bill was specified
  const rawMonthlySavings = Math.round(estimatedMonthlyGeneration * tariff);
  const estimatedMonthlySavings = effectiveMonthlyBill > 0
    ? Math.min(rawMonthlySavings, Math.round(effectiveMonthlyBill * 1.15)) // Cap at ~115% of bill for net-metering export
    : rawMonthlySavings;

  const estimatedAnnualSavings = estimatedMonthlySavings * 12;

  // 5. Estimated Payback Period (indicative years)
  // Capital cost = systemSizeKW * costPerKw
  const costPerKw =
    propertyType === "commercial"
      ? assumptions.estimatedCostPerKwCommercial
      : assumptions.estimatedCostPerKwResidential;
  const estimatedCapitalCost = systemSizeKW * costPerKw;

  let estimatedPaybackPeriodYears = 4.5;
  if (estimatedAnnualSavings > 0) {
    const rawPayback = estimatedCapitalCost / estimatedAnnualSavings;
    // Format to 1 decimal place, reasonable range (3 to 8 years)
    estimatedPaybackPeriodYears = Math.min(Math.max(Math.round(rawPayback * 10) / 10, 2.5), 10.0);
  }

  // 6. Rooftop Space Requirements
  const estimatedRoofAreaRequiredSqFt = systemSizeKW * assumptions.roofAreaPerKwSqFt;

  let roofAreaFits: boolean | null = null;
  if (
    typeof normalizedInputs.availableRoofAreaSqFt === "number" &&
    !isNaN(normalizedInputs.availableRoofAreaSqFt) &&
    normalizedInputs.availableRoofAreaSqFt > 0
  ) {
    roofAreaFits = normalizedInputs.availableRoofAreaSqFt >= estimatedRoofAreaRequiredSqFt;
  }

  // 7. CO2 Environmental Offset
  const estimatedCO2OffsetKgPerYear = Math.round(
    estimatedAnnualGeneration * assumptions.co2ReductionKgPerKwh
  );

  return {
    estimatedSystemSize: systemSizeKW,
    estimatedSystemSizeDisplay: `${systemSizeKW} kW`,
    recommendedCapacityKW: systemSizeKW, // Compatibility
    estimatedMonthlyGeneration,
    estimatedUnitsPerMonth: estimatedMonthlyGeneration, // Compatibility
    estimatedAnnualGeneration,
    estimatedMonthlySavings,
    estimatedAnnualSavings,
    estimatedPaybackPeriodYears,
    estimatedRoofAreaRequiredSqFt,
    estimatedRoofAreaSqFt: estimatedRoofAreaRequiredSqFt, // Compatibility
    estimatedCO2OffsetKgPerYear,
    roofAreaFits,
    billRangeDisplay,
    propertyTypeDisplay:
      propertyType === "residential" ? "Residential" : "Commercial",
    estimatedMonthlyConsumptionUnits: monthlyUnits,
    disclaimer: CALCULATOR_DISCLAIMER,
  };
}
