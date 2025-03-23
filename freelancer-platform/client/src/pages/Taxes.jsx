import { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress,
  Stack 
} from '@mui/material';

const Taxes = () => {
  const [taxData, setTaxData] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateTaxes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/tax/calculate');
      setTaxData(data);
    } catch (error) {
      console.error('Tax calculation error:', error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Tax Calculator</Typography>
      
      <Button
        variant="contained"
        onClick={calculateTaxes}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Calculate Taxes'}
      </Button>

      {taxData && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Tax Summary</Typography>
            <Stack spacing={2}>
              <Typography>Taxable Income: ${taxData.taxableIncome}</Typography>
              <Typography>Tax Liability: ${taxData.taxLiability}</Typography>
              <Typography>Effective Tax Rate: {taxData.effectiveTaxRate}%</Typography>
              <Typography variant="h6">Net Income: ${taxData.netIncome}</Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Taxes;