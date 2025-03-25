import React, { useState, useEffect } from 'react';
import { keyframes, useTheme } from '@mui/system';
import {
  useMediaQuery,
  Badge,
  Box,
  Avatar,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Breadcrumbs,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CloseIcon from '@mui/icons-material/Close';
import RateReviewIcon from '@mui/icons-material/RateReview';
import UpdateIcon from '@mui/icons-material/Update';

import logo from '../assets/logo.png'; // adjust path as needed
import Jobs from '../components/Jobs';
import Applications from '../components/Applications';
import CreateJob from '../components/CreateJob';
import DashboardPlaceholder from '../components/DashboardPlaceholder';
import CalendarView from '../components/CalendarView';
import RestaurantProfile from '../components/RestaurantProfile';
import RestaurantSettings from '../components/RestaurantSettings';

const drawerWidth = 240;

// Keyframes for floating particles animation
const floatAnimation = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { opacity: 0.8; }
  100% { transform: translateY(-20px) scale(0.8); opacity: 0; }
`;

// Pulse animation for notification icons
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// FloatingParticles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 25 });
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none'
      }}
    >
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 4 + 3;
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              bgcolor: '#FFD700',
              opacity: 0,
              animation: `${floatAnimation} ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </Box>
  );
};

// Drawer Menu Items
const drawerMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Jobs', icon: <WorkIcon /> },
  { text: 'Application', icon: <PeopleIcon /> },
  { text: 'Coming Soon', icon: <AccessTimeIcon /> }
];

// Profile Menu Items (includes Notifications)
const profileMenuItems = [
  { text: 'Notifications', icon: <NotificationsIcon fontSize="small" /> },
  { text: 'Profile', icon: <PersonIcon fontSize="small" /> },
  { text: 'Settings', icon: <SettingsIcon fontSize="small" /> },
  { text: 'Help', icon: <HelpOutlineIcon fontSize="small" /> },
  { text: 'Sign Out', icon: <LogoutIcon fontSize="small" /> }
];

