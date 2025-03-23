import { useAuth } from '../context/AuthContext';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Account Information</Typography>
          <Typography>Username: {user?.username}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3 }}
            onClick={logout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;