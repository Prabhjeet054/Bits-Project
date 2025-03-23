// controllers/taxController.js
import User from '../models/User.js';
import Income from '../models/Income.js';
import { calculateTax } from '../utils/taxCalculator.js';

export const calculateTaxes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const incomes = await Income.find({ user: req.user.id, isTaxed: false });
    
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const taxRate = user.taxInfo?.taxRate || 15; // Default 15% tax rate
    
    const taxDetails = calculateTax(totalIncome, 0, taxRate);
    
    // Mark incomes as taxed (optional)
    await Income.updateMany(
      { _id: { $in: incomes.map(i => i._id) } },
      { $set: { isTaxed: true } }
    );

    res.json(taxDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};