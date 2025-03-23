import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  source: { type: String, required: true },
  description: String,
  isTaxed: { type: Boolean, default: false }
});

export default mongoose.model('Income', incomeSchema);