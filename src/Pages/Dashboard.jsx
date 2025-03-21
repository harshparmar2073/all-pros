import React from 'react';
import { keyframes, useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  CssBaseline,
  Divider,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import logo from '../assets/logo.png'; // adjust path as needed
import Jobs from '../components/Jobs';
import Applications from '../components/Applications' 
import CreateJob from '../components/CreateJob'; 
import DashboardPlaceholder from '../components/DashboardPlaceholder';

const drawerWidth = 240;

// Keyframes for floating particles animation
const floatAnimation = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 1; }
  50% { opacity: 0.8; }
  100% { transform: translateY(-20px) scale(0.8); opacity: 0; }
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
        pointerEvents: 'none',
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
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </Box>
  );
};

const drawerMenuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Jobs', icon: <WorkIcon /> },
  { text: 'Application', icon: <PeopleIcon /> },
  { text: 'Coming Soon', icon: <AccessTimeIcon /> },
];

const profileMenuItems = [
  { text: 'Profile', icon: <PersonIcon fontSize="small" /> },
  { text: 'Settings', icon: <SettingsIcon fontSize="small" /> },
  { text: 'Help', icon: <HelpOutlineIcon fontSize="small" /> },
  { text: 'Sign Out', icon: <LogoutIcon fontSize="small" /> },
];

export default function RestaurantDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Profile dropdown state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Handle sign out
  const handleSignOut = () => {
    // You might want to clear any local storage/session data here
    // localStorage.removeItem('authToken');
    // sessionStorage.clear();
    
    // Redirect to login page
    navigate('/restaurant-login');
  };

  // Selected menu state
  const [selectedMenu, setSelectedMenu] = React.useState('Application');

  // Jobs state with sample data
  const [jobs, setJobs] = React.useState([
    // {
    //   title: "Head Chef",
    //   description: "Manage kitchen operations and create new menu items",
    //   specialization: "Fine Dining",
    //   postedOn: "2025-03-10",
    //   startDate: "2025-04-01",
    //   endDate: "2025-12-31",
    //   assignedBy: "Restaurant Manager",
    //   status: "Active",
    //   totalUsers: 15
    // },
    // {
    //   title: "Line Cook",
    //   description: "Prepare food items according to recipes",
    //   specialization: "Casual Dining",
    //   postedOn: "2025-03-15",
    //   startDate: "2025-03-25",
    //   endDate: "2025-09-30",
    //   assignedBy: "Head Chef",
    //   status: "Pending",
    //   totalUsers: 8
    // }
  ]);
  
  const [showCreateJob, setShowCreateJob] = React.useState(false);
  
  const handleOpenCreateJob = () => setShowCreateJob(true);
  
  const handleCloseCreateJob = () => setShowCreateJob(false);
  
  // Function to add a new job
  const handleAddNewJob = (newJob) => {
    setJobs([...jobs, newJob]);
    handleCloseCreateJob();
    // If not already on Jobs menu, switch to it to see the new job
    if (selectedMenu !== 'Jobs') {
      setSelectedMenu('Jobs');
    }
  };

  // Handle menu item click with additional logic for sign out
  const handleMenuItemClick = (text) => {
    if (text === 'Sign Out') {
      handleSignOut();
    } else {
      handleMenuClose();
      setSelectedMenu(text);
    }
  };

  // Render dynamic main content
  const renderContent = () => {
    switch (selectedMenu) {
      case 'Dashboard':
        return <DashboardPlaceholder/>;

      case 'Jobs':
        if (showCreateJob) {
          return <CreateJob onClose={handleCloseCreateJob} onCreateJob={handleAddNewJob} />;
        }
        return <Jobs jobs={jobs} onOpenCreateJob={handleOpenCreateJob} />;

      case 'Application':
        return <Applications />;

      case 'Coming Soon':
        return <Typography variant="h4">Coming Soon Content</Typography>;

      case 'Help':
        return <Typography variant="h4">Help Content</Typography>;

      default:
        return <Typography variant="h4">Select an option from the menu</Typography>;
    }
  };

  // Drawer content
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
          zIndex: 1,
        }}
      >
        <Avatar src={logo} sx={{ width: 60, height: 60 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFF' }}>
          All Pro Restaurant Coaches
        </Typography>
      </Box>
      {/* Profile Section */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #8B2500, #A52A2A)',
          color: '#FFF',
          borderBottom: '1px dotted rgba(255,255,255,0.5)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Avatar
          src="https://via.placeholder.com/80"
          sx={{
            width: 80,
            height: 80,
            border: '4px solid #FFF',
            margin: '0 auto',
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
          Allie Grater
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          alliegrater@luno.com
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
      {/* Quick Action Icons */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #8B2500, #A52A2A)',
          p: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton onClick={() => setSelectedMenu('Dashboard')} sx={{ color: '#FFD700' }}>
            <AssignmentTurnedInIcon />
          </IconButton>
          <IconButton onClick={() => setSelectedMenu('Jobs')} sx={{ color: '#FFD700' }}>
            <CalendarMonthIcon />
          </IconButton>
          <IconButton onClick={handleSignOut} sx={{ color: '#FFD700' }}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)' }} />
      {/* Menu List */}
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
                '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.15)' },
              }}
            >
              <ListItemIcon sx={{ color: selectedMenu === item.text ? '#FFD700' : '#EEE' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: '#FFF',
                  fontWeight: selectedMenu === item.text ? 'bold' : 'normal',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      {/* Mobile: Temporary Drawer */}
      {isMobile ? (
        <>
          <AppBar
            position="fixed"
            elevation={4}
            sx={{
              width: '100%',
              background: 'linear-gradient(45deg, #8B2500, #A52A2A)',
              color: '#FFF',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Allie Grater</Typography>
              <Box>
                <IconButton color="inherit" sx={{ mr: 1 }}>
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Avatar sx={{ bgcolor: '#FFD700', color: '#8B2500' }}>AG</Avatar>
              </Box>
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
                color: '#FFF',
              },
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
                color: '#FFF',
              },
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
              color: '#FFF',
            }}
          >
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
              <IconButton color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Typography variant="body1" sx={{ mr: 1 }}>
                Allie Grater
              </Typography>
              <Avatar sx={{ bgcolor: '#FFD700', color: '#8B2500' }}>AG</Avatar>
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
                  <MenuItem 
                    key={item.text} 
                    onClick={() => handleMenuItemClick(item.text)}
                  >
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
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: '120px',
          background: '#FFF',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        {/* Dotted Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '15px 15px',
            pointerEvents: 'none',
          }}
        />
        {/* Breadcrumbs */}
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
            zIndex: 2,
          }}
        >
          <Breadcrumbs separator="›">
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#8B2500' }}>
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
      {/* Floating Help Button */}
      <Fab
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#FFD700',
          color: '#8B2500',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
        }}
        aria-label="help"
        onClick={() => setSelectedMenu('Help')}
      >
        <HelpOutlineIcon />
      </Fab>
    </Box>
  );
}