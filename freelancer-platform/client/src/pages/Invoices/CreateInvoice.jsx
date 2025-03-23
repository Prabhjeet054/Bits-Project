import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const CreateInvoice = ({ open, onClose, onSuccess }) => {
  const [invoiceData, setInvoiceData] = useState({
    client: {
      name: '',
      email: '',
      address: ''
    },
    items: [{ description: '', quantity: 1, rate: 0 }],
    dueDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async () => {
    try {
      const total = invoiceData.items.reduce(
        (sum, item) => sum + (item.quantity * item.rate),
        0
      );
      
      const payload = {
        ...invoiceData,
        total
      };

      await axios.post('/api/invoices', payload);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Invoice creation error:', error);
    }
  };

  const handleClientChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      client: {
        ...invoiceData.client,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...invoiceData.items];
    newItems[index][e.target.name] = e.target.value;
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Invoice</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Client Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Client Name"
              name="name"
              value={invoiceData.client.name}
              onChange={handleClientChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Client Email"
              name="email"
              type="email"
              value={invoiceData.client.email}
              onChange={handleClientChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Client Address"
              name="address"
              multiline
              rows={2}
              value={invoiceData.client.address}
              onChange={handleClientChange}
              margin="normal"
            />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Invoice Items
        </Typography>
        
        {invoiceData.items.map((item, index) => (
          <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Qty"
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Rate ($)"
                name="rate"
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(index, e)}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography>${(item.quantity * item.rate).toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={1}>
              {invoiceData.items.length > 1 && (
                <IconButton onClick={() => removeItem(index)} color="error">
                  <RemoveCircleOutline />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={addItem}
          sx={{ mt: 2 }}
        >
          Add Item
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateInvoice;