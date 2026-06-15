import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import TopHeader from '../components/TopHeader';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import api from '../api';

const filterOptions = ['All Post', 'For You', 'Most Liked', 'Most Commented'];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Post');
  const theme = useTheme();

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handlePostCreated = (newPost) => { setPosts([newPost, ...posts]); };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopHeader />

      {/* Main content area */}
      <Box sx={{
        display: 'flex', maxWidth: 1200, mx: 'auto', px: 3, py: 3, gap: 3,
      }}>
        {/* Left sidebar */}
        <Box sx={{
          width: 260, flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          position: 'sticky', top: 130, alignSelf: 'flex-start',
        }}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 2.5, mb: 2, border: `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <img src="/logo.png" alt="TaskPlanet" style={{ width: 40, height: 40, borderRadius: 10 }} />
              <Box>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: 'text.primary' }}>
                  Task<span style={{ color: '#2979ff' }}>Planet</span>
                </Typography>
                <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Social Community</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1.6 }}>
              Earn money online through simple, reliable digital tasks. Join our growing community today!
            </Typography>
          </Box>

          {/* Quick links */}
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 2, border: `1px solid ${theme.palette.divider}` }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.primary', mb: 1.5 }}>Quick Links</Typography>
            {['🏠 Home', '📋 Tasks', '🌐 Social', '🏆 Leaderboard', '💬 Chat'].map((item, i) => (
              <Box key={i} sx={{
                py: 1, px: 1.5, borderRadius: 2, cursor: 'pointer', mb: 0.5,
                bgcolor: i === 2 ? (theme.palette.mode === 'dark' ? '#003366' : '#e3f2fd') : 'transparent',
                color: i === 2 ? (theme.palette.mode === 'dark' ? '#90caf9' : '#2979ff') : 'text.secondary',
                fontSize: 13, fontWeight: i === 2 ? 600 : 400,
                '&:hover': { bgcolor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5' },
              }}>
                {item}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Center feed */}
        <Box sx={{ flex: 1, maxWidth: 600 }}>
          {/* Create post card */}
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, overflow: 'hidden', mb: 2, border: `1px solid ${theme.palette.divider}` }}>
            <CreatePost onPostCreated={handlePostCreated} />
          </Box>

          {/* Filter pills */}
          <Box sx={{
            display: 'flex', gap: 1, mb: 2, overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
          }}>
            {filterOptions.map(f => (
              <Box
                key={f} onClick={() => setActiveFilter(f)}
                sx={{
                  px: 2.5, py: 0.8, borderRadius: 20, cursor: 'pointer',
                  whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600,
                  bgcolor: activeFilter === f ? '#2979ff' : 'background.paper',
                  color: activeFilter === f ? 'white' : 'text.secondary',
                  border: activeFilter === f ? '1.5px solid #2979ff' : `1.5px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: activeFilter === f ? '#1565c0' : (theme.palette.mode === 'dark' ? '#333' : '#fafafa') },
                }}
              >
                {f}
              </Box>
            ))}
          </Box>

          {/* Posts */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress size={32} />
            </Box>
          ) : posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'background.paper', borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
              <Typography sx={{ fontSize: 48, mb: 1 }}>📝</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>No posts yet. Be the first to post!</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {posts.map(post => (
                <Box key={post._id} sx={{ bgcolor: 'background.paper', borderRadius: 3, overflow: 'hidden', border: `1px solid ${theme.palette.divider}` }}>
                  <PostCard post={post} />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right sidebar */}
        <Box sx={{
          width: 280, flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          position: 'sticky', top: 130, alignSelf: 'flex-start',
        }}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 2.5, mb: 2, border: `1px solid ${theme.palette.divider}` }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary', mb: 2 }}>Trending Topics</Typography>
            {['#earnmoneyonline', '#taskplanet', '#workfromhome', '#freelancing', '#sidehustle'].map((tag, i) => (
              <Typography key={i} sx={{
                fontSize: 13, color: '#2979ff', py: 0.8, cursor: 'pointer',
                '&:hover': { color: '#1565c0' },
              }}>
                {tag}
              </Typography>
            ))}
          </Box>

          <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, p: 2.5, border: `1px solid ${theme.palette.divider}` }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'text.primary', mb: 2 }}>Suggested Users</Typography>
            {[
              { name: 'Keshav', handle: '@keshav3w', rank: 'Legend' },
              { name: 'Priya', handle: '@priyasheth', rank: 'Gold' },
              { name: 'Rahul', handle: '@rahuldev', rank: 'Silver' },
            ].map((u, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  <Avatar sx={{ width: 34, height: 34, fontSize: 13, fontWeight: 700, bgcolor: ['#2979ff', '#e91e63', '#ff6d00'][i], color: 'white' }}>
                    {u.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>{u.name}</Typography>
                    <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>{u.handle}</Typography>
                  </Box>
                </Box>
                <Box sx={{
                  fontSize: 11, fontWeight: 700, color: '#2979ff',
                  border: '1px solid #2979ff', borderRadius: 10,
                  px: 1.2, py: 0.3, cursor: 'pointer',
                  '&:hover': { bgcolor: theme.palette.mode === 'dark' ? '#003366' : '#e3f2fd' },
                }}>
                  Follow
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
