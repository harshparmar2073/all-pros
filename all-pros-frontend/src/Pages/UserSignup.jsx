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
  Stack,
  Divider,
  FormControlLabel,
  Link,
  Checkbox,
  FormGroup,
  Chip,
  Collapse,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  School,
  Work,
  Event,
  CalendarMonth,
  Grade,
  Add,
  Delete,
  Upload,
  Lock,
  ContactPage,
  WorkHistory,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../components/CustomSnackbar';
import logo from '../assets/logo.png';
import UserSignupImage from '../assets/signup.png'

const UserSignup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [experiences, setExperiences] = React.useState([{ restaurantName: '', jobProfile: '', years: '' }]);
  const [education, setEducation] = React.useState([
    { collegeName: '', degreeName: '', grades: '', startYear: '', endYear: '' },
  ]);
  const [schoolEducation, setSchoolEducation] = React.useState([
    { schoolName: '', startYear: '', endYear: '' },
  ]);
  const [resumeFile, setResumeFile] = React.useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      contactNumber: '',
      emailAddress: '',
      age: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      contactNumber: Yup.string().required('Contact Number is required'),
      emailAddress: Yup.string().email('Invalid email').required('Email Address is required'),
      age: Yup.number().positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: (values) => {
      const formData = {
        ...values,
        experiences,
        education,
        schoolEducation,
        resumeFile: resumeFile ? resumeFile.name : null,
      };
      console.log('Signup successful:', formData);
      setSnackbarMessage('Signup successful! Redirecting...');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 2000);
    },
  });

  const handleAddExperience = () => {
    setExperiences([...experiences, { restaurantName: '', jobProfile: '', years: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleAddEducation = () => {
    setEducation([...education, { collegeName: '', degreeName: '', grades: '', startYear: '', endYear: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleAddSchool = () => {
    setSchoolEducation([...schoolEducation, { schoolName: '', startYear: '', endYear: '' }]);
  };

  const handleRemoveSchool = (index) => {
    const newSchoolEducation = [...schoolEducation];
    newSchoolEducation.splice(index, 1);
    setSchoolEducation(newSchoolEducation);
  };

  const handleSchoolChange = (index, field, value) => {
    const newSchoolEducation = [...schoolEducation];
    newSchoolEducation[index][field] = value;
    setSchoolEducation(newSchoolEducation);
  };

  const handleResumeChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const years = Array.from({ length: 30 }, (_, index) => new Date().getFullYear() - index);

  return (
    <Paper
      elevation={10}
      sx={{
        maxWidth: '1000px',
        mx: 'auto',
        my: 4,
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid rgba(75, 0, 130, 0.2)',
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
            background: 'linear-gradient(135deg, #4B0082 0%, #8A2BE2 50%, #9370DB 100%)',
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
          <Box
            sx={{
              position: 'absolute',
              top: '-40%',
              left: '40%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
              animation: 'spotlight 15s infinite alternate'
            }}
          />

          {['👨‍🍳', '🍽️', '👨‍🎓', '📚', '🎓', '📝', '💼', '🏆', '📄', '🌟', '📊', '🔍'].map((emoji, i) => (
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
                zIndex: 1
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
                backgroundColor: 'rgba(147, 112, 219, 0.1)',
                borderRadius: '50%',
                border: '1px solid rgba(147, 112, 219, 0.3)',
                animation: `pulsate ${5 + i * 2}s ease-in-out infinite`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                zIndex: 0
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
                background: 'linear-gradient(45deg, #6A5ACD, #8A2BE2)',
                opacity: 0.7,
                animation: 'pulse 5s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 0.7,
                  },
                  '50%': {
                    transform: 'scale(1.1)',
                    opacity: 1,
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: 0.7,
                  },
                },
              }}
            />
            <Box sx={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: '60px',
              height: '60px',
              borderRadius: '15px',
              transform: 'rotate(45deg)',
              background: '#9370DB',
              opacity: 0.5,
              animation: 'rotate 8s infinite linear'
            }} />
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
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                border: '10px solid rgba(147, 112, 219, 0.3)',
                top: '-10px',
                left: '-10px',
                animation: 'rotate 25s linear infinite'
              }}
            />
            
            <Box
              sx={{
                width: '80%',
                height: '80%',
                backgroundImage: `url(${UserSignupImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))',
                transform: 'scale(1.15)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            />
            
            <Box
              sx={{
                position: 'absolute',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                border: '2px solid rgba(147, 112, 219, 0.15)',
                top: '-25px',
                left: '-25px',
                animation: 'rotate 30s linear infinite'
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
                    color: 'rgba(147, 112, 219, 0.6)',
                    animation: `twinkle ${3 + i}s ease-in-out infinite`
                  }}
                >
                  <School sx={{ fontSize: 24 }} />
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
              zIndex: 5
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
                mb: 2
              }}
            >
              Culinary Connect
            </Typography>
            
            <Divider sx={{ borderColor: 'rgba(147, 112, 219, 0.4)', width: '60%', mx: 'auto', mb: 2 }} />
            
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                maxWidth: '95%',
                lineHeight: 1.6,
                fontWeight: 'bold',
                fontStyle: 'italic',
                textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                mb: 2
              }}
            >
              "Join Our Culinary Team and Showcase Your Talent"
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '150px',
              background:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\' preserveAspectRatio=\'none\'%3E%3Cpath d=\'M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z\' fill=\'rgba(147, 112, 219, 0.15)\'/%3E%3C/svg%3E")',
              backgroundSize: 'cover',
              zIndex: 0,
              animation: 'wave 20s infinite linear'
            }}
          />

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
            background: 'linear-gradient(to bottom, #ffffff, #E6E6FA)',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 24px 24px 0',
          }}
        >
          <Box sx={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 4
              }}
            >
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg,rgba(28, 0, 130, 0.99) 30%,rgb(43, 95, 226) 90%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 10px 25px rgba(75, 0, 130, 0.5)',
                  mb: 2,
                  border: '2px solid rgb(147, 112, 219, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    backgroundImage: 'radial-gradient(circle, rgba(147, 112, 219, 0.3) 10%, transparent 60%)',
                    animation: 'rotate 8s linear infinite',
                    opacity: 0.5
                  }}
                />
                
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 2px 4px rgba(75, 0, 130, 0.2))',
                  }}  />
              </Box>
              
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                  color: '#4B0082', 
                  mb: 0.5,
                  letterSpacing: '2px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
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
                  background: 'rgba(147, 112, 219, 0.1)',
                  border: '1px solid rgba(147, 112, 219, 0.3)',
                  display: 'inline-block'
                }}
              >
                Join Our Talented Community
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                sx={{ 
                  color: '#4B0082', 
                  mb: 1,
                  position: 'relative',
                  display: 'inline-block'
                }}
              >
                User Signup
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: '-3px',
                    left: '10%',
                    width: '80%',
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent, #9370DB, transparent)',
                    borderRadius: '2px'
                  }} 
                />
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Please fill in your details to create your profile
              </Typography>
            </Box>

            <Box sx={{ maxHeight: '800px', overflow: 'auto', pr: 2, mb: 4, pt: 2 }}>
  <form onSubmit={formik.handleSubmit}>
    <Stack spacing={2.25}>
      {/* Increased top margin and added a container box with better visibility */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: '#4B0082' }} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
              },
            },
          }}
        />

        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: '#4B0082' }} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
              },
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Contact Number"
          name="contactNumber"
          fullWidth
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
          helperText={formik.touched.contactNumber && formik.errors.contactNumber}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone sx={{ color: '#4B0082' }} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
              },
            },
          }}
        />

        <TextField
          label="Age"
          name="age"
          type="number"
          fullWidth
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Event sx={{ color: '#4B0082' }} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
              },
            },
          }}
        />
      </Box>

      <TextField
        label="Email Address"
        name="emailAddress"
        fullWidth
        value={formik.values.emailAddress}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
        helperText={formik.touched.emailAddress && formik.errors.emailAddress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: '#4B0082' }} />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'rgba(75, 0, 130, 0.5)',
            },
          },
        }}
      />

      {/* Adding Previously Worked Field */}
      <FormControl fullWidth>
        <InputLabel id="previously-worked-label">Previously Worked</InputLabel>
        <Select
          labelId="previously-worked-label"
          id="previouslyWorked"
          name="previouslyWorked"
          value={formik.values.previouslyWorked || ''}
          onChange={formik.handleChange}
          label="Previously Worked"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Work sx={{ color: '#4B0082' }} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
              },
            },
          }}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2 }}>
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
                <Lock sx={{ color: '#4B0082' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
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
                <Lock sx={{ color: '#4B0082' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgba(75, 0, 130, 0.5)',
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="#4B0082" fontWeight="bold">
            <WorkHistory sx={{ mr: 1, fontSize: 20, verticalAlign: 'middle' }} />
            Experience
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddExperience}
            sx={{
              color: '#4B0082',
              borderColor: '#4B0082',
              '&:hover': { borderColor: '#9370DB', backgroundColor: 'rgba(147, 112, 219, 0.1)' }
            }}
          >
            Add More
          </Button>
        </Box>
        
        {experiences.map((exp, index) => (
          <Box 
            key={index} 
            sx={{ 
              mb: 3, 
              p: 2, 
              border: '1px solid rgba(147, 112, 219, 0.3)', 
              borderRadius: 2, 
              position: 'relative',
              backgroundColor: 'rgba(147, 112, 219, 0.05)'
            }}
          >
            {experiences.length > 1 && (
              <IconButton
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8,
                  color: '#4B0082'
                }}
                onClick={() => handleRemoveExperience(index)}
              >
                <Delete />
              </IconButton>
            )}
            
            <Chip 
             label={`Experience ${index + 1}`} 
             sx={{ 
               mb: 2, 
               backgroundColor: 'rgba(147, 112, 219, 0.2)', 
               color: '#4B0082',
               '& .MuiChip-label': {
                 fontWeight: 'bold'
               }
             }}
           />
           
           <Grid container spacing={2}>
             <Grid item xs={12} sm={6}>
               <TextField
                 label="Restaurant Name"
                 fullWidth
                 value={exp.restaurantName}
                 onChange={(e) => handleExperienceChange(index, 'restaurantName', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <Work sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <TextField
                 label="Job Profile"
                 fullWidth
                 value={exp.jobProfile}
                 onChange={(e) => handleExperienceChange(index, 'jobProfile', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <ContactPage sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <TextField
                 label="Years of Experience"
                 fullWidth
                 value={exp.years}
                 onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <CalendarMonth sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                 <InputLabel>Previously Worked Here</InputLabel>
                 <Select
                   value={exp.previouslyWorkedHere || 'no'}
                   onChange={(e) => handleExperienceChange(index, 'previouslyWorkedHere', e.target.value)}
                   label="Previously Worked Here"
                 >
                   <MenuItem value="yes">Yes</MenuItem>
                   <MenuItem value="no">No</MenuItem>
                 </Select>
               </FormControl>
             </Grid>
           </Grid>
         </Box>
       ))}
     </Box>

     {/* Rest of the form remains the same */}
     {/* College Education Section */}
     <Box sx={{ mt: 2 }}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
         <Typography variant="h6" color="#4B0082" fontWeight="bold">
           <School sx={{ mr: 1, fontSize: 20, verticalAlign: 'middle' }} />
           College Education
         </Typography>
         <Button
           variant="outlined"
           startIcon={<Add />}
           onClick={handleAddEducation}
           sx={{
             color: '#4B0082',
             borderColor: '#4B0082',
             '&:hover': { borderColor: '#9370DB', backgroundColor: 'rgba(147, 112, 219, 0.1)' }
           }}
         >
           Add More
         </Button>
       </Box>
       
       {education.map((edu, index) => (
         <Box 
           key={index} 
           sx={{ 
             mb: 3, 
             p: 2, 
             border: '1px solid rgba(147, 112, 219, 0.3)', 
             borderRadius: 2, 
             position: 'relative',
             backgroundColor: 'rgba(147, 112, 219, 0.05)'
           }}
         >
           {education.length > 1 && (
             <IconButton
               size="small"
               sx={{ 
                 position: 'absolute', 
                 top: 8, 
                 right: 8,
                 color: '#4B0082'
               }}
               onClick={() => handleRemoveEducation(index)}
             >
               <Delete />
             </IconButton>
           )}
           
           <Chip 
             label={`Education ${index + 1}`} 
             sx={{ 
               mb: 2, 
               backgroundColor: 'rgba(147, 112, 219, 0.2)', 
               color: '#4B0082',
               '& .MuiChip-label': {
                 fontWeight: 'bold'
               }
             }}
           />
           
           <Grid container spacing={2}>
             <Grid item xs={12}>
               <TextField
                 label="College Name"
                 fullWidth
                 value={edu.collegeName}
                 onChange={(e) => handleEducationChange(index, 'collegeName', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <School sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12}>
               <TextField
                 label="Degree Name"
                 fullWidth
                 value={edu.degreeName}
                 onChange={(e) => handleEducationChange(index, 'degreeName', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <Grade sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12}>
               <TextField
                 label="Grades"
                 fullWidth
                 value={edu.grades}
                 onChange={(e) => handleEducationChange(index, 'grades', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <Grade sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                 <InputLabel>Start Year</InputLabel>
                 <Select
                   value={edu.startYear}
                   onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                   label="Start Year"
                 >
                   {years.map((year) => (
                     <MenuItem key={year} value={year}>
                       {year}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </Grid>
             <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                 <InputLabel>End Year</InputLabel>
                 <Select
                   value={edu.endYear}
                   onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                   label="End Year"
                 >
                   {years.map((year) => (
                     <MenuItem key={year} value={year}>
                       {year}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </Grid>
           </Grid>
         </Box>
       ))}
     </Box>

     {/* School Education Section */}
     <Box sx={{ mt: 2 }}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
         <Typography variant="h6" color="#4B0082" fontWeight="bold">
           <School sx={{ mr: 1, fontSize: 20, verticalAlign: 'middle' }} />
           School Education
         </Typography>
         <Button
           variant="outlined"
           startIcon={<Add />}
           onClick={handleAddSchool}
           sx={{
             color: '#4B0082',
             borderColor: '#4B0082',
             '&:hover': { borderColor: '#9370DB', backgroundColor: 'rgba(147, 112, 219, 0.1)' }
           }}
         >
           Add More
         </Button>
       </Box>
       
       {schoolEducation.map((school, index) => (
         <Box 
           key={index} 
           sx={{ 
             mb: 3, 
             p: 2, 
             border: '1px solid rgba(147, 112, 219, 0.3)', 
             borderRadius: 2, 
             position: 'relative',
             backgroundColor: 'rgba(147, 112, 219, 0.05)'
           }}
         >
           {schoolEducation.length > 1 && (
             <IconButton
               size="small"
               sx={{ 
                 position: 'absolute', 
                 top: 8, 
                 right: 8,
                 color: '#4B0082'
               }}
               onClick={() => handleRemoveSchool(index)}
             >
               <Delete />
             </IconButton>
           )}
           
           <Chip 
             label={`School ${index + 1}`} 
             sx={{ 
               mb: 2, 
               backgroundColor: 'rgba(147, 112, 219, 0.2)', 
               color: '#4B0082',
               '& .MuiChip-label': {
                 fontWeight: 'bold'
               }
             }}
           />
           
           <Grid container spacing={2}>
             <Grid item xs={12}>
               <TextField
                 label="School Name"
                 fullWidth
                 value={school.schoolName}
                 onChange={(e) => handleSchoolChange(index, 'schoolName', e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <School sx={{ color: '#4B0082' }} />
                     </InputAdornment>
                   )
                 }}
                 sx={{
                   '& .MuiOutlinedInput-root': {
                     '&:hover fieldset': {
                       borderColor: 'rgba(75, 0, 130, 0.5)',
                     },
                   },
                 }}
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                 <InputLabel>Start Year</InputLabel>
                 <Select
                   value={school.startYear}
                   onChange={(e) => handleSchoolChange(index, 'startYear', e.target.value)}
                   label="Start Year"
                 >
                   {years.map((year) => (
                     <MenuItem key={year} value={year}>
                       {year}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </Grid>
             <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                 <InputLabel>End Year</InputLabel>
                 <Select
                   value={school.endYear}
                   onChange={(e) => handleSchoolChange(index, 'endYear', e.target.value)}
                   label="End Year"
                 >
                   {years.map((year) => (
                     <MenuItem key={year} value={year}>
                       {year}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
             </Grid>
           </Grid>
         </Box>
       ))}
     </Box>

     {/* Resume Upload Section */}
     <Box sx={{ mt: 2 }}>
       <Typography variant="h6" color="#4B0082" fontWeight="bold" sx={{ mb: 2 }}>
         <Upload sx={{ mr: 1, fontSize: 20, verticalAlign: 'middle' }} />
         Upload Resume
       </Typography>

       <Box 
         sx={{ 
           p: 3, 
           border: '2px dashed rgba(147, 112, 219, 0.4)', 
           borderRadius: 2,
           backgroundColor: 'rgba(147, 112, 219, 0.05)',
           textAlign: 'center',
           cursor: 'pointer',
           transition: 'all 0.3s',
           '&:hover': {
             backgroundColor: 'rgba(147, 112, 219, 0.1)',
             borderColor: 'rgba(147, 112, 219, 0.6)'
           }
         }}
       >
         <input
           type="file"
           id="resume-upload"
           accept=".pdf,.doc,.docx"
           onChange={handleResumeChange}
           style={{ display: 'none' }}
         />
         <label htmlFor="resume-upload">
           <Box sx={{ mb: 2 }}>
             <Upload sx={{ fontSize: 40, color: '#4B0082', mb: 1 }} />
             <Typography variant="h6" color="#4B0082">
               Upload Resume
             </Typography>
             <Typography variant="body2" color="text.secondary">
               Drag and drop or click to upload
             </Typography>
             <Typography variant="caption" color="text.secondary">
               (PDF, DOC, DOCX files only)
             </Typography>
           </Box>
         </label>
         {resumeFile && (
           <Box sx={{ mt: 2 }}>
             <Chip
               label={resumeFile.name}
               onDelete={() => setResumeFile(null)}
               sx={{
                 backgroundColor: 'rgba(147, 112, 219, 0.2)',
                 color: '#4B0082',
                 '& .MuiChip-deleteIcon': {
                   color: '#4B0082',
                 },
               }}
             />
           </Box>
         )}
       </Box>
     </Box>

     {/* Terms and Conditions */}
     <Box sx={{ mt: 2 }}>
       <FormGroup>
         <FormControlLabel
           control={
             <Checkbox
               checked={termsAccepted}
               onChange={(e) => setTermsAccepted(e.target.checked)}
               sx={{
                 color: '#4B0082',
                 '&.Mui-checked': {
                   color: '#4B0082',
                 },
               }}
             />
           }
           label={
             <Typography variant="body2">
               I agree to the{' '}
               <Link href="#" sx={{ color: '#4B0082', fontWeight: 'bold' }}>
                 Terms and Conditions
               </Link>{' '}
               and{' '}
               <Link href="#" sx={{ color: '#4B0082', fontWeight: 'bold' }}>
                 Privacy Policy
               </Link>
             </Typography>
           }
         />
       </FormGroup>
     </Box>

     {/* Submit Button */}
     <Button
       type="submit"
       variant="contained"
       disabled={!termsAccepted}
       sx={{
         mt: 3,
         py: 1.5,
         backgroundColor: '#4B0082',
         '&:hover': {
           backgroundColor: '#6A0DAD',
         },
         '&:disabled': {
           backgroundColor: '#E6E6FA',
           color: '#9370DB',
         },
         boxShadow: '0 8px 16px rgba(75, 0, 130, 0.2)',
         borderRadius: '10px',
         position: 'relative',
         overflow: 'hidden',
       }}
     >
       <Box
         sx={{
           position: 'absolute',
           top: 0,
           left: 0,
           width: '100%',
           height: '100%',
           background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
           transform: 'translateX(-100%)',
           animation: 'shimmer 2s infinite',
           '@keyframes shimmer': {
             '100%': {
               transform: 'translateX(100%)',
             },
           },
         }}
       />
       Create Account
     </Button>

     <Box sx={{ mt: 2, textAlign: 'center' }}>
       <Typography variant="body2" color="text.secondary">
         Already have an account?{' '}
         <Link href="/user-login" sx={{ color: '#4B0082', fontWeight: 'bold' }}>
           Sign In
         </Link>
       </Typography>
     </Box>
    </Stack>
  </form>
</Box>
         </Box>
       </Grid>
     </Grid>
     <CustomSnackbar
       open={snackbarOpen}
       onClose={() => setSnackbarOpen(false)}
       message={snackbarMessage}
       severity="success"
     />
   </Paper>
 );
};

export default UserSignup;