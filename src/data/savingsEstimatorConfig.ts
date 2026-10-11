// Hardev Solar Services × Swayam Infraverse - Solar Savings Estimator Configuration & Logic
// Assumptions and calculations for 3 kW to 50 kW systems.
// Calculations are indicative estimates and not guaranteed savings.

import {
  SOLAR_ASSUMPTIONS,
  DEFAULT_BILL_BRACKETS,
  PRACTICAL_SYSTEM_SIZES_KW,
  CALCULATOR_DISCLAIMER,
} from "@/lib/solar-config";

export type PropertyType = "residential" | "commercial";

export type BillOption =
  | "below_1500"
  | "1500_2500"
  | "2500_4000"
  | "4000_8000"
  | "above_8000";

export const BILL_OPTIONS: {
  id: BillOption;
  label: string;
  approxMonthlyBill: number;
  typicalCapacityKW: number;
}[] = [
  { id: "below_1500", label: "Below ₹1,500", approxMonthlyBill: 1200, typicalCapacityKW: 3 },
  { id: "1500_2500", label: "₹1,500 – ₹2,500", approxMonthlyBill: 2000, typicalCapacityKW: 3 },
  { id: "2500_4000", label: "₹2,500 – ₹4,000", approxMonthlyBill: 3200, typicalCapacityKW: 5 },
  { id: "4000_8000", label: "₹4,000 – ₹8,000", approxMonthlyBill: 6000, typicalCapacityKW: 8 },
  { id: "above_8000", label: "Above ₹8,000", approxMonthlyBill: 12000, typicalCapacityKW: 15 },
];

export const SYSTEM_SIZES = [...PRACTICAL_SYSTEM_SIZES_KW];

export const ESTIMATOR_ASSUMPTIONS = {
  unitsPerKwPerMonth: SOLAR_ASSUMPTIONS.generationPerKwPerMonth,
  residentialTariffPerUnit: SOLAR_ASSUMPTIONS.defaultTariffResidential,
  commercialTariffPerUnit: SOLAR_ASSUMPTIONS.defaultTariffCommercial,
  roofAreaSqFtPerKw: SOLAR_ASSUMPTIONS.roofAreaPerKwSqFt,
  co2ReductionKgPerKwh: SOLAR_ASSUMPTIONS.co2ReductionKgPerKwh,
} as const;

export interface SavingsEstimateResult {
  systemSizeKW: number;
  propertyType: PropertyType;
  estimatedMonthlyUnits: number;
  estimatedMonthlySavingsINR: number;
  estimatedAnnualSavingsINR: number;
  estimatedRoofAreaSqFt: number;
  estimatedCO2OffsetKgPerYear: number;
  billContextLabel: string;
  disclaimer: string;
}

/**
 * Calculates estimated solar metrics based on either chosen system size or monthly bill.
 * All results are clearly flagged as estimates.
 */
export function calculateSavingsEstimate(params: {
  propertyType: PropertyType;
  systemSizeKW?: number;
  billOption?: BillOption;
}): SavingsEstimateResult {
  const { propertyType } = params;
  
  let capacityKW = params.systemSizeKW;
  let billContext = "Direct System Size Selection";

  if (!capacityKW && params.billOption) {
    const matchedBill = BILL_OPTIONS.find((b) => b.id === params.billOption);
    if (matchedBill) {
      capacityKW = matchedBill.typicalCapacityKW;
      billContext = matchedBill.label;
    }
  }

  // Fallback to baseline 3 kW if none provided
  if (!capacityKW || capacityKW < SOLAR_ASSUMPTIONS.minSupportedCapacityKW) {
    capacityKW = SOLAR_ASSUMPTIONS.minSupportedCapacityKW;
  }
  if (capacityKW > SOLAR_ASSUMPTIONS.maxSupportedCapacityKW) {
    capacityKW = SOLAR_ASSUMPTIONS.maxSupportedCapacityKW;
  }

  const tariff =
    propertyType === "commercial"
      ? SOLAR_ASSUMPTIONS.defaultTariffCommercial
      : SOLAR_ASSUMPTIONS.defaultTariffResidential;

  // Monthly generation (units = kWh)
  const estimatedMonthlyUnits = Math.round(capacityKW * SOLAR_ASSUMPTIONS.generationPerKwPerMonth);

  // Monthly savings in INR
  const estimatedMonthlySavingsINR = Math.round(estimatedMonthlyUnits * tariff);

  // Annual savings in INR
  const estimatedAnnualSavingsINR = estimatedMonthlySavingsINR * 12;

  // Roof space in sq. ft
  const estimatedRoofAreaSqFt = Math.round(capacityKW * SOLAR_ASSUMPTIONS.roofAreaPerKwSqFt);

  // CO2 offset in kg / year
  const estimatedCO2OffsetKgPerYear = Math.round(
    estimatedMonthlyUnits * 12 * SOLAR_ASSUMPTIONS.co2ReductionKgPerKwh
  );

  return {
    systemSizeKW: capacityKW,
    propertyType,
    estimatedMonthlyUnits,
    estimatedMonthlySavingsINR,
    estimatedAnnualSavingsINR,
    estimatedRoofAreaSqFt,
    estimatedCO2OffsetKgPerYear,
    billContextLabel: billContext,
    disclaimer: CALCULATOR_DISCLAIMER,
  };
}
