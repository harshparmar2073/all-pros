import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '@fontsource/poppins';
import '@fontsource/pacifico';
import LeftImg from '../assets/2204_w039_n003_196b_p1_196.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '120vh',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${Math.random() * 8 + 8}px`,
            height: `${Math.random() * 8 + 8}px`,
            backgroundColor: 'rgba(79, 75, 171, 0.3)',
            borderRadius: '50%',
            animation: `float ${7 + i}s linear infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 6,
          }}
        />
      ))}

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '14%',
          left: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '4px dashed rgb(167, 198, 223)',
          opacity: 0.7,
          animation: 'pulse 4s infinite',
          zIndex: 6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '35%',
          right: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #bbdefb, #90caf9)',
          opacity: 0.6,
          animation: 'float 6s infinite ease-in-out',
          zIndex: 6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '85%',
          left: '15%',
          width: '60px',
          height: '60px',
          borderRadius: '15px',
          transform: 'rotate(45deg)',
          background: '#64b5f6',
          opacity: 0.5,
          animation: 'rotate 8s infinite linear',
          zIndex: 6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #4fc3f7, #29b6f6)',
          opacity: 0.6,
          animation: 'float 5s infinite ease-in-out reverse',
          zIndex: 6,
        }}
      />

      {/* Main Content */}
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          minHeight: '120vh',
          position: 'relative',
          zIndex: 7,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left Section - Chef Illustration (hidden on small screens) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: { xs: 'none', md: 'block' },
            textAlign: 'center',
            position: 'relative',
            zIndex: 4,
          }}
        >
          <Box
            component="img"
            src={LeftImg}
            alt="Chef Illustration"
            sx={{
              width: '100%',
              maxWidth: '700px',
              height: 'auto',
              mx: 'auto',
            }}
          />
        </Grid>

        {/* Right Section - Content */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            p: 4,
            textAlign: 'center',
            position: 'relative',
            zIndex: 7,
          }}
        >
          {/* Centered Logo */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: '150px',
              mb: 3,
              borderRadius: '50%',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              mx: 'auto',
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              color: '#333',
              mb: 2,
            }}
          >
            All Pro Restaurant Coaches
          </Typography>
            
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'Poppins',
              fontSize: { xs: '17px', md: '18px' },
              fontWeight: '700',
              color: '#777',
              mb: 2,
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            Integrity • Compassion • Perfection
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'Poppins',
              fontSize: { xs: '17px', md: '18px' },
              fontWeight: '500',
              color: '#777',
              mb: 4,
              maxWidth: '500px',
              mx: 'auto',
              letterSpacing: '0.5px',
              lineHeight: 1.6,
            }}
          >
            Join the ultimate job board designed exclusively for the restaurant industry.
            Discover top talent or land your dream restaurant job here!
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #00adb5, #007a7f)',
                color: '#fff',
                borderRadius: '30px',
                textTransform: 'none',
                px: 5,
                py: 1.8,
                fontFamily: 'Poppins',
                fontSize: '16px',
                mr: 2,
                '&:hover': {
                  background: 'linear-gradient(45deg, #008b99, #006669)',
                },
              }}
              onClick={() => navigate('/restaurant-login')}
            >
              Restaurant Login
            </Button>

            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #f08a5d, #b83b5e)',
                color: '#fff',
                borderRadius: '30px',
                textTransform: 'none',
                px: 5,
                py: 1.8,
                fontFamily: 'Poppins',
                fontSize: '16px',
                mt: { xs: 2, md: 0 },
                '&:hover': {
                  background: 'linear-gradient(45deg, #e6674c, #a3294d)',
                },
              }}
              onClick={() => navigate('/user-login')}
            >
              User Login
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Decorative Element at Bottom Center (Moved Further Down) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #90caf9, #64b5f6)',
          opacity: 0.5,
          animation: 'pulse 6s infinite',
          zIndex: 8,
        }}
      />

      {/* Keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          @keyframes rotate {
            0% { transform: rotate(45deg); }
            100% { transform: rotate(405deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default HomePage;
