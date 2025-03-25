import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
  Switch,
  Paper,
  Stack,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Fade
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  NotificationsActive,
  LockOutlined,
  SecurityOutlined,
  SettingsOutlined,
  EmailOutlined,
  PhoneOutlined,
  Language
} from '@mui/icons-material';

const customButtonSx = {
  backgroundColor: '#A52A2A', // reddish brown
  color: '#fff',
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    backgroundColor: '#8B0000', // darker shade on hover
    transform: 'scale(1.05)',
  },
  textTransform: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const RestaurantSettings = () => {
  // State for active section
  const [activeSection, setActiveSection] = useState('password');
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: 'all',
    mobileNotifications: 'important',
    notifyNewOrders: true,
    notifyReservations: true,
    notifyReviews: false,
    notifySystemUpdates: true
  });
  
  // Alert state
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Handle password field changes
  const handlePasswordChange = (field) => (e) => {
    setPasswordData({
      ...passwordData,
      [field]: e.target.value
    });
  };
  
  // Handle notification toggle
  const handleToggleChange = (field) => (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: e.target.checked
    });
  };
  
  // Handle radio button changes
  const handleRadioChange = (field) => (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: e.target.value
    });
  };
  
  // Handle password change submission
  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({
        open: true,
        message: 'New passwords do not match',
        severity: 'error'
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setAlert({
        open: true,
        message: 'Password must be at least 8 characters',
        severity: 'error'
      });
      return;
    }
    
    // Simulating API call
    setTimeout(() => {
      setAlert({
        open: true,
        message: 'Password updated successfully',
        severity: 'success'
      });
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };
  
  // Handle notification settings save
  const handleNotificationSave = () => {
    setAlert({
      open: true,
      message: 'Notification preferences saved successfully',
      severity: 'success'
    });
  };
  
  // Handle alert close
  const handleAlertClose = () => {
    setAlert({
      ...alert,
      open: false
    });
  };
  
  // Render the password change form
  const renderPasswordSection = () => (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          Change Password
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Password"
              type={showOldPassword ? 'text' : 'password'}
              value={passwordData.oldPassword}
              onChange={handlePasswordChange('oldPassword')}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={handlePasswordChange('newPassword')}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange('confirmPassword')}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              <Button 
                variant="contained" 
                onClick={handlePasswordSubmit}
                sx={{ ...customButtonSx, px: 4 }}
              >
                Update Password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
  
  // Render notification settings
  const renderNotificationSection = () => (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          Notification Preferences
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>Email Notifications</FormLabel>
            <RadioGroup
              name="emailNotifications"
              value={notificationSettings.emailNotifications}
              onChange={handleRadioChange('emailNotifications')}
            >
              <FormControlLabel value="all" control={<Radio />} label="All notifications" />
              <FormControlLabel value="important" control={<Radio />} label="Important notifications only" />
              <FormControlLabel value="none" control={<Radio />} label="No email notifications" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Box sx={{ mb: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>Mobile Notifications</FormLabel>
            <RadioGroup
              name="mobileNotifications"
              value={notificationSettings.mobileNotifications}
              onChange={handleRadioChange('mobileNotifications')}
            >
              <FormControlLabel value="all" control={<Radio />} label="All notifications" />
              <FormControlLabel value="important" control={<Radio />} label="Important notifications only" />
              <FormControlLabel value="none" control={<Radio />} label="No mobile notifications" />
            </RadioGroup>
          </FormControl>
        </Box>
        
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          Notification Types
        </Typography>
        
        <Box sx={{ pl: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifyNewOrders}
                    onChange={handleToggleChange('notifyNewOrders')}
                    color="primary"
                  />
                }
                label="New orders"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifyReservations}
                    onChange={handleToggleChange('notifyReservations')}
                    color="primary"
                  />
                }
                label="Reservations"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifyReviews}
                    onChange={handleToggleChange('notifyReviews')}
                    color="primary"
                  />
                }
                label="Customer reviews"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifySystemUpdates}
                    onChange={handleToggleChange('notifySystemUpdates')}
                    color="primary"
                  />
                }
                label="System updates"
              />
            </Grid>
          </Grid>
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleNotificationSave}
            sx={{ ...customButtonSx, px: 4 }}
          >
            Save Preferences
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
  
  // Render security section
  const renderSecuritySection = () => (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
          Security Settings
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <EmailOutlined />
            </ListItemIcon>
            <ListItemText 
              primary="Email Verification" 
              secondary="Your email has been verified" 
            />
            <Button 
              variant="outlined" 
              size="small"
              sx={customButtonSx}
            >
              Change Email
            </Button>
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <PhoneOutlined />
            </ListItemIcon>
            <ListItemText 
              primary="Phone Verification" 
              secondary="+1 (555) 123-4567"
            />
            <Button 
              variant="outlined" 
              size="small"
              sx={customButtonSx}
            >
              Verify
            </Button>
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <SecurityOutlined />
            </ListItemIcon>
            <ListItemText 
              primary="Two-Factor Authentication" 
              secondary="Protect your account with 2FA" 
            />
            <Button 
              variant="outlined" 
              size="small"
              color="primary"
              sx={customButtonSx}
            >
              Enable
            </Button>
          </ListItem>
        </List>
      </Paper>
    </Fade>
  );
  
  return (
    <Box sx={{ width: '100%' }}>
      <Snackbar 
        open={alert.open} 
        autoHideDuration={4000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={1} sx={{ borderRadius: 1 }}>
            <List component="nav" aria-label="settings navigation">
              <ListItem 
                button 
                selected={activeSection === 'password'}
                onClick={() => setActiveSection('password')}
              >
                <ListItemIcon>
                  <LockOutlined />
                </ListItemIcon>
                <ListItemText primary="Password" />
              </ListItem>
              
              <ListItem 
                button 
                selected={activeSection === 'notifications'}
                onClick={() => setActiveSection('notifications')}
              >
                <ListItemIcon>
                  <NotificationsActive />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              
              <ListItem 
                button 
                selected={activeSection === 'security'}
                onClick={() => setActiveSection('security')}
              >
                <ListItemIcon>
                  <SecurityOutlined />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              
              <ListItem 
                button 
                selected={activeSection === 'general'}
                onClick={() => setActiveSection('general')}
              >
                <ListItemIcon>
                  <SettingsOutlined />
                </ListItemIcon>
                <ListItemText primary="General" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper elevation={1} sx={{ borderRadius: 1 }}>
            {activeSection === 'password' && renderPasswordSection()}
            {activeSection === 'notifications' && renderNotificationSection()}
            {activeSection === 'security' && renderSecuritySection()}
            {activeSection === 'general' && (
              <Fade in={true} timeout={500}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    General Settings
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    General settings coming soon...
                  </Typography>
                </Box>
              </Fade>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RestaurantSettings;
