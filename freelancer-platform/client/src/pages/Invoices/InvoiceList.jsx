import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Paper
} from '@mui/material';
import CreateInvoice from './CreateInvoice';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchInvoices = async () => {
    try {
      const { data } = await axios.get('/api/invoices');
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Invoices</Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
        >
          Create Invoice
        </Button>
      </Box>

      <CreateInvoice open={open} onClose={() => setOpen(false)} onSuccess={fetchInvoices} />

      <Paper elevation={3}>
        <List>
          {invoices.map((invoice) => (
            <ListItem key={invoice._id} divider>
              <ListItemText
                primary={invoice.client.name}
                secondary={`Due: ${new Date(invoice.dueDate).toLocaleDateString()} | Status: ${invoice.status}`}
              />
              <ListItemSecondaryAction>
                <Button 
                  variant="outlined"
                  href={`/api/invoices/${invoice._id}/generate`}
                  target="_blank"
                >
                  Download PDF
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default InvoiceList;