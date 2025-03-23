import express from 'express';
import { protect } from '../middlewares/auth.js';
import { calculateTaxes } from '../controllers/taxController.js';

const router = express.Router();

// Protect all tax routes
router.use(protect);

// Calculate tax liability
router.post('/calculate', calculateTaxes);

export default router;