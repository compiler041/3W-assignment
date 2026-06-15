import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material/styles';
import api from '../api';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All Posts');
  const fileInputRef = useRef(null);
  const theme = useTheme();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setPreview(URL.createObjectURL(file)); }
  };

  const clearImage = () => {
    setImage(null); setPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;
    setLoading(true);
    const formData = new FormData();
    if (content) formData.append('content', content);
    if (image) formData.append('image', image);
    try {
      const res = await api.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      onPostCreated(res.data);
      setContent(''); clearImage();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating post');
    } finally { setLoading(false); }
  };

  const hasContent = content.trim() || image;

  return (
    <Box sx={{ bgcolor: 'background.paper', px: '16px', pt: '14px', pb: '12px' }}>
      {/* Header: Create Post + tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '14px' }}>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: 'text.primary' }}>Create Post</Typography>
        <Box sx={{ display: 'flex', bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f0f0f0', borderRadius: 8, p: '3px' }}>
          {['All Posts', 'Promotions'].map(tab => (
            <Box
              key={tab} onClick={() => setActiveTab(tab)}
              sx={{
                px: '16px', py: '5px', borderRadius: 7, cursor: 'pointer',
                fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
                bgcolor: activeTab === tab ? '#2979ff' : 'transparent',
                color: activeTab === tab ? 'white' : 'text.secondary',
              }}
            >
              {tab}
            </Box>
          ))}
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Text area */}
        <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', px: '14px', py: '8px', mb: '10px', bgcolor: theme.palette.mode === 'dark' ? '#222' : '#fafafa' }}>
          <TextField
            fullWidth multiline minRows={2} maxRows={4}
            placeholder="What's on your mind?"
            variant="standard"
            InputProps={{ disableUnderline: true, sx: { fontSize: 14, color: 'text.primary' } }}
            value={content} onChange={(e) => setContent(e.target.value)}
          />
        </Box>

        {/* Image preview */}
        {preview && (
          <Box sx={{ position: 'relative', mb: '10px', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
            <IconButton size="small" onClick={clearImage} sx={{
              position: 'absolute', top: 6, right: 6,
              bgcolor: 'rgba(0,0,0,0.5)', color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}>
              <CloseRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        )}

        {/* Action row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: '6px', borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleImageChange} />
            <IconButton onClick={() => fileInputRef.current.click()} sx={{ color: 'text.secondary', p: '6px' }}>
              <CameraAltOutlinedIcon sx={{ fontSize: 21 }} />
            </IconButton>
            <IconButton sx={{ color: 'text.secondary', p: '6px' }}>
              <SentimentSatisfiedAltOutlinedIcon sx={{ fontSize: 21 }} />
            </IconButton>
            <IconButton sx={{ color: 'text.secondary', p: '6px' }}>
              <FormatAlignLeftOutlinedIcon sx={{ fontSize: 21 }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: '4px', cursor: 'pointer' }}>
              <CampaignOutlinedIcon sx={{ fontSize: 19, color: '#2979ff' }} />
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#2979ff', ml: '3px' }}>Promote</Typography>
            </Box>
          </Box>

          <Box
            component="button" type="submit"
            disabled={loading || !hasContent}
            sx={{
              display: 'flex', alignItems: 'center', gap: '4px',
              border: 'none', outline: 'none', cursor: hasContent ? 'pointer' : 'default',
              bgcolor: hasContent ? '#2979ff' : (theme.palette.mode === 'dark' ? '#444' : '#e0e0e0'),
              color: hasContent ? 'white' : 'text.disabled',
              borderRadius: '20px', px: '18px', py: '7px',
              fontSize: 13, fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            {loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : (
              <>
                <PlayArrowRoundedIcon sx={{ fontSize: 17 }} />
                Post
              </>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreatePost;
