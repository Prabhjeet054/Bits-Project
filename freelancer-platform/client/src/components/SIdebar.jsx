import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  AttachMoney as MoneyIcon,
  Description as InvoiceIcon,
  Calculate as TaxIcon,
  Person as ProfileIcon
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/income">
          <ListItemIcon><MoneyIcon /></ListItemIcon>
          <ListItemText primary="Income" />
        </ListItem>
        <ListItem button component={Link} to="/invoices">
          <ListItemIcon><InvoiceIcon /></ListItemIcon>
          <ListItemText primary="Invoices" />
        </ListItem>
        <ListItem button component={Link} to="/taxes">
          <ListItemIcon><TaxIcon /></ListItemIcon>
          <ListItemText primary="Taxes" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon><ProfileIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;