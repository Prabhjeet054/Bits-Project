import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: String
  },
  items: [{
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  dueDate: Date,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Invoice', invoiceSchema);