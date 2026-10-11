/**
 * Hardev Solar Services × Swayam Infraverse - Centralized Solar Calculator Configuration & Assumptions
 * 
 * IMPORTANT:
 * All numerical values defined below represent INDICATIVE DEVELOPMENT DEFAULTS
 * based on standard Indian solar PV engineering rules-of-thumb (MNRE guidelines,
 * typical Maharashtra / Western India irradiance of ~4-4.5 peak sun hours/day).
 * 
 * NOTE FOR CLIENT / PRODUCTION DEPLOYMENT:
 * Before official commercial rollout, the following default assumptions MUST BE
 * reviewed and updated with Hardev Solar Services' verified engineering specifications
 * and DISCOM-specific tariff schedules (MSEDCL / Adani Electricity / Tata Power):
 * 1. defaultTariffPerUnit (Residential & Commercial)
 * 2. generationPerKwPerMonth (Regional specific yield in kWh/kWp/month)
 * 3. estimatedCapitalCostPerKw (Indicative benchmark system cost for payback estimates)
 * 4. systemEfficiency (Standard BOS derating factor)
 */

export interface SolarAssumptions {
  /**
   * Average electricity generation per 1 kW solar PV capacity per month.
   * DEVELOPMENT DEFAULT: 120 units (kWh/month) based on ~4 units/kWp/day * 30 days.
   * Subject to seasonal variation (monsoon vs summer) and orientation.
   */
  generationPerKwPerMonth: number;

  /**
   * Typical residential DISCOM tariff rate in INR per unit (kWh).
   * DEVELOPMENT DEFAULT: ₹8.00 / unit (approximate blended slab rate in Maharashtra).
   */
  defaultTariffResidential: number;

  /**
   * Typical commercial / LT-commercial tariff rate in INR per unit (kWh).
   * DEVELOPMENT DEFAULT: ₹10.00 / unit (approximate commercial tariff without TOD peak charges).
   */
  defaultTariffCommercial: number;

  /**
   * Indicative installed turnkey EPC benchmark cost per kW for residential rooftop (INR).
   * DEVELOPMENT DEFAULT: ₹55,000 / kW (indicative, excluding central subsidy / PM Surya Ghar).
   * Used strictly for indicative payback period calculation.
   */
  estimatedCostPerKwResidential: number;

  /**
   * Indicative installed turnkey EPC benchmark cost per kW for commercial rooftop (INR).
   * DEVELOPMENT DEFAULT: ₹48,000 / kW (indicative commercial scale economies).
   * Used strictly for indicative payback period calculation.
   */
  estimatedCostPerKwCommercial: number;

  /**
   * Rooftop space requirement in sq. ft of shadow-free terrace per 1 kW capacity.
   * DEVELOPMENT DEFAULT: 90 sq. ft / kW (assuming high-efficiency mono PERC / TOPCon modules).
   */
  roofAreaPerKwSqFt: number;

  /**
   * Average CO2 offset in kg per kWh of solar generated in India.
   * DEVELOPMENT DEFAULT: 0.82 kg CO2 / kWh (Central Electricity Authority CO2 baseline database).
   */
  co2ReductionKgPerKwh: number;

  /**
   * Standard system performance ratio (PR) / overall efficiency factor.
   * DEVELOPMENT DEFAULT: 0.78 (78% accounting for inverter efficiency, thermal loss, soiling).
   */
  systemEfficiency: number;

  /**
   * Hardev Solar Services supported project capacity boundaries (kW).
   * Project portfolio scope is 3 kW to 50 kW.
   */
  minSupportedCapacityKW: number;
  maxSupportedCapacityKW: number;
}

export const SOLAR_ASSUMPTIONS: SolarAssumptions = {
  generationPerKwPerMonth: 120, // DEVELOPMENT DEFAULT
  defaultTariffResidential: 8.0, // DEVELOPMENT DEFAULT: ~₹8/kWh
  defaultTariffCommercial: 10.0, // DEVELOPMENT DEFAULT: ~₹10/kWh
  estimatedCostPerKwResidential: 55000, // DEVELOPMENT DEFAULT: ~₹55k/kW
  estimatedCostPerKwCommercial: 48000, // DEVELOPMENT DEFAULT: ~₹48k/kW
  roofAreaPerKwSqFt: 90, // DEVELOPMENT DEFAULT: 90 sq ft/kW
  co2ReductionKgPerKwh: 0.82, // DEVELOPMENT DEFAULT: CEA India baseline
  systemEfficiency: 0.78, // DEVELOPMENT DEFAULT: 78% Performance Ratio
  minSupportedCapacityKW: 3, // Verified minimum installation size
  maxSupportedCapacityKW: 50, // Verified maximum installation size in current scope
};

/**
 * Practical system size steps offered within Hardev Solar Services' 3 kW to 50 kW scope.
 */
export const PRACTICAL_SYSTEM_SIZES_KW: readonly number[] = [
  3, 5, 8, 10, 15, 20, 25, 30, 40, 50,
] as const;

/**
 * Standard bill ranges for quick selection
 */
export interface BillBracketOption {
  id: string;
  label: string;
  approxMonthlyBill: number;
  typicalCapacityKW: number;
}

export const DEFAULT_BILL_BRACKETS: readonly BillBracketOption[] = [
  { id: "below_1500", label: "Less than ₹1,500", approxMonthlyBill: 1200, typicalCapacityKW: 3 },
  { id: "1500_2500", label: "₹1,500 – ₹2,500", approxMonthlyBill: 2000, typicalCapacityKW: 3 },
  { id: "2500_4000", label: "₹2,500 – ₹4,000", approxMonthlyBill: 3200, typicalCapacityKW: 5 },
  { id: "4000_8000", label: "₹4,000 – ₹8,000", approxMonthlyBill: 6000, typicalCapacityKW: 8 },
  { id: "8000_15000", label: "₹8,000 – ₹15,000", approxMonthlyBill: 11000, typicalCapacityKW: 15 },
  { id: "above_15000", label: "Above ₹15,000", approxMonthlyBill: 20000, typicalCapacityKW: 25 },
] as const;

/**
 * Standard legal and engineering disclaimer for all calculator outputs
 */
export const CALCULATOR_DISCLAIMER =
  "These figures are indicative estimates based on the information provided. Actual system size, generation, savings and payback may vary depending on site conditions, electricity tariff, roof area, system configuration and other factors. A site assessment is recommended for an accurate quotation.";
