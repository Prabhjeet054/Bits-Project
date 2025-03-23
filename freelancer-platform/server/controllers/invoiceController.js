import Invoice from '../models/Invoice.js';
import { generateInvoicePDF } from '../utils/invoiceGenerator.js';

export const createInvoice = async (req, res) => {
  try {
    const { client, items, dueDate } = req.body;
    
    const total = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    
    const invoice = new Invoice({
      user: req.user.id,
      client,
      items,
      total,
      dueDate,
      status: 'pending'
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const generateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    const pdfBuffer = await generateInvoicePDF(invoice);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice._id}.pdf`);
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};