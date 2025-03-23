import Income from '../models/Income.js';
export const createIncome = async (req, res) => {
    try {
      const { amount, date, source, description } = req.body;
      const income = new Income({
        user: req.user.id,
        amount,
        date,
        source,
        description
      });
      
      await income.save();
      res.status(201).json(income);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const getIncomeHistory = async (req, res) => {
    try {
      const incomes = await Income.find({ user: req.user.id }).sort('-date');
      res.json(incomes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// Add these to existing exports
export const updateIncome = async (req, res, next) => {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!income) return res.status(404).json({ error: 'Income not found' });
    res.json(income);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteIncome = async (req, res, next) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!income) return res.status(404).json({ error: 'Income not found' });
    res.json({ message: 'Income deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};