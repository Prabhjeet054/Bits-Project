import express from 'express';
import { protect } from '../middlewares/auth.js';
import { 
    createIncome,
    getIncomeHistory,
    updateIncome,
    deleteIncome 
  } from '../controllers/incomeController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createIncome)
  .get(getIncomeHistory);

router.route('/:id')
  .put(updateIncome)
  .delete(deleteIncome);

export default router;