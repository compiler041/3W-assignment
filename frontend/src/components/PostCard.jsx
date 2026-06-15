import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';
import api from '../api';

const avatarColors = ['#2979ff', '#e91e63', '#9c27b0', '#00897b', '#ff6d00', '#1565c0', '#c62828', '#283593'];
const getColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

const getRank = (username, isDark) => {
  const l = username.length;
  if (l > 8) return { n: 7, label: 'Legend', color: isDark ? '#ffb300' : '#e65100', bg: isDark ? '#3e2700' : '#fff3e0', border: isDark ? '#ff8f00' : '#ffcc80' };
  if (l > 6) return { n: 4, label: 'Gold', color: isDark ? '#ffd54f' : '#f9a825', bg: isDark ? '#333000' : '#fffde7', border: isDark ? '#fbc02d' : '#fff176' };
  if (l > 4) return { n: 2, label: 'Silver', color: isDark ? '#b0bec5' : '#546e7a', bg: isDark ? '#263238' : '#eceff1', border: isDark ? '#78909c' : '#b0bec5' };
  return { n: 1, label: 'Bronze', color: isDark ? '#bcaaa4' : '#8d6e63', bg: isDark ? '#3e2723' : '#efebe9', border: isDark ? '#8d6e63' : '#bcaaa4' };
};

const PostCard = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const isLiked = post.likes.includes(user?.username);
  const rank = getRank(post.username, isDark);
  const color = getColor(post.username);

  const handleLike = async () => {
    const updated = isLiked
      ? post.likes.filter(u => u !== user.username)
      : [...post.likes, user.username];
    setPost({ ...post, likes: updated });
    try {
      const res = await api.post(`/posts/${post._id}/like`);
      setPost(res.data);
    } catch { setPost(initialPost); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.post(`/posts/${post._id}/comment`, { text: commentText });
      setPost(res.data); setCommentText('');
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const displayName = post.username.charAt(0).toUpperCase() + post.username.slice(1).replace(/_/g, ' ');

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Box sx={{ px: '16px', pt: '14px', pb: '10px' }}>
        {/* User row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '12px' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {/* Avatar */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Avatar sx={{
                width: 46, height: 46, bgcolor: color, color: 'white',
                fontSize: 18, fontWeight: 700,
                border: `2.5px solid ${color}`,
              }}>
                {post.username.charAt(0).toUpperCase()}
              </Avatar>
            </Box>

            {/* Info */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                  {displayName}
                </Typography>
                {/* Rank pill */}
                <Box sx={{
                  display: 'inline-flex', alignItems: 'center', gap: '3px',
                  border: `1px solid ${rank.border}`, bgcolor: rank.bg,
                  borderRadius: 10, px: '5px', py: '1px',
                }}>
                  <Box sx={{
                    width: 14, height: 14, borderRadius: '50%',
                    border: `1.5px solid ${rank.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: rank.color }}>{rank.n}</span>
                  </Box>
                  <span style={{ fontSize: 10 }}>👑</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: rank.color }}>{rank.label}</span>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.3, mt: '2px' }}>
                @{post.username.toLowerCase()}
              </Typography>
              <Typography sx={{ fontSize: 11, color: 'text.disabled', mt: '1px' }}>
                {moment(post.createdAt).fromNow()}
              </Typography>
            </Box>
          </Box>

          {/* Follow */}
          <Box
            sx={{
              display: 'flex', alignItems: 'center', gap: '2px',
              bgcolor: '#2979ff', color: 'white',
              borderRadius: 20, px: '12px', py: '5px',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
              '&:hover': { bgcolor: '#1565c0' },
            }}
          >
            Follow <AddRoundedIcon sx={{ fontSize: 15 }} />
          </Box>
        </Box>

        {/* Content */}
        {post.content && (
          <Typography sx={{ fontSize: 14, color: 'text.primary', lineHeight: 1.7, mb: '10px', whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>
        )}

        {/* Image */}
        {post.imageUrl && (
          <Box sx={{ mx: '-16px', mb: '10px' }}>
            <img src={post.imageUrl} alt="Post" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', pt: '8px', borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, gap: '2px' }}>
            <IconButton onClick={handleLike} sx={{ p: '6px' }}>
              {isLiked
                ? <FavoriteRoundedIcon sx={{ fontSize: 21, color: '#e53935' }} />
                : <FavoriteBorderRoundedIcon sx={{ fontSize: 21, color: 'text.secondary' }} />
              }
            </IconButton>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 500 }}>{post.likes.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', gap: '2px' }}>
            <IconButton onClick={() => setShowComments(!showComments)} sx={{ p: '6px' }}>
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 19, color: 'text.secondary' }} />
            </IconButton>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 500 }}>{post.comments.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', gap: '2px' }}>
            <IconButton sx={{ p: '6px' }}>
              <ShareOutlinedIcon sx={{ fontSize: 19, color: 'text.secondary' }} />
            </IconButton>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 500 }}>0</Typography>
          </Box>
        </Box>
      </Box>

      {/* Comments */}
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <Box sx={{ bgcolor: isDark ? '#1a1a1a' : '#fafafa', px: '16px', pb: '14px', borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', gap: '8px', py: '12px' }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: '#2979ff', color: 'white', fontSize: 12, fontWeight: 700 }}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <form onSubmit={handleComment} style={{ flex: 1, display: 'flex', gap: 6 }}>
              <TextField
                fullWidth size="small" placeholder="Add a comment..."
                value={commentText} onChange={(e) => setCommentText(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper', fontSize: 13 } }}
              />
              <Button type="submit" variant="contained" size="small" disabled={!commentText.trim() || submitting}
                sx={{ borderRadius: 2, px: '14px', fontSize: 12, minWidth: 'auto' }}>Post</Button>
            </form>
          </Box>
          {post.comments.slice().reverse().map((c, i) => (
            <Box key={i} sx={{ display: 'flex', gap: '8px', mb: '10px' }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: 10, bgcolor: getColor(c.username), color: 'white' }}>
                {c.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ bgcolor: 'background.paper', p: '10px', borderRadius: 2, border: `1px solid ${theme.palette.divider}`, flex: 1 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: 'text.primary' }}>
                  {c.username}
                  <span style={{ fontSize: 10, color: 'text.disabled', fontWeight: 400, marginLeft: 6 }}>
                    {moment(c.createdAt).fromNow()}
                  </span>
                </Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: '3px' }}>{c.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default PostCard;
