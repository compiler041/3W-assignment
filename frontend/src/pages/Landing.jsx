import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const features = [
  { icon: WorkOutlineRoundedIcon, title: 'Quick Tasks', desc: 'Complete surveys, app reviews, data-entry tasks, quizzes, and more bite-sized activities.', color: '#2979ff', bg: '#e3f2fd' },
  { icon: PeopleAltOutlinedIcon, title: 'Invite & Earn', desc: 'Invite your circle and earn additional rewards with every successful referral.', color: '#e91e63', bg: '#fce4ec' },
  { icon: EmojiEventsOutlinedIcon, title: 'Leaderboards', desc: 'Compete in daily, weekly, and monthly leaderboards. Higher positions unlock higher rewards!', color: '#ff6d00', bg: '#fff3e0' },
  { icon: PaymentsOutlinedIcon, title: 'Secure Payments', desc: 'Receive payouts quickly through trusted channels with transparent earning details.', color: '#2e7d32', bg: '#e8f5e9' },
  { icon: TouchAppOutlinedIcon, title: 'User-Friendly', desc: 'Clean interface with smooth navigation. Dashboard displays earnings, history & referrals.', color: '#7b1fa2', bg: '#f3e5f5' },
  { icon: GroupsOutlinedIcon, title: 'Community', desc: 'Join a growing community of online earners. Dedicated support team always available.', color: '#00838f', bg: '#e0f7fa' },
];

const whyChoose = [
  'Completely free earning app',
  'Flexible work from home tasks',
  'Daily online earning opportunities',
  'Perfect for freelancers & students',
  'Builds experience while earning real money',
  'Designed for India + global earners',
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      {/* Navbar */}
      <Box sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        px: { xs: 3, md: 8 }, py: 2, borderBottom: '1px solid #f0f0f0',
        position: 'sticky', top: 0, bgcolor: 'white', zIndex: 50,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <img src="/logo.png" alt="TaskPlanet" style={{ width: 40, height: 40, borderRadius: 10 }} />
          <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a' }}>
            Task<span style={{ color: '#2979ff' }}>Planet</span>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button onClick={() => navigate('/login')} sx={{ color: '#555', fontSize: 14, fontWeight: 600, px: 3 }}>
            Log In
          </Button>
          <Button onClick={() => navigate('/signup')} variant="contained"
            sx={{ bgcolor: '#2979ff', fontSize: 14, fontWeight: 600, px: 3, py: 1, '&:hover': { bgcolor: '#1565c0' } }}>
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(180deg, #e8f0fe 0%, #ffffff 100%)',
        py: { xs: 8, md: 12 }, px: 3, textAlign: 'center',
      }}>
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <img src="/logo.png" alt="TaskPlanet" style={{ width: 100, height: 100, borderRadius: 24, marginBottom: 24 }} />
          <Typography sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.2, mb: 2 }}>
            Earn Money Online with{' '}
            <span style={{ color: '#2979ff' }}>Simple Tasks</span>
          </Typography>
          <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#777', lineHeight: 1.7, mb: 5, maxWidth: 550, mx: 'auto' }}>
            TaskPlanet is a free earning app crafted to help you make real money online through simple, reliable, and engaging digital tasks.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={() => navigate('/signup')}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: '#2979ff', px: 5, py: 1.8, fontSize: 16, fontWeight: 700, borderRadius: 14,
                boxShadow: '0 8px 24px rgba(41,121,255,0.3)',
                '&:hover': { bgcolor: '#1565c0', boxShadow: '0 8px 30px rgba(41,121,255,0.4)' },
              }}>
              Start Earning Today
            </Button>
            <Button variant="outlined" size="large" onClick={() => navigate('/login')}
              sx={{
                borderColor: '#2979ff', color: '#2979ff', px: 5, py: 1.8, fontSize: 16, fontWeight: 700,
                borderRadius: 14, borderWidth: 2,
                '&:hover': { borderWidth: 2, bgcolor: '#e3f2fd' },
              }}>
              Log In
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 4, md: 10 }, py: 5, borderBottom: '1px solid #f5f5f5' }}>
        {[
          { value: '100K+', label: 'Downloads' },
          { value: '4.0★', label: 'Rating' },
          { value: 'Free', label: 'To Use' },
          { value: '24/7', label: 'Support' },
        ].map(s => (
          <Box key={s.label} textAlign="center">
            <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, color: '#2979ff' }}>{s.value}</Typography>
            <Typography sx={{ fontSize: 13, color: '#999', fontWeight: 500, mt: 0.5 }}>{s.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Features */}
      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3, py: { xs: 6, md: 10 } }}>
        <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, color: '#1a1a1a', textAlign: 'center', mb: 1 }}>
          🔑 Key Features
        </Typography>
        <Typography sx={{ fontSize: 16, color: '#999', textAlign: 'center', mb: 6, maxWidth: 500, mx: 'auto' }}>
          Everything you need to earn money online, all in one place.
        </Typography>
        <Grid container spacing={3}>
          {features.map(f => (
            <Grid item xs={12} sm={6} md={4} key={f.title}>
              <Box sx={{
                p: 3, borderRadius: 4, border: '1px solid #f0f0f0', height: '100%',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#e0e0e0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transform: 'translateY(-2px)' },
              }}>
                <Box sx={{
                  width: 48, height: 48, borderRadius: 3, bgcolor: f.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
                }}>
                  <f.icon sx={{ color: f.color, fontSize: 24 }} />
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', mb: 1 }}>{f.title}</Typography>
                <Typography sx={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>{f.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose */}
      <Box sx={{ bgcolor: '#f0f7ff', py: { xs: 6, md: 10 }, px: 3 }}>
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <Typography sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, color: '#1565c0', textAlign: 'center', mb: 5 }}>
            🌟 Why Choose TaskPlanet?
          </Typography>
          <Grid container spacing={2}>
            {whyChoose.map((text, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
                  <CheckCircleRoundedIcon sx={{ color: '#2979ff', fontSize: 22 }} />
                  <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#333' }}>{text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 }, px: 3 }}>
        <Typography sx={{ fontSize: { xs: 24, md: 36 }, fontWeight: 800, color: '#1a1a1a', mb: 2 }}>
          💸 Start Your Earning Journey Today
        </Typography>
        <Typography sx={{ fontSize: 16, color: '#999', mb: 4, maxWidth: 500, mx: 'auto' }}>
          Unlock simple tasks, flexible work options, and real income—anytime, anywhere.
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/signup')}
          sx={{
            bgcolor: '#2979ff', px: 6, py: 2, fontSize: 18, fontWeight: 700, borderRadius: 14,
            boxShadow: '0 8px 24px rgba(41,121,255,0.3)',
          }}>
          Get Started Free
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: '1px solid #f0f0f0', py: 4, px: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2 }}>
          <img src="/logo.png" alt="TaskPlanet" style={{ width: 28, height: 28, borderRadius: 6 }} />
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>
            Task<span style={{ color: '#2979ff' }}>Planet</span>
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 13, color: '#bbb' }}>
          Version 4.01.44 · Updated Jun 15, 2026 · Offered by 3W Business Private Limited
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