export default function RestaurantDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Profile dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Tailored Notifications for Restaurant Job Board
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Application Received',
      description: 'Candidate John Doe applied for the Chef position.',
      timestamp: '3 min ago',
      icon: <PeopleIcon fontSize="small" sx={{ color: '#4e1f1f', animation: `${pulse} 2s infinite` }} />
    },
    {
      id: 2,
      title: 'Job Posting Approved',
      description: 'Your posting for Sous Chef has been approved.',
      timestamp: '8 min ago',
      icon: <AssignmentTurnedInIcon fontSize="small" sx={{ color: '#c76b4f', animation: `${pulse} 2s infinite` }} />
    },
    {
      id: 3,
      title: 'Job Posting Expiring Soon',
      description: 'Posting for Pastry Chef expires in 2 days.',
      timestamp: '20 min ago',
      icon: <AccessTimeIcon fontSize="small" sx={{ color: '#a33d2f', animation: `${pulse} 2s infinite` }} />
    },
    {
      id: 4,
      title: 'New Review Received',
      description: 'A candidate left feedback on your posting.',
      timestamp: '35 min ago',
      icon: <RateReviewIcon fontSize="small" sx={{ color: '#4e1f1f', animation: `${pulse} 2s infinite` }} />
    },
    {
      id: 5,
      title: 'System Update',
      description: 'The job board system was updated successfully.',
      timestamp: '50 min ago',
      icon: <UpdateIcon fontSize="small" sx={{ color: '#c76b4f', animation: `${pulse} 2s infinite` }} />
    }
  ]);

  // Remove single notification
  const handleRemoveNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  // Handle sign out (redirect user to login)
  const handleSignOut = () => {
    navigate('/restaurant-login');
  };

  // Selected menu state for main content rendering
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  // Jobs state with sample data
  const [jobs, setJobs] = useState([]);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const handleOpenCreateJob = () => setShowCreateJob(true);
  const handleCloseCreateJob = () => setShowCreateJob(false);

  // Dynamic user data – in a real app, fetch from API or authentication context
  const [userData, setUserData] = useState({
    name: 'Allie Grater',
    email: 'alliegrater@luno.com',
    avatar: 'https://via.placeholder.com/80',
    initials: 'AG',
    restaurantData: {
      name: 'Bella Italia Restaurant',
      address: '123 Culinary Avenue',
      location: 'New York, NY 10001',
      email: 'info@bellaitalia.com',
      phone: '(212) 555-7890',
      type: 'Italian Fine Dining',
      contactPerson: 'Allie Grater',
      yearsOpen: 12,
      cuisine: 'Italian',
      specialties: ['Wood-fired Pizza', 'Handmade Pasta', 'Tiramisu'],
      operatingHours: 'Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM',
      priceRange: '$$$',
      rating: 4.7,
      description:
        'Bella Italia offers an authentic Italian dining experience with recipes passed down through generations. Our chefs use only the finest imported ingredients to create memorable dishes in a warm, inviting atmosphere.'
    }
  });

  // Simulate fetching dynamic user data
  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    };
    fetchUserData();
  }, []);

  // Add new job handler
  const handleAddNewJob = (newJob) => {
    setJobs([...jobs, newJob]);
    handleCloseCreateJob();
    if (selectedMenu !== 'Jobs') {
      setSelectedMenu('Jobs');
    }
  };

  // Handle clicks for profile menu items
  const handleMenuItemClick = (text) => {
    handleMenuClose();
    if (text === 'Sign Out') {
      handleSignOut();
    } else if (text === 'Notifications') {
      setSelectedMenu('Notifications');
    } else {
      setSelectedMenu(text);
    }
  };

  // Render main content based on selected menu
  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return <DashboardPlaceholder />;
      case 'Jobs':
        if (showCreateJob) {
          return <CreateJob onClose={handleCloseCreateJob} onCreateJob={handleAddNewJob} />;
        }
        return <Jobs jobs={jobs} onOpenCreateJob={handleOpenCreateJob} />;
      case 'Application':
        return <Applications />;
      case 'Coming Soon':
        return <Typography variant="h4">Coming Soon Content</Typography>;
      case 'Calendar':
        return <CalendarView />;
      case 'Profile':
        return <RestaurantProfile restaurantData={userData.restaurantData} />;
      case 'Settings':
        return <RestaurantSettings />;
      case 'Help':
        return <Typography variant="h4">Help Content</Typography>;
      case 'Notifications':
        return (
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #f8e1d3, #f3d2c1)',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#8B2500' }}>
              Notifications ({notifications.length} new)
            </Typography>
            {notifications.length > 0 ? (
              <List>
                {notifications.map((notif) => (
                  <ListItem
                    key={notif.id}
                    alignItems="flex-start"
                    divider
                    sx={{
                      background: '#fff',
                      borderRadius: 2,
                      mb: 1,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 50 }}>{notif.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#4e1f1f' }}>
                          {notif.title}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" sx={{ color: '#6b2e2e' }}>
                            {notif.description}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {notif.timestamp}
                          </Typography>
                        </>
                      }
                    />
                    <IconButton edge="end" size="small" onClick={() => handleRemoveNotification(notif.id)}>
                      <CloseIcon fontSize="small" sx={{ color: '#a33d2f' }} />
                    </IconButton>
                  </ListItem>
                ))}
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                  <Button size="small" onClick={handleMarkAllAsRead} sx={{ color: '#8B2500' }}>
                    Mark all as read
                  </Button>
                </Box>
              </List>
            ) : (
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                No new notifications.
              </Typography>
            )}
          </Box>
        );
      default:
        return <Typography variant="h4">Select an option from the menu</Typography>;
    }
  };

  // Drawer content (left side)
  const drawerContent = (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <FloatingParticles />
      {/* Logo & Company Name Row */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          borderBottom: '1px dotted rgba(255,255,255,0.5)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Avatar src={logo} sx={{ width: 60, height: 60 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFF' }}>
          All Pro Restaurant Coaches
        </Typography>
      </Box>
      {/* Dynamic Profile Section */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #8B2500, #A52A2A)',
          color: '#FFF',
          borderBottom: '1px dotted rgba(255,255,255,0.5)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Avatar
          src={userData.avatar}
          sx={{
            width: 80,
            height: 80,
            border: '4px solid #FFF',
            margin: '0 auto'
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
          {userData.name}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {userData.email}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
      {/* Drawer Menu List */}
      <List sx={{ position: 'relative', zIndex: 1 }}>
        {drawerMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                setSelectedMenu(item.text);
                if (isMobile) setMobileOpen(false);
              }}
              selected={selectedMenu === item.text}
              sx={{
                '&.Mui-selected': { backgroundColor: 'rgba(255, 215, 0, 0.2)' },
                '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.15)' }
              }}
            >
              <ListItemIcon sx={{ color: selectedMenu === item.text ? '#FFD700' : '#EEE' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: '#FFF',
                  fontWeight: selectedMenu === item.text ? 'bold' : 'normal'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Quick actions for SpeedDial
  const speedDialActions = [
    {
      icon: <AssignmentTurnedInIcon />,
      name: 'Dashboard',
      action: () => setSelectedMenu('Dashboard')
    },
    {
      icon: <CalendarMonthIcon />,
      name: 'Calendar',
      action: () => setSelectedMenu('Calendar')
    },
    {
      icon: <LogoutIcon />,
      name: 'Sign Out',
      action: () => handleSignOut()
    }
  ];

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Paper elevation={0} sx={{ position: 'absolute', width: '100%' }}>
        <Box />
      </Paper>
      {isMobile ? (
        <>
          <AppBar
            position="fixed"
            elevation={4}
            sx={{
              width: '100%',
              background: 'linear-gradient(45deg, #8B2500, #A52A2A)',
              color: '#FFF'
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                {userData.name}
              </Typography>
              <Avatar sx={{ bgcolor: '#FFD700', color: '#8B2500' }}>
                {userData.initials}
              </Avatar>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: 'linear-gradient(45deg, #8B2500, #A52A2A)',
                color: '#FFF'
              }
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: 'linear-gradient(45deg, #8B2500, #A52A2A)',
                color: '#FFF'
              }
            }}
            open
          >
            {drawerContent}
          </Drawer>
          <AppBar
            position="fixed"
            elevation={4}
            sx={{
              left: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              background: 'linear-gradient(45deg, #8B2500, #A52A2A)',
              color: '#FFF'
            }}
          >
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {userData.name}
              </Typography>
              <Avatar sx={{ bgcolor: '#FFD700', color: '#8B2500' }}>
                {userData.initials}
              </Avatar>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 1, color: '#FFF' }}>
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {profileMenuItems.map((item) => (
                  <MenuItem key={item.text} onClick={() => handleMenuItemClick(item.text)}>
                    <ListItemIcon sx={{ minWidth: 32, color: '#8B2500' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </MenuItem>
                ))}
              </Menu>
            </Toolbar>
          </AppBar>
        </>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: '120px',
          background: '#FFF',
          position: 'relative',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '15px 15px',
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            maxWidth: '800px',
            mx: 0,
            px: 2,
            py: 1,
            mt: '65px',
            borderRadius: 2,
            mb: 2,
            position: 'relative',
            zIndex: 2
          }}
        >
          <Breadcrumbs separator="›">
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, color: '#8B2500', cursor: 'pointer' }}
              onClick={() => setSelectedMenu('Dashboard')}
            >
              Home
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#8B2500' }}>
              {selectedMenu}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'relative', zIndex: 2 }}>
          {renderContent()}
        </Paper>
      </Box>

      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#FFD700',
          color: '#8B2500',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)'
        }}
        aria-label="settings"
        onClick={() => setSelectedMenu('Settings')}
      >
        <SettingsIcon />
      </Fab>

      <SpeedDial
        ariaLabel="Quick actions"
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          '& .MuiFab-primary': {
            backgroundColor: '#FFD700',
            color: '#8B2500',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: '#FFC700'
            }
          }
        }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
