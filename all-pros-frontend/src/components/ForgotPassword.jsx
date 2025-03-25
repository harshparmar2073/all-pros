import React from 'react';
import {
  Box, Typography, TextField, Button, InputAdornment, IconButton,
  Paper, Grid, Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from './CustomSnackbar';
import leftImg from '../assets/Forgot password-bro.png'

const ForgotPasswordComponent = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log('Password reset link sent to:', values.email);
      setSnackbarMessage('Password reset link sent to your email.');
      setSnackbarOpen(true);
      // API call can be placed here
    },
  });

  return (
    <Paper elevation={8} sx={{
      maxWidth: '1000px', mx: 'auto', borderRadius: 4, overflow: 'hidden',
      boxShadow: '0 15px 50px rgba(0, 119, 182, 0.3)', border: '1px solid rgba(0, 119, 182, 0.15)'
    }}>
      <Grid container>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={6} sx={{
          background: 'linear-gradient(135deg,#0077b6 0%, #0091da 50%, #00a6e0 100%)',
          p: 4, display: { xs: 'none', md: 'flex' }, flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', color: '#fff'
        }}>
          <Box sx={{
            width: '280px',
            height: '280px',
            backgroundImage: `url(${leftImg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mb: 4,
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
          }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Reset Your Password
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', lineHeight: 1.8 }}>
            Forgotten your password? No worries! Enter your email, and we'll help you get back on track.
          </Typography>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={6} sx={{
          p: { xs: 4, md: 6 }, background: 'linear-gradient(to bottom, #ffffff, #e3f2fd)',
          display: 'flex', alignItems: 'center'
        }}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#0077b6', mb: 1 }}>
              Forgot Password?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Enter your registered email to receive the password reset link.
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#0077b6' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(45deg, #0077b6 30%, #0091da 90%)',
                    py: 1.5, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(0, 119, 182, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #005f8e 30%, #0077b6 90%)',
                      boxShadow: '0 6px 25px rgba(0, 119, 182, 0.5)',
                      transform: 'translateY(-2px)'
                    }
                  }}>
                  Send Reset Link
                </Button>

                <Button
                  variant="text"
                  onClick={() => navigate('/login')}
                  sx={{ color: '#0077b6', fontSize: '0.9rem' }}
                >
                  Back to Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default ForgotPasswordComponent;
