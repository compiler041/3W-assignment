import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try { await signup(username, email, password); await login(email, password); navigate('/feed'); }
    catch (err) { setError(err.response?.data?.message || 'Signup failed'); }
    finally { setLoading(false); }
  };

  const inputSx = {
    mb: 2.5,
    '& .MuiOutlinedInput-root': {
      borderRadius: 3, bgcolor: '#fafafa',
      '& fieldset': { borderColor: '#eee' },
      '&:hover fieldset': { borderColor: '#2979ff' },
      '&.Mui-focused fieldset': { borderColor: '#2979ff' },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left side - branding */}
      <Box sx={{
        flex: 1, display: { xs: 'none', md: 'flex' },
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: 'linear-gradient(135deg, #2979ff 0%, #1565c0 100%)',
        px: 6,
      }}>
        <img src="/logo.png" alt="TaskPlanet" style={{ width: 100, height: 100, borderRadius: 24, marginBottom: 30 }} />
        <Typography sx={{ fontSize: 36, fontWeight: 800, color: 'white', mb: 2, textAlign: 'center' }}>
          TaskPlanet
        </Typography>
        <Typography sx={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', textAlign: 'center', maxWidth: 400, lineHeight: 1.7 }}>
          Join thousands of users earning real money through simple digital tasks every day!
        </Typography>
      </Box>

      {/* Right side - form */}
      <Box sx={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        px: { xs: 3, md: 8 }, py: 4, bgcolor: 'white', maxWidth: { md: 550 },
      }}>
        <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 4 }}>
          <img src="/logo.png" alt="TaskPlanet" style={{ width: 70, height: 70, borderRadius: 16 }} />
        </Box>
        <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', mb: 0.5 }}>Create Account</Typography>
        <Typography sx={{ fontSize: 15, color: '#999', mb: 4 }}>Join TaskPlanet and start earning!</Typography>

        {error && (
          <Box sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: 2, px: 2, py: 1.2, mb: 2 }}>
            <Typography sx={{ fontSize: 14, color: '#dc2626' }}>{error}</Typography>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#555', mb: 1 }}>Username</Typography>
          <TextField fullWidth placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)} required sx={inputSx} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#555', mb: 1 }}>Email</Typography>
          <TextField fullWidth type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required sx={inputSx} />
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#555', mb: 1 }}>Password</Typography>
          <TextField fullWidth type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required sx={inputSx} />
          <Button type="submit" variant="contained" fullWidth disabled={loading}
            sx={{
              bgcolor: '#2979ff', py: 1.8, fontSize: 16, fontWeight: 700, borderRadius: 14, mt: 1,
              boxShadow: '0 4px 14px rgba(41,121,255,0.3)',
              '&:hover': { bgcolor: '#1565c0' },
              '&.Mui-disabled': { bgcolor: '#90caf9', color: 'white' },
            }}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign Up'}
          </Button>
        </form>

        <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 14, color: '#999' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#2979ff', fontWeight: 700 }}>Log in</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
