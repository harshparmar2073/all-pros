import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import KitchenIcon from '@mui/icons-material/Kitchen';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import CakeIcon from '@mui/icons-material/Cake';
import IcecreamIcon from '@mui/icons-material/Icecream';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import SearchIcon from '@mui/icons-material/Search';

import { keyframes } from '@mui/system';

// Helper to set chip colors based on job status
function getStatusColor(status) {
  switch ((status || '').toLowerCase()) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    case 'canceled':
      return 'error';
    default:
      return 'default';
  }
}

// Keyframes for floating icons (enhanced float & sway)
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-15px) rotate(5deg); opacity: 1; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
`;

// Keyframes for pulse animation
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Keyframes for rotate animation on the add button
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Keyframes for shimmer effect
const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Keyframes for falling food items
const fallingAnimation = keyframes`
  0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(calc(100vh + 100px)) rotate(360deg); opacity: 0.7; }
`;

// Floating icons (middle & bottom) with unique icons
function FloatingRestaurantItems() {
  const icons = [
    KitchenIcon,
    FastfoodIcon,
    LocalDiningIcon,
    RestaurantIcon,
    LocalCafeIcon,
    EmojiFoodBeverageIcon,
    SoupKitchenIcon,
    LunchDiningIcon,
    LocalPizzaIcon,
    CakeIcon,
    IcecreamIcon,
    LocalBarIcon,
  ];
  return (
    <>
      {icons.map((IconComponent, index) => {
        const size = Math.random() * 20 + 20;  // 20px to 40px
        const top = Math.random() * 70 + 30;     // from 30% to 100%
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 3;    // 3s to 7s
        const delay = Math.random() * 2;
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              color: 'rgba(200, 0, 0, 0.35)',
              fontSize: `${size}px`,
              animation: `${floatAnimation} ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              pointerEvents: 'none',
              zIndex: 3,
            }}
          >
            <IconComponent />
          </Box>
        );
      })}
    </>
  );
}

// Falling food items for extra visual interest
function FallingFoodItems() {
  const icons = [
    LocalPizzaIcon,
    CakeIcon,
    IcecreamIcon,
    LocalBarIcon,
    FastfoodIcon,
    LocalDiningIcon,
  ];
  const items = Array.from({ length: 15 }, () => {
    const IconComponent = icons[Math.floor(Math.random() * icons.length)];
    const size = Math.random() * 15 + 15;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 15;
    const delay = Math.random() * 20;
    return { IconComponent, size, left, duration, delay };
  });
  return (
    <>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${item.left}%`,
            top: '0',
            color: 'rgba(180, 30, 30, 0.2)',
            fontSize: `${item.size}px`,
            animation: `${fallingAnimation} ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        >
          <item.IconComponent />
        </Box>
      ))}
    </>
  );
}

// Main Jobs component
export default function Jobs({ jobs = [], onOpenCreateJob }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [rotate, setRotate] = useState(false);
  const [highlightRow, setHighlightRow] = useState(null);

  // Filter jobs by title
  useEffect(() => {
    if (!searchTerm) {
      setFilteredJobs(jobs);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      setFilteredJobs(
        jobs.filter((job) => job.title.toLowerCase().includes(lowerSearch))
      );
    }
  }, [searchTerm, jobs]);

  // Randomly highlight a row every 5 seconds
  useEffect(() => {
    if (filteredJobs.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * filteredJobs.length);
        setHighlightRow(randomIndex);
        setTimeout(() => setHighlightRow(null), 1500);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredJobs]);

  // Handle Add button click with rotation
  const handleAddClick = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
      if (onOpenCreateJob) onOpenCreateJob();
    }, 500);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?restaurant,food,ambience")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 4,
        overflow: 'hidden',
      }}
    >
      {/* Overlay for a clean look */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,245,240,0.75) 100%)',
          zIndex: 1,
        }}
      />
      
      {/* Floating Icons & Falling Items */}
      <FloatingRestaurantItems />
      <FallingFoodItems />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 4, py: 2 }}>
        {/* Header Row */}
        <Box
          mb={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
          sx={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(255,240,230,0.7) 100%)',
            borderRadius: 3,
            p: 2,
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#d32f2f',
              textShadow: '1px 1px 1px rgba(0,0,0,0.1)',
              background: 'linear-gradient(90deg, #d32f2f, #ff6b6b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
            }}
          >
            Restaurant Jobs
          </Typography>

          {/* Search Field */}
          <Box display="flex" alignItems="center" gap={1} flexGrow={1} ml={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 2,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                px: 1,
              }}
            >
              <SearchIcon sx={{ color: '#999' }} />
              <TextField
                placeholder="Search by Title"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: { xs: '120px', sm: '180px' },
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    py: '8px',
                  },
                }}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
          </Box>

          {/* Add Button */}
          <IconButton
            onClick={handleAddClick}
            sx={{
              backgroundColor: '#d32f2f',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#b71c1c',
                boxShadow: '0 0 15px rgba(211, 47, 47, 0.5)',
              },
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              animation: rotate ? `${rotateAnimation} 0.5s ease-in-out` : 'none',
              transition: 'all 0.3s ease',
              p: 1.5,
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {/* Jobs Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflowX: 'auto',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #d32f2f, #ff6b6b)',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            },
          }}
        >
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f8f8f8' }}>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Specialization</strong></TableCell>
                <TableCell><strong>Posted On</strong></TableCell>
                <TableCell><strong>Start Date</strong></TableCell>
                <TableCell><strong>End Date</strong></TableCell>
                <TableCell><strong>Assigned By</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      transition: 'all 0.2s ease-in-out',
                      ...(highlightRow === index && {
                        background:
                          'linear-gradient(90deg, rgba(255,240,240,0.5) 0%, rgba(255,255,255,0) 100%)',
                        animation: `${shimmerAnimation} 2s linear infinite`,
                        backgroundSize: '200% 100%',
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,230,230,0.5) 50%, rgba(255,255,255,0) 100%)',
                      }),
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{job.title}</TableCell>
                    <TableCell>{job.description}</TableCell>
                    <TableCell>{job.specialization}</TableCell>
                    <TableCell>{job.postedOn}</TableCell>
                    <TableCell>{job.startDate}</TableCell>
                    <TableCell>{job.endDate}</TableCell>
                    <TableCell>{job.assignedBy}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        color={getStatusColor(job.status)}
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: '500',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          ...(highlightRow === index && {
                            animation: `${pulseAnimation} 1.5s ease-in-out`,
                          }),
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Box
                      sx={{
                        py: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <RestaurantIcon sx={{ fontSize: 40, color: '#d3d3d3' }} />
                      <Typography variant="body1" color="text.secondary">
                        No jobs found
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
