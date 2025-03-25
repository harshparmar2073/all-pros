import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Drawer,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputBase,
  Menu,
  MenuItem,
  alpha,
  CircularProgress
} from '@mui/material';

// MUI icons
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Create custom dark blue theme
const darkBlueTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A2647',
      light: '#144272',
      dark: '#071330',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2C74B3',
      light: '#5EA7FF',
      dark: '#205295',
    },
    background: {
      default: '#f0f4fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

// Floating Bubble Animation Component
const FloatingBubbles = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {Array.from({ length: 12 }).map((_, index) => {
        const size = Math.floor(Math.random() * 30) + 10;
        const speed = (Math.random() * 40) + 20;
        const xPos = Math.random() * 100;
        const delay = Math.random() * 30;
        
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: alpha(darkBlueTheme.palette.secondary.main, 0.15),
              bottom: -size,
              left: `${xPos}%`,
              animation: `float ${speed}s infinite linear ${delay}s`,
              '@keyframes float': {
                '0%': {
                  transform: 'translateY(0) rotate(0deg)',
                  opacity: 0.8,
                },
                '100%': {
                  transform: `translateY(-1000px) rotate(${Math.random() * 360}deg)`,
                  opacity: 0,
                },
              },
            }}
          />
        );
      })}
    </Box>
  );
};

const UserDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(darkBlueTheme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [activePage, setActivePage] = useState('dashboard');
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };
  
  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };
  
  const handleProfileClose = () => {
    setProfileAnchor(null);
  };
  
  const handleNavigation = (page) => {
    setActivePage(page);
    if (isMobile) {
      setMobileOpen(false);
    }
  };
  
  // Mock job data
  const recentJobs = [
    { id: 1, title: 'Head Chef', company: 'Bistro Elegance', location: 'New York, NY', salary: '$65,000 - $80,000', type: 'Full-time', logo: 'BE', category: 'Fine Dining', posted: '2 days ago', isNew: true },
    { id: 2, title: 'Sous Chef', company: 'Harbor Seafood', location: 'Boston, MA', salary: '$55,000 - $65,000', type: 'Full-time', logo: 'HS', category: 'Seafood', posted: '3 days ago', isNew: true },
    { id: 3, title: 'Pastry Chef', company: 'Sweet Delights', location: 'Chicago, IL', salary: '$48,000 - $60,000', type: 'Full-time', logo: 'SD', category: 'Bakery', posted: '5 days ago', isNew: false },
    { id: 4, title: 'Line Cook', company: 'Urban Grill', location: 'Austin, TX', salary: '$35,000 - $45,000', type: 'Part-time', logo: 'UG', category: 'American', posted: '1 week ago', isNew: false }
  ];
  
  // Mock application stats
  const stats = {
    applications: 12,
    saved: 8,
    interviews: 3,
    offers: 1
  };
  
  // Mock notifications
  const notifications = [
    { id: 1, title: 'Interview Invitation', message: 'Bistro Elegance wants to schedule an interview', time: '1 hour ago' },
    { id: 2, title: 'Application Viewed', message: 'Harbor Seafood viewed your application', time: '3 hours ago' },
    { id: 3, title: 'New Job Match', message: 'New job matches your profile: Executive Chef', time: '1 day ago' },
  ];
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'browse', label: 'Browse Jobs', icon: <WorkIcon /> },
    { id: 'applications', label: 'Applications', icon: <HistoryIcon /> },
    { id: 'saved', label: 'Saved Jobs', icon: <BookmarkIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];
  
  // Category icon mapping
  const categoryIcons = {
    'Fine Dining': <RestaurantIcon />,
    'Fast Food': <FastfoodIcon />,
    'Casual Dining': <RestaurantIcon />,
    'Bakery': <BakeryDiningIcon />,
    'Cafe': <LocalCafeIcon />,
    'Seafood': <RestaurantIcon />,
    'American': <LocalPizzaIcon />,
  };
  
  const drawer = (
    <Box sx={{ p: 2, height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Bubbles Animation */}
      <FloatingBubbles />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <RestaurantIcon sx={{ mr: 1, color: darkBlueTheme.palette.secondary.main }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', background: `linear-gradient(90deg, ${darkBlueTheme.palette.primary.main}, ${darkBlueTheme.palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            CulinaryJobs
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {navItems.map((item) => (
            <ListItem 
              button 
              key={item.id}
              selected={activePage === item.id}
              onClick={() => handleNavigation(item.id)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: activePage === item.id ? alpha(darkBlueTheme.palette.primary.main, 0.1) : 'transparent',
                '&:hover': {
                  bgcolor: alpha(darkBlueTheme.palette.primary.main, 0.1),
                },
                '&.Mui-selected': {
                  bgcolor: alpha(darkBlueTheme.palette.primary.main, 0.15),
                  '&:hover': {
                    bgcolor: alpha(darkBlueTheme.palette.primary.main, 0.2),
                  },
                }
              }}
            >
              <ListItemIcon sx={{ color: activePage === item.id ? darkBlueTheme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: activePage === item.id ? 600 : 400,
                  color: activePage === item.id ? darkBlueTheme.palette.primary.main : 'inherit'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
  
  const drawerWidth = 240;
  
  return (
    <ThemeProvider theme={darkBlueTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: darkBlueTheme.zIndex.drawer + 1, 
            background: `linear-gradient(90deg, ${darkBlueTheme.palette.primary.main}, ${darkBlueTheme.palette.primary.light})`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantIcon sx={{ mr: 1 }} />
              <Typography variant="h6" noWrap component="div">
                CulinaryJobs
              </Typography>
            </Box>
            
            {/* Search bar */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                ml: 3, 
                mr: 2,
                display: { xs: 'none', sm: 'flex' },
                backgroundColor: alpha(darkBlueTheme.palette.common.white, 0.15),
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: alpha(darkBlueTheme.palette.common.white, 0.25),
                },
              }}
            >
              <IconButton sx={{ p: 1, color: 'white' }}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Search for jobs..."
                sx={{ 
                  color: 'white', 
                  ml: 1, 
                  flex: 1, 
                  '& .MuiInputBase-input::placeholder': {
                    color: alpha(darkBlueTheme.palette.common.white, 0.7),
                    opacity: 1,
                  }
                }}
              />
            </Box>
            
            {/* Notifications */}
            <IconButton 
              color="inherit"
              onClick={handleNotificationsOpen}
              aria-controls="notifications-menu"
              aria-haspopup="true"
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="notifications-menu"
              anchorEl={notificationsAnchor}
              keepMounted
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              PaperProps={{
                sx: { 
                  width: 320,
                  maxHeight: 400,
                  mt: 1.5,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 600 }}>
                Notifications
              </Typography>
              <Divider />
              {notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
              <Divider />
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                <Button size="small" color="primary" onClick={handleNotificationsClose}>
                  View All
                </Button>
              </Box>
            </Menu>
            
            {/* Profile menu */}
            <IconButton 
              sx={{ ml: 1 }}
              onClick={handleProfileOpen}
              aria-controls="profile-menu"
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: darkBlueTheme.palette.secondary.main }}>JS</Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={profileAnchor}
              keepMounted
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              PaperProps={{
                sx: { 
                  width: 200,
                  mt: 1.5,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ width: 60, height: 60, mb: 1, bgcolor: darkBlueTheme.palette.secondary.main }}>JS</Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  John Smith
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  chef@example.com
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => {
                handleProfileClose();
                handleNavigation('profile');
              }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </MenuItem>
              <MenuItem onClick={() => {
                handleProfileClose();
                handleNavigation('settings');
              }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => {
                handleProfileClose();
                alert('Logging out...');
              }}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={!isMobile || mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                boxShadow: '0 0 20px rgba(0,0,0,0.05)',
                border: 'none',
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: darkBlueTheme.palette.background.default,
            minHeight: '100vh',
            mt: '64px'
          }}
        >
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: 'calc(100vh - 128px)' 
            }}>
              <CircularProgress color="primary" size={60} thickness={4} />
              <Typography variant="h6" sx={{ mt: 3, color: darkBlueTheme.palette.text.secondary }}>
                Loading your dashboard...
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: darkBlueTheme.palette.primary.main }}>
                Welcome Back, John!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Here's what's happening with your job search today
              </Typography>
              
              {/* Summary Stats */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center', 
                      height: '100%', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: alpha(darkBlueTheme.palette.primary.main, 0.1), 
                      color: darkBlueTheme.palette.primary.main,
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: 'auto'
                    }}>
                      <WorkIcon />
                    </Avatar>
                    <Typography variant="body1" color="text.secondary">Applied Jobs</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: darkBlueTheme.palette.primary.main }}>
                      {stats.applications}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ mt: 1, fontSize: '0.75rem' }}
                      onClick={() => handleNavigation('applications')}
                    >
                      View All
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center', 
                      height: '100%', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: alpha(darkBlueTheme.palette.secondary.main, 0.1), 
                      color: darkBlueTheme.palette.secondary.main,
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: 'auto'
                    }}>
                      <BookmarkIcon />
                    </Avatar>
                    <Typography variant="body1" color="text.secondary">Saved Jobs</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: darkBlueTheme.palette.secondary.main }}>
                      {stats.saved}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ mt: 1, fontSize: '0.75rem' }}
                      onClick={() => handleNavigation('saved')}
                    >
                      View All
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center', 
                      height: '100%', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: alpha('#8e44ad', 0.1), 
                      color: '#8e44ad',
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: 'auto'
                    }}>
                      <AccessTimeIcon />
                    </Avatar>
                    <Typography variant="body1" color="text.secondary">Interviews</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8e44ad' }}>
                      {stats.interviews}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ mt: 1, fontSize: '0.75rem' }}
                      onClick={() => handleNavigation('interviews')}
                    >
                      View All
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Paper 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center', 
                      height: '100%', 
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: alpha('#27ae60', 0.1), 
                      color: '#27ae60',
                      width: 56,
                      height: 56,
                      mb: 2,
                      mx: 'auto'
                    }}>
                      <StarIcon />
                    </Avatar>
                    <Typography variant="body1" color="text.secondary">Job Offers</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                      {stats.offers}
                    </Typography>
                    <Button 
                      size="small" 
                      sx={{ mt: 1, fontSize: '0.75rem' }}
                      onClick={() => handleNavigation('offers')}
                    >
                      View All
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
              
              {/* Recent Jobs */}
              <Card sx={{ mb: 4 }}>
                <CardHeader 
                  title="Recently Posted Jobs" 
                  action={
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      onClick={() => handleNavigation('browse')}
                      endIcon={<ArrowForwardIcon />}
                    >
                      View All Jobs
                    </Button>
                  }
                />
                <CardContent>
                  <Grid container spacing={3}>
                    {recentJobs.map((job) => (
                      <Grid item xs={12} sm={6} md={6} lg={3} key={job.id}>
                        <Card 
                          elevation={0} 
                          sx={{ 
                            border: `1px solid ${alpha('#000', 0.08)}`,
                            position: 'relative',
                            transition: 'transform 0.3s',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            }
                          }}
                        >
                          {job.isNew && (
                            <Chip 
                              label="New" 
                              size="small" 
                              color="primary" 
                              sx={{ 
                                position: 'absolute', 
                                top: 10, 
                                right: 10, 
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                              }} 
                            />
                          )}
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Avatar 
                                sx={{ 
                                  mr: 2, 
                                  bgcolor: job.isNew ? darkBlueTheme.palette.primary.main : darkBlueTheme.palette.secondary.main 
                                }}
                              >
                                {job.logo}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                  {job.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {job.company}
                                </Typography>
                              </Box>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                              <LocationOnIcon sx={{ color: 'text.secondary', fontSize: '1rem', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {job.location}
                              </Typography>
                            </Box>
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                              <AttachMoneyIcon sx={{ color: 'text.secondary', fontSize: '1rem', mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {job.salary}
                              </Typography>
                            </Box>
                            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                              {categoryIcons[job.category] || <RestaurantIcon sx={{ color: 'text.secondary', fontSize: '1rem', mr: 0.5 }} />}
                              <Typography variant="body2" color="text.secondary">
                                {job.category}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Chip 
                                size="small" 
                                label={job.type}
                                sx={{ 
                                  bgcolor: job.type === 'Full-time' ? alpha('#27ae60', 0.1) : alpha('#f39c12', 0.1),
                                  color: job.type === 'Full-time' ? '#27ae60' : '#f39c12',
                                  fontWeight: 500
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {job.posted}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', mt: 2 }}>
                              <Button 
                                variant="contained" 
                                color="primary" 
                                size="small" 
                                sx={{ mr: 1, flex: 1 }}
                              >
                                Apply
                              </Button>
                              <IconButton 
                                size="small" 
                                sx={{ 
                                  border: `1px solid ${alpha('#000', 0.1)}`,
                                  color: darkBlueTheme.palette.secondary.main
                                }}
                              >
                                <BookmarkIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
              
              {/* Featured Employers and Trends */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardHeader title="Featured Employers" />
                    <CardContent>
                      <Grid container spacing={2}>
                        {['Bistro Elegance', 'Harbor Seafood', 'Sweet Delights', 'Urban Grill'].map((company, index) => (
                          <Grid item xs={6} sm={3} key={index}>
                            <Paper
                              sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-5px)',
                                }
                              }}
                            >
                              <Avatar sx={{ width: 60, height: 60, mb: 1, bgcolor: darkBlueTheme.palette.primary.main }}>
                                {company.split(' ').map(word => word[0]).join('')}
                              </Avatar>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                {company}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {index + 1} open positions
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader 
                      title="Industry Trends" 
                      avatar={<TrendingUpIcon color="primary" />}
                    />
                    <CardContent>
                      <List disablePadding>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <StarIcon sx={{ color: '#f1c40f' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Sous Chef positions up 12%" 
                            secondary="Compared to last quarter" 
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <FavoriteIcon sx={{ color: '#e74c3c' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary="High demand for Pastry Chefs" 
                            secondary="Especially in urban areas"
                          />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <BusinessIcon sx={{ color: '#3498db' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary="Restaurant industry growth at 7%" 
                            secondary="Projections for next year"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserDashboard;