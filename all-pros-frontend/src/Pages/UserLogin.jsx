import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Divider,
  Avatar,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import UserIcon from '../assets/login .png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../components/CustomSnackbar';
import logo from '../assets/logo.png';

const UserLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/verification', { 
      state: { loginType: 'user-login' }, 
      replace: true 
    });
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
      // In a real application, this would be an API call
      if (values.email === 'user@example.com' && values.password === 'user123') {
        setSnackbarMessage('Login successful! Redirecting...');
        setSnackbarOpen(true);
        setTimeout(() => {
          handleLogin();
        }, 1500);
      } else {
        setSnackbarMessage('Invalid credentials. Please try again.');
        setSnackbarOpen(true);
      }
    }
  });

  const handleSignupRedirect = () => {
    navigate('/user-signup');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, sm: 8 }, mb: 4 }}>
      <Card
        elevation={12}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(to bottom, #ffffff, #f5f3ff)',
          border: '1px solid rgba(106, 90, 205, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 22px 45px 2px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Grid container>
            {/* Left side - Logo and branding */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                background: 'linear-gradient(60deg, rgba(106, 90, 205, 0.99) 30%, rgb(138, 43, 226) 80%)',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                color: 'white',
                textAlign: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Background decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-20%',
                  left: '-20%',
                  width: '140%',
                  height: '140%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  zIndex: 0,
                }}
              />
              
              {/* Animated circles */}
              {[...Array(20)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: `${Math.random() * 50 + 20}px`,
                    height: `${Math.random() * 50 + 20}px`,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`,
                  }}
                />
              ))}
              
              <Box sx={{
                position: 'relative',
                top: 0,
                left: '15%',
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                transform: 'rotate(45deg)',
                background: 'white',
                opacity: 0.2,
                animation: 'rotate 6s infinite linear'
              }} />
              
              <Avatar
                src={UserIcon}
                alt="User"
                sx={{
                  width: 200,
                  height: 200,
                  mb: 3,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  zIndex: 1,
                }}
              />

              <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                  letterSpacing: 1,
                  mb: 1,
                  zIndex: 1,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                User Login
              </Typography>

              <Divider 
                sx={{ 
                  width: '40%', 
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  zIndex: 1,
                }}
              />

              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontStyle: 'italic',
                  zIndex: 1,
                }}
              >
                Where Restaurant Talent Meets Opportunity
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  zIndex: 1,
                  textTransform: 'none',
                  borderRadius: 2,
                }}
              >
                Sign In
              </Button>
            </Grid>

            {/* Right side - Login form */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    mb: 5,
                    mx: 'auto',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.05)' },
                      '100%': { transform: 'scale(1)' },
                    },
                  }}
                />
                <Typography variant="h4" fontWeight="bold" color="#7b2cbf">
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="hsla(272, 63.60%, 8.60%, 0.55)">
                  Sign in to access your admin dashboard
                </Typography>
              </Box>
   
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  margin="normal"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#7b2cbf' }} />
                      </InputAdornment>
                    ),
                  }}
                />
   
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#7b2cbf' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <VisibilityOff sx={{ color: '#7b2cbf' }} />
                          ) : (
                            <Visibility sx={{ color: '#7b2cbf' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
   
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{ color: '#7b2cbf', '&.Mui-checked': { color: 'hsla(272, 63.60%, 8.60%, 0.55)' } }}
                      />
                    }
                    label="Remember me"
                  />
                  <Button
                    variant="text"
                    sx={{
                      color: '#7b2cbf',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password?
                  </Button>
                </Box>
   
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 4,
                      py: 1.8,
                      px: 8,
                      background: 'linear-gradient(135deg, #7b2cbf, #3a0ca3)',
                      color: '#fff',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderRadius: '50px',
                      boxShadow: '0 8px 25px rgba(58, 12, 163, 0.4)',
                      transition: 'all 0.4s ease',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a189a, #3a0ca3)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 10px 30px rgba(58, 12, 163, 0.5)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
   
                {/* Don't have an account link */}
                <Typography
                  variant="body2"
                  sx={{ mt: 2, textAlign: 'center', color: '#555' }}
                >
                  Don&apos;t have an account?{' '}
                  <Button
                    variant="text"
                    sx={{ color: 'rgb(128, 16, 227)', textTransform: 'none' }}
                    onClick={handleSignupRedirect}
                  >
                    Create Account
                  </Button>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <CustomSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarMessage.includes('successful') ? 'success' : 'error'}
      />
    </Container>
  );
};

export default UserLogin;