import mongoose from 'mongoose';

const taxCalculationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalIncome: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  taxRate: { type: Number, required: true },
  taxLiability: { type: Number, required: true },
  calculationDate: { type: Date, default: Date.now }
});

export default mongoose.model('TaxCalculation', taxCalculationSchema);