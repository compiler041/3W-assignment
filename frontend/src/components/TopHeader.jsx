import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import { ColorModeContext } from '../App';
import { useNavigate } from 'react-router-dom';

const TopHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <Box sx={{
      bgcolor: 'background.paper', px: 3, py: 2,
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Row 1 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src="/logo.png" alt="TaskPlanet" style={{ width: 36, height: 36, borderRadius: 8 }} />
          <Typography sx={{ fontSize: 24, fontWeight: 800, color: 'text.primary' }}>Social</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', bgcolor: theme.palette.mode === 'dark' ? '#3e2700' : '#fff8e1', border: '1px solid #ffe082', borderRadius: 20, px: 1.5, py: 0.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: theme.palette.mode === 'dark' ? '#ffb300' : '#e65100' }}>50</Typography>
            <span style={{ fontSize: 14 }}>⭐</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: theme.palette.mode === 'dark' ? '#003300' : '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 20, px: 1.5, py: 0.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: theme.palette.mode === 'dark' ? '#69f0ae' : '#2e7d32' }}>₹0.00</Typography>
          </Box>
          <IconButton size="small">
            <Badge badgeContent={1} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 16, height: 16 } }}>
              <NotificationsNoneRoundedIcon sx={{ fontSize: 24, color: 'text.secondary' }} />
            </Badge>
          </IconButton>
          <Avatar sx={{ width: 36, height: 36, fontSize: 14, fontWeight: 700, bgcolor: '#2979ff', border: '2px solid #4caf50', color: 'white' }}>
            {user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Button onClick={handleLogout} size="small" sx={{ color: 'text.secondary', fontSize: 13 }} startIcon={<LogoutRoundedIcon sx={{ fontSize: 18 }} />}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Search row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, maxWidth: 500 }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5', borderRadius: 12, px: 2, py: 1, border: `1px solid ${theme.palette.divider}` }}>
          <InputBase placeholder="Search promotions, users," sx={{ flex: 1, fontSize: 14, color: 'text.secondary' }} />
        </Box>
        <IconButton sx={{ bgcolor: '#2979ff', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}>
          <SearchRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <LightModeOutlinedIcon sx={{ fontSize: 22, color: 'text.secondary' }} />
          ) : (
            <DarkModeOutlinedIcon sx={{ fontSize: 22, color: 'text.secondary' }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopHeader;
