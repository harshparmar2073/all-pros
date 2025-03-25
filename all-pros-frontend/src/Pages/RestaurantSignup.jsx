import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Collapse,
  Link,
  Checkbox,
  FormGroup,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Restaurant,
  Star,
  Person,
  Business,
  LocationOn,
  Phone,
  Support,
  Home,
  Lock,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomSnackbar from '../components/CustomSnackbar';
import logo from '../assets/logo.png';
import RestaurantSignupImage from '../assets/adminsignup.png';

const RestaurantSignup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [hasBranches, setHasBranches] = React.useState('no');
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const navigate = useNavigate();

  const restaurantTypes = [
    'Casual Dining',
    'Fine Dining',
    'Cafe',
    'Fast Food',
    'Bar',
    'Buffet',
    'Food Truck',
    'Other',
  ];

  const formik = useFormik({
    initialValues: {
      restaurantName: '',
      ownerName: '',
      contactPersonName: '',
      location: '',
      phoneNumber: '',
      supportEmail: '',
      password: '',
      confirmPassword: '',
      restaurantType: '',
      hasBranches: 'no',
      branchLocation: '',
    },
    validationSchema: Yup.object({
      restaurantName: Yup.string().required('Name of Restaurant is required'),
      ownerName: Yup.string().required('Name of Owner is required'),
      contactPersonName: Yup.string().required('Name of Contact person is required'),
      location: Yup.string().required('Location is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      supportEmail: Yup.string().email('Invalid email').required('Support Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      restaurantType: Yup.string().required('Type of Restaurant is required'),
      branchLocation: Yup.string().when('hasBranches', {
        is: 'yes',
        then: () => Yup.string().required('Branch Location is required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/api/restaurants/signup', values);
        console.log('Signup successful:', response.data);
        setSnackbarMessage('Signup successful! Redirecting...');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Signup error:', error.response ? error.response.data : error.message);
        setSnackbarMessage('Error during signup. Please try again.');
        setSnackbarOpen(true);
      }
    },
  });

  const handleBranchChange = (event) => {
    setHasBranches(event.target.value);
    formik.setFieldValue('hasBranches', event.target.value);
  };

  return (
    <Paper
      elevation={10}
      sx={{
        maxWidth: '1000px',
        mx: 'auto',
        my: 4,
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid rgba(153, 27, 27, 0.2)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)',
            p: 4,
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            minHeight: '800px',
            borderRadius: '0 0 0 24px',
          }}
        >
          {/* Left side visuals */}
          <Box
            sx={{
              position: 'absolute',
              top: '-40%',
              left: '40%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
              animation: 'spotlight 15s infinite alternate',
            }}
          />
          {['🍕', '🍔', '🍷', '🍰', '🍣', '🥗', '🍱', '🥂', '🍝', '🌮', '🍦', '🥐'].map((emoji, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                fontSize: `${Math.random() * 16 + 24}px`,
                opacity: 0.7,
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))',
                animation: `floatEmoji ${8 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                zIndex: 1,
              }}
            >
              {emoji}
            </Box>
          ))}
          {[...Array(10)].map((_, i) => (
            <Box
              key={`accent-${i}`}
              sx={{
                position: 'absolute',
                width: `${Math.random() * 60 + 40}px`,
                height: `${Math.random() * 60 + 40}px`,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                animation: `pulsate ${5 + i * 2}s ease-in-out infinite`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                zIndex: 0,
              }}
            />
          ))}
          <Box
            sx={{
              position: 'absolute',
              bottom: '15%',
              right: '5%',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #A52A2A, #d2691e)',
              opacity: 0.7,
              animation: 'pulse 5s infinite ease-in-out',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 0.7 },
                '50%': { transform: 'scale(1.1)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 0.7 },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              transform: 'rotate(45deg)',
              background: '#d2691e',
              opacity: 0.5,
              animation: 'rotate 8s infinite linear',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              width: '400px',
              height: '400px',
              mb: 6,
              mt: 4,
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                border: '10px solid rgba(255, 215, 0, 0.3)',
                top: '-10px',
                left: '-10px',
                animation: 'rotate 25s linear infinite',
              }}
            />
            <Box
              sx={{
                width: '80%',
                height: '80%',
                backgroundImage: `url(${RestaurantSignupImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))',
                transform: 'scale(1.15)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                border: '2px solid rgba(255, 215, 0, 0.15)',
                top: '-25px',
                left: '-25px',
                animation: 'rotate 30s linear infinite',
              }}
            />
            {[...Array(8)].map((_, i) => {
              const angle = (i * 72) * Math.PI / 180;
              const x = Math.cos(angle) * 210;
              const y = Math.sin(angle) * 210;
              return (
                <Box
                  key={`star-${i}`}
                  sx={{
                    position: 'absolute',
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                    color: 'rgba(255, 215, 0, 0.6)',
                    animation: `twinkle ${3 + i}s ease-in-out infinite`,
                  }}
                >
                  <Star sx={{ fontSize: 24 }} />
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              background: 'rgba(0,0,0,0.2)',
              p: 3,
              mt: 4,
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
              maxWidth: '80%',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              textAlign: 'center',
              zIndex: 5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                textAlign: 'center',
                letterSpacing: '2px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                mb: 2,
              }}
            >
              Culinary Connect
            </Typography>
            <Divider sx={{ borderColor: 'rgba(255,215,0,0.4)', width: '60%', mx: 'auto', mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 215, 0, 0.9)',
                textAlign: 'center',
                maxWidth: '95%',
                lineHeight: 1.6,
                fontWeight: 'bold',
                fontStyle: 'italic',
                textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                mb: 2,
              }}
            >
              "From Kitchen Dreams to Culinary Excellence"
            </Typography>
          </Box>
          <style>
            {`
              @keyframes floatEmoji {
                0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.7; }
                50% { transform: translateY(-40px) rotate(15deg) scale(1.1); opacity: 0.9; }
                100% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0.7; }
              }
              @keyframes pulsate {
                0% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.3); opacity: 0.8; }
                100% { transform: scale(1); opacity: 0.5; }
              }
              @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes wave {
                0% { background-position-x: 0; }
                100% { background-position-x: 1000px; }
              }
              @keyframes spotlight {
                0% { opacity: 0.3; transform: translateX(0) translateY(0); }
                50% { opacity: 0.7; transform: translateX(-100px) translateY(50px); }
                100% { opacity: 0.3; transform: translateX(100px) translateY(-50px); }
              }
              @keyframes twinkle {
                0% { opacity: 0.3; transform: scale(0.8) translate(-50%, -50%); }
                50% { opacity: 1; transform: scale(1.2) translate(-50%, -50%); }
                100% { opacity: 0.3; transform: scale(0.8) translate(-50%, -50%); }
              }
            `}
          </style>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: { xs: 4, md: 6 },
            background: 'linear-gradient(to bottom, #ffffff, #fecaca)',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 24px 24px 0',
          }}
        >
          <Box sx={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #7f1d1d 30%, #b91c1c 90%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 10px 25px rgba(133, 43, 43, 0.5)',
                  mb: 2,
                  border: '2px solid rgb(255, 215, 0, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    backgroundImage: 'radial-gradient(circle, rgba(43, 40, 22, 0.3) 10%, transparent 60%)',
                    animation: 'rotate 8s linear infinite',
                    opacity: 0.5,
                  }}
                />
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(151, 42, 42, 0.2))',
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: '#7f1d1d', mb: 0.5, letterSpacing: '2px', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
              >
                CULINARY CONNECT
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#4b5563',
                  fontStyle: 'italic',
                  padding: '2px 12px',
                  borderRadius: '20px',
                  background: 'rgba(255,215,0,0.1)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  display: 'inline-block',
                }}
              >
                Where Restaurants Thrive Digitally
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  color: '#7f1d1d',
                  mb: 1,
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                Restaurant Signup
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-3px',
                    left: '10%',
                    width: '80%',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
                    borderRadius: '2px',
                  }}
                />
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Please fill in the details to create your account
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  label="Name of Restaurant"
                  name="restaurantName"
                  fullWidth
                  value={formik.values.restaurantName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.restaurantName && Boolean(formik.errors.restaurantName)}
                  helperText={formik.touched.restaurantName && formik.errors.restaurantName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Restaurant sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Name of Owner"
                  name="ownerName"
                  fullWidth
                  value={formik.values.ownerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
                  helperText={formik.touched.ownerName && formik.errors.ownerName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Name of Contact Person"
                  name="contactPersonName"
                  fullWidth
                  value={formik.values.contactPersonName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactPersonName && Boolean(formik.errors.contactPersonName)}
                  helperText={formik.touched.contactPersonName && formik.errors.contactPersonName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Support Email"
                  name="supportEmail"
                  fullWidth
                  value={formik.values.supportEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.supportEmail && Boolean(formik.errors.supportEmail)}
                  helperText={formik.touched.supportEmail && formik.errors.supportEmail}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Support sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#7f1d1d' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'rgba(127, 29, 29, 0.5)',
                      },
                    },
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="restaurantType-label">Type of Restaurant</InputLabel>
                  <Select
                    labelId="restaurantType-label"
                    name="restaurantType"
                    value={formik.values.restaurantType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Type of Restaurant"
                    error={formik.touched.restaurantType && Boolean(formik.errors.restaurantType)}
                  >
                    {restaurantTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.restaurantType && formik.errors.restaurantType && (
                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                      {formik.errors.restaurantType}
                    </Typography>
                  )}
                </FormControl>
                <FormControl component="fieldset" sx={{ mt: 2, border: '1px solid #ccc', borderRadius: '4px', p: 2 }}>
                  <FormLabel component="legend" sx={{ color: '#7f1d1d', '&.Mui-focused': { color: '#7f1d1d' } }}>
                    Is there any branches?
                  </FormLabel>
                  <RadioGroup
                    aria-label="hasBranches"
                    name="hasBranches"
                    value={hasBranches}
                    onChange={handleBranchChange}
                    row
                    sx={{ justifyContent: 'center' }}
                  >
                    <FormControlLabel value="yes" control={<Radio sx={{ '&.Mui-checked': { color: '#7f1d1d' } }} />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio sx={{ '&.Mui-checked': { color: '#7f1d1d' } }} />} label="No" />
                  </RadioGroup>
                </FormControl>
                <Collapse in={hasBranches === 'yes'}>
                  <TextField
                    label="Location of Branch"
                    name="branchLocation"
                    fullWidth
                    value={formik.values.branchLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.branchLocation && Boolean(formik.errors.branchLocation)}
                    helperText={formik.touched.branchLocation && formik.errors.branchLocation}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home sx={{ color: '#7f1d1d' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'rgba(127, 29, 29, 0.5)',
                        },
                      },
                    }}
                  />
                </Collapse>
                <FormGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                    label={
                      <Typography variant="body2">
                        I agree to the <Link href="#" underline="always">Terms and Conditions</Link>
                      </Typography>
                    }
                  />
                </FormGroup>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={!termsAccepted}
                  sx={{
                    background: 'linear-gradient(45deg, #7f1d1d 30%, #b91c1c 90%)',
                    color: '#ffffff',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #b91c1c 30%, #7f1d1d 90%)',
                    },
                    py: 1.5,
                    mt: 2,
                    boxShadow: '0 5px 15px rgba(127, 29, 29, 0.3)',
                  }}
                >
                  Sign Up
                </Button>
                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                  Already have an account? <Link href="/restaurant-login" underline="always">Sign in</Link>
                </Typography>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>
      <CustomSnackbar open={snackbarOpen} message={snackbarMessage} onClose={() => setSnackbarOpen(false)} />
    </Paper>
  );
};

export default RestaurantSignup;
