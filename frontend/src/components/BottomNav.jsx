import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

const tabs = [
  { label: 'Home', Icon: HomeOutlinedIcon, active: false },
  { label: 'Tasks', Icon: AssignmentOutlinedIcon, active: false },
  { label: 'Social', Icon: PublicRoundedIcon, active: true },
  { label: 'Leader Board', Icon: EmojiEventsOutlinedIcon, active: false },
  { label: 'Chat', Icon: MoreHorizRoundedIcon, active: false },
];

const BottomNav = () => {
  return (
    <Box sx={{
      position: 'sticky', bottom: 0,
      bgcolor: 'white', borderTop: '1px solid #eee',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
      px: '8px', pt: '6px', pb: '10px', zIndex: 50,
    }}>
      {tabs.map(({ label, Icon, active }) => (
        <Box key={label} sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          cursor: 'pointer', flex: 1,
        }}>
          {active ? (
            <Box sx={{
              width: 46, height: 46, borderRadius: '50%',
              bgcolor: '#2979ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mb: '3px', mt: '-18px',
              boxShadow: '0 4px 12px rgba(41,121,255,0.35)',
              border: '3px solid white',
            }}>
              <Icon sx={{ fontSize: 22, color: 'white' }} />
            </Box>
          ) : (
            <Icon sx={{ fontSize: 23, color: '#bbb', mb: '3px' }} />
          )}
          <Typography sx={{
            fontSize: 9.5, fontWeight: active ? 700 : 500,
            color: active ? '#2979ff' : '#bbb',
            letterSpacing: 0.2,
          }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BottomNav;
