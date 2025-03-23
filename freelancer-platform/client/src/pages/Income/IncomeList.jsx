import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import AddIncome from './AddIncome';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchIncomes = async () => {
    try {
      const { data } = await axios.get('/api/income');
      setIncomes(data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Income Management</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Income
        </Button>
      </Box>

      <AddIncome open={open} onClose={() => setOpen(false)} onSuccess={fetchIncomes} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map((income) => (
              <TableRow key={income._id}>
                <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                <TableCell>${income.amount}</TableCell>
                <TableCell>{income.source}</TableCell>
                <TableCell>{income.description}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncomeList;