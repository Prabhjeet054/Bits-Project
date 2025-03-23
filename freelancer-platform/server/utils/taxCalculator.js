export const calculateTax = (income, deductions, taxRate) => {
    const taxableIncome = income - deductions;
    const taxLiability = taxableIncome * (taxRate / 100);
    return {
      taxableIncome,
      taxLiability,
      effectiveTaxRate: taxRate,
      netIncome: income - taxLiability
    };
  };