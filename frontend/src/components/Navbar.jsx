import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#2563eb' }}>
          TaskPlanet
        </Typography>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar sx={{ bgcolor: '#2563eb', width: 32, height: 32, fontSize: '1rem' }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight="500" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.username}
              </Typography>
            </div>
            <IconButton color="inherit" onClick={logout} size="small" sx={{ color: 'text.secondary' }}>
              <LogoutIcon />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
