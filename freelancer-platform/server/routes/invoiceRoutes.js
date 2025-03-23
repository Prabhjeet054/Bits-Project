import express from 'express';
import { protect } from '../middlewares/auth.js';
import { createInvoice, getInvoices, generateInvoice } from '../controllers/invoiceController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createInvoice)
  .get(getInvoices);

router.get('/:id/generate', generateInvoice);

export default router;