import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Grid, 
  Button, 
  Chip, 
  Divider, 
  Container, 
  Paper, 
  TextField, 
  IconButton, 
  Tab, 
  Tabs, 
  Rating,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
  alpha
} from '@mui/material';
import { 
  Edit as EditIcon, 
  LocationOn as LocationIcon, 
  Email as EmailIcon, 
  Phone as PhoneIcon, 
  Restaurant as RestaurantIcon, 
  Schedule as ScheduleIcon, 
  LocalOffer as LocalOfferIcon,
  Business as BusinessIcon,
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  PhotoCamera as CameraIcon,
  MenuBook as MenuIcon,
  SaveAlt as SaveIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Creating a custom theme with redish-brown color scheme
const theme = createTheme({
  typography: {
    fontFamily: '"Playfair Display", "Poppins", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#8B4513', // Saddle Brown
      light: '#A0522D', // Sienna
      dark: '#5D2906', // Dark Brown
      contrastText: '#FFF',
    },
    secondary: {
      main: '#D2691E', // Chocolate
      light: '#E9967A', // Dark Salmon
      dark: '#8B4513', // Saddle Brown
      contrastText: '#FFF',
    },
    background: {
      default: '#FFF8F0', // Creamy off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2723', // Very Dark Brown
      secondary: '#5D4037', // Dark Brown
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #8B4513 30%, #A0522D 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: 16,
          minWidth: 100,
          '&.Mui-selected': {
            fontWeight: 600,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.MuiChip-outlinedPrimary': {
            borderColor: '#8B4513',
          },
        },
      },
    },
  },
});

// Custom styled components
const HeroSection = styled(Box)(({ theme }) => ({
  height: 280,
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 160,
  height: 160,
  border: '5px solid white',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.primary.light,
  },
}));

const RestaurantProfile = () => {
  const [value, setValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/400/400');
  const [coverImage, setCoverImage] = useState('/api/placeholder/1200/500');
  
  // Sample restaurant data - in a real app this would come from an API
  const [restaurantData, setRestaurantData] = useState({
    name: "Bella Italia Restaurant",
    address: "123 Culinary Avenue",
    location: "New York, NY 10001",
    email: "info@bellaitalia.com",
    phone: "(212) 555-7890",
    type: "Italian Fine Dining",
    contactPerson: "Marco Rossi",
    yearsOpen: 12,
    cuisine: "Italian",
    specialties: ["Wood-fired Pizza", "Handmade Pasta", "Tiramisu", "Sicilian Seafood"],
    operatingHours: "Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM",
    priceRange: "$$$",
    rating: 4.7,
    description: "Bella Italia offers an authentic Italian dining experience with recipes passed down through generations. Our chefs use only the finest imported ingredients to create memorable dishes in a warm, inviting atmosphere. Located in the heart of the city, we've been serving our community for over a decade with passion and dedication to the culinary arts.",
    photos: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ],
    menuCategories: [
      {
        name: "Antipasti",
        items: [
          {name: "Bruschetta", price: 9.95, description: "Grilled bread topped with tomatoes, garlic, and basil"},
          {name: "Caprese Salad", price: 12.95, description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic reduction"}
        ]
      },
      {
        name: "Pasta",
        items: [
          {name: "Spaghetti Carbonara", price: 18.95, description: "Classic carbonara with pancetta, egg, and parmesan"},
          {name: "Fettuccine Alfredo", price: 17.95, description: "Creamy parmesan sauce with freshly made fettuccine"}
        ]
      }
    ],
    jobs: [
      {title: "Head Chef", type: "Full-time", salary: "$65,000-$80,000/year", openings: 1, urgent: true},
      {title: "Waitstaff", type: "Part-time", salary: "$18-22/hour + tips", openings: 3, urgent: false},
      {title: "Bartender", type: "Full-time", salary: "$25-30/hour + tips", openings: 1, urgent: false}
    ]
  });

  // This effect simulates data fetching from an API for a specific restaurant
  useEffect(() => {
   
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditProfile = () => {
    if (isEditing) {
     
    }
    setIsEditing(!isEditing);
  };

  const handleProfileImageChange = () => {
    // In a real app, this would open a file picker
    alert("In a real application, this would open a file picker to change your profile image");
  };

  const handleCoverImageChange = () => {
    // Similar to profile image change, but for cover
    alert("In a real application, this would open a file picker to change your cover image");
  };

  const renderEditableField = (label, value, field, multiline = false) => {
    return isEditing ? (
      <TextField
        fullWidth
        label={label}
        value={value}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        variant="outlined"
        margin="normal"
        onChange={(e) => {
          const updatedData = { ...restaurantData };
          updatedData[field] = e.target.value;
          setRestaurantData(updatedData);
        }}
        InputProps={{
          sx: {
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.2),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.primary.main, 0.5),
            },
          }
        }}
      />
    ) : (
      <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
        {value}
      </Typography>
    );
  };

  const renderSpecialtyChips = () => {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {restaurantData.specialties.map((specialty, index) => (
          <Chip
            key={index}
            label={specialty}
            color="primary"
            variant="outlined"
            sx={{ 
              fontWeight: 500,
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
              }
            }}
            onDelete={isEditing ? () => {
              const updatedSpecialties = [...restaurantData.specialties];
              updatedSpecialties.splice(index, 1);
              setRestaurantData({...restaurantData, specialties: updatedSpecialties});
            } : undefined}
          />
        ))}
        {isEditing && (
          <Button 
            size="small" 
            variant="outlined"
            onClick={() => {
              const newSpecialty = prompt("Enter new specialty:");
              if (newSpecialty) {
                setRestaurantData({
                  ...restaurantData, 
                  specialties: [...restaurantData.specialties, newSpecialty]
                });
              }
            }}
            sx={{ height: 32 }}
          >
            + Add
          </Button>
        )}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'background.paper',
          }}
        >
          {/* Cover Photo */}
          <HeroSection 
            sx={{ 
              backgroundImage: `url(${coverImage})`,              
            }} 
          >
            {isEditing && (
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: alpha('#fff', 0.9),
                  }
                }}
                onClick={handleCoverImageChange}
              >
                <CameraIcon />
              </IconButton>
            )}
          </HeroSection>
          
          {/* Profile Overview Section */}
          <Box sx={{ p: { xs: 2, md: 4 }, pb: { xs: 3, md: 5 }, position: 'relative' }}>
            <Grid container spacing={3}>
              <Grid item>
                <Box sx={{ position: 'relative', mt: -12 }}>
                  <ProfileAvatar
                    src={profileImage}
                    alt={restaurantData.name}
                  />
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        color: 'primary.main',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        '&:hover': {
                          bgcolor: alpha('#fff', 0.9),
                        }
                      }}
                      onClick={handleProfileImageChange}
                    >
                      <CameraIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={1} sx={{ pl: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}>
                  <Grid item>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        variant="standard"
                        value={restaurantData.name}
                        onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})}
                        sx={{ 
                          mb: 1, 
                          '& input': { 
                            fontSize: { xs: '1.5rem', sm: '2rem' }, 
                            fontWeight: 'bold',
                            fontFamily: '"Playfair Display", serif',
                          } 
                        }}
                      />
                    ) : (
                      <Typography 
                        variant="h4" 
                        component="h1" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: { xs: '1.75rem', sm: '2.5rem' },
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        {restaurantData.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <LocationIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      {isEditing ? (
                        <TextField
                          variant="standard"
                          value={`${restaurantData.address}, ${restaurantData.location}`}
                          onChange={(e) => {
                            const parts = e.target.value.split(', ');
                            if (parts.length >= 2) {
                              setRestaurantData({
                                ...restaurantData,
                                address: parts[0],
                                location: parts.slice(1).join(', ')
                              });
                            }
                          }}
                          sx={{ minWidth: 300 }}
                        />
                      ) : (
                        <Typography sx={{ color: 'text.secondary' }}>
                          {restaurantData.address}, {restaurantData.location}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <RestaurantIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      {isEditing ? (
                        <TextField
                          variant="standard"
                          value={restaurantData.type}
                          onChange={(e) => setRestaurantData({...restaurantData, type: e.target.value})}
                        />
                      ) : (
                        <Typography sx={{ color: 'text.secondary' }}>{restaurantData.type}</Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StyledRating 
                        value={restaurantData.rating} 
                        precision={0.1} 
                        readOnly={!isEditing}
                        onChange={(e, newValue) => isEditing && setRestaurantData({...restaurantData, rating: newValue})}
                      />
                      <Typography variant="body2" sx={{ ml: 1, fontWeight: 500, color: 'primary.main' }}>
                        ({restaurantData.rating})
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button 
                    variant={isEditing ? "contained" : "outlined"}
                    color={isEditing ? "secondary" : "primary"}
                    startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                    onClick={handleEditProfile}
                    sx={{ 
                      mt: 2, 
                      fontWeight: 600,
                      borderWidth: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          
          <Divider sx={{ 
            height: 3, 
            bgcolor: alpha(theme.palette.primary.main, 0.1) 
          }} />
          
          {/* Tabs for different sections */}
          <Box sx={{ width: '100%' }}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                  height: 3,
                },
                '& .MuiTab-root': {
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Tab label="Overview" icon={<RestaurantIcon />} iconPosition="start" />
              <Tab label="Menu" icon={<MenuIcon />} iconPosition="start" />
              <Tab label="Contact" icon={<EmailIcon />} iconPosition="start" />
              <Tab label="Gallery" icon={<CameraIcon />} iconPosition="start" />
            </Tabs>
            
            {/* Tab Content */}
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {value === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 3, overflow: 'visible' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom
                          sx={{ 
                            position: 'relative',
                            pb: 1,
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              bottom: 0,
                              width: 40,
                              height: 3,
                              backgroundColor: 'primary.main',
                              borderRadius: 4,
                            }
                          }}
                        >
                          About Our Restaurant
                        </Typography>
                        {renderEditableField("Restaurant Description", restaurantData.description, "description", true)}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent sx={{ p: 3 }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom
                          sx={{ 
                            position: 'relative',
                            pb: 1,
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              bottom: 0,
                              width: 40,
                              height: 3,
                              backgroundColor: 'primary.main',
                              borderRadius: 4,
                            }
                          }}
                        >
                          Our Specialties
                        </Typography>
                        {renderSpecialtyChips()}
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3, overflow: 'visible' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom
                          sx={{ 
                            position: 'relative',
                            pb: 1,
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              left: 0,
                              bottom: 0,
                              width: 40,
                              height: 3,
                              backgroundColor: 'primary.main',
                              borderRadius: 4,
                            }
                          }}
                        >
                          Restaurant Details
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <PersonIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="text.primary">
                              Contact Person
                            </Typography>
                            {renderEditableField("Contact Person", restaurantData.contactPerson, "contactPerson")}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <PhoneIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="text.primary">
                              Phone
                            </Typography>
                            {renderEditableField("Phone", restaurantData.phone, "phone")}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <EmailIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="text.primary">
                              Email
                            </Typography>
                            {renderEditableField("Email", restaurantData.email, "email")}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <CalendarIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="text.primary">
                              Years Established
                            </Typography>
                            {renderEditableField("Years Open", restaurantData.yearsOpen, "yearsOpen")}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <LocalOfferIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="text.primary">
                              Price Range
                            </Typography>
                            {renderEditableField("Price Range", restaurantData.priceRange, "priceRange")}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <ScheduleIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold" color="text.primary">
                              Hours
                            </Typography>
                            {renderEditableField("Operating Hours", restaurantData.operatingHours, "operatingHours")}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                </Grid>
              </Grid>
            )}
            
            {/* Menu Tab */}
            {value === 1 && (
              <Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    position: 'relative',
                    pb: 1,
                    mb: 3,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: 60,
                      height: 3,
                      backgroundColor: 'primary.main',
                      borderRadius: 4,
                    }
                  }}
                >
                  Our Menu
                </Typography>
                
                {restaurantData.menuCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex} sx={{ mb: 3, overflow: 'visible' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontFamily: '"Playfair Display", serif',
                            fontWeight: 600,
                            color: 'primary.main'
                          }}
                        >
                          {isEditing ? (
                            <TextField 
                              variant="standard" 
                              value={category.name}
                              onChange={(e) => {
                                const updatedCategories = [...restaurantData.menuCategories];
                                updatedCategories[categoryIndex].name = e.target.value;
                                setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                              }}
                              sx={{ minWidth: 150 }}
                            />
                          ) : (
                            category.name
                          )}
                        </Typography>
                        
                        {isEditing && (
                          <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => {
                              const updatedCategories = [...restaurantData.menuCategories];
                              updatedCategories.splice(categoryIndex, 1);
                              setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      
                      <Grid container spacing={2}>
                        {category.items.map((item, itemIndex) => (
                          <Grid item xs={12} sm={6} md={4} key={itemIndex}>
                            <Paper 
                              variant="outlined" 
                              sx={{ 
                                p: 2, 
                                height: '100%',
                                borderRadius: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                  borderColor: 'primary.light',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {isEditing ? (
                                    <TextField 
                                      variant="standard" 
                                      value={item.name}
                                      onChange={(e) => {
                                        const updatedCategories = [...restaurantData.menuCategories];
                                        updatedCategories[categoryIndex].items[itemIndex].name = e.target.value;
                                        setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                                      }}
                                    />
                                  ) : (
                                    item.name
                                  )}
                                </Typography>
                                <Typography 
                                  variant="subtitle1" 
                                  fontWeight={600} 
                                  color="primary.main"
                                >
                                  {isEditing ? (
                                    <TextField 
                                      variant="standard" 
                                      value={item.price}
                                      onChange={(e) => {
                                        const updatedCategories = [...restaurantData.menuCategories];
                                        updatedCategories[categoryIndex].items[itemIndex].price = parseFloat(e.target.value);
                                        setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                                      }}
                                      type="number"
                                      sx={{ width: 80 }}
                                      InputProps={{
                                        startAdornment: '$',
                                      }}
                                    />
                                  ) : (
                                    `$${item.price.toFixed(2)}`
                                  )}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {isEditing ? (
                                  <TextField 
                                    fullWidth
                                    variant="standard" 
                                    value={item.description}
                                    onChange={(e) => {
                                      const updatedCategories = [...restaurantData.menuCategories];
                                      updatedCategories[categoryIndex].items[itemIndex].description = e.target.value;
                                      setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                                    }}
                                    multiline
                                  />
                                ) : (
                                  item.description
                                )}
                              </Typography>
                              
                              {isEditing && (
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                  <Button 
                                    size="small" 
                                    color="secondary"
                                    onClick={() => {
                                      const updatedCategories = [...restaurantData.menuCategories];
                                      updatedCategories[categoryIndex].items.splice(itemIndex, 1);
                                      setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Box>
                              )}
                            </Paper>
                          </Grid>
                        ))}
                        
                        {isEditing && (
                          <Grid item xs={12} sm={6} md={4}>
                            <Paper 
                              variant="outlined" 
                              sx={{ 
                                p: 2, 
                                height: '100%',
                                borderRadius: 2,
                                borderStyle: 'dashed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                },
                              }}
                              onClick={() => {
                                const updatedCategories = [...restaurantData.menuCategories];
                                updatedCategories[categoryIndex].items.push({
                                  name: "New Item",
                                  price: 0,
                                  description: "Description of the dish"
                                });
                                setRestaurantData({...restaurantData, menuCategories: updatedCategories});
                              }}
                            >
                              <Typography color="primary">+ Add New Item</Typography>
                            </Paper>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
                
                {isEditing && (
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ 
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      py: 2,
                      mb: 3,
                      borderRadius: 2
                    }}
                    onClick={() => {
                      setRestaurantData({
                        ...restaurantData,
                        menuCategories: [
                          ...restaurantData.menuCategories,
                          {
                            name: "New Category",
                            items: [
                              {
                                name: "New Item",
                                price: 0,
                                description: "Description of the dish"
                              }
                            ]
                          }
                        ]
                      });
                    }}
                  >
                    + Add New Category
                  </Button>
                )}
              </Box>
            )}
            
            {/* Contact Tab */}
            {value === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ mb: { xs: 3, md: 0 }, height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          position: 'relative',
                          pb: 1,
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: 40,
                            height: 3,
                            backgroundColor: 'primary.main',
                            borderRadius: 4,
                          }
                        }}
                      >
                        Contact Information
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, mt: 2 }}>
                        <BusinessIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Address
                          </Typography>
                          <Typography variant="body1">
                            {restaurantData.address}
                          </Typography>
                          <Typography variant="body1">
                            {restaurantData.location}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                        <PhoneIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Phone
                          </Typography>
                          <Typography variant="body1">
                            {restaurantData.phone}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                        <EmailIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Email
                          </Typography>
                          <Typography variant="body1">
                            {restaurantData.email}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <ScheduleIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Operating Hours
                          </Typography>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {restaurantData.operatingHours}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ 
                          position: 'relative',
                          pb: 1,
                          mb: 3,
                          '&:after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: 40,
                            height: 3,
                            backgroundColor: 'primary.main',
                            borderRadius: 4,
                          }
                        }}
                      >
                        Send Us a Message
                      </Typography>
                      
                      <TextField
                        fullWidth
                        label="Your Name"
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                      
                      <TextField
                        fullWidth
                        label="Your Email"
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                      
                      <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        margin="normal"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                      
                      <TextField
                        fullWidth
                        label="Your Message"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                      
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        sx={{ 
                          mt: 2, 
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(139, 69, 19, 0.25)',
                          }
                        }}
                      >
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
            
            {/* Jobs Tab */}
            {value === 3 && (
              <Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    position: 'relative',
                    pb: 1,
                    mb: 3,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: 60,
                      height: 3,
                      backgroundColor: 'primary.main',
                      borderRadius: 4,
                    }
                  }}
                >
                  Career Opportunities
                </Typography>
                
                <Grid container spacing={3}>
                  {restaurantData.jobs.map((job, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Card sx={{ 
                        height: '100%',
                        border: job.urgent ? `2px solid ${theme.palette.primary.main}` : 'none',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        },
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography 
                                variant="h6" 
                                gutterBottom
                                sx={{ 
                                  fontWeight: 600,
                                  color: job.urgent ? 'primary.main' : 'text.primary',
                                }}
                              >
                                {isEditing ? (
                                  <TextField 
                                    variant="standard" 
                                    value={job.title}
                                    onChange={(e) => {
                                      const updatedJobs = [...restaurantData.jobs];
                                      updatedJobs[index].title = e.target.value;
                                      setRestaurantData({...restaurantData, jobs: updatedJobs});
                                    }}
                                  />
                                ) : (
                                  job.title
                                )}
                              </Typography>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                {isEditing ? (
                                  <TextField 
                                    variant="standard" 
                                    value={job.type}
                                    onChange={(e) => {
                                      const updatedJobs = [...restaurantData.jobs];
                                      updatedJobs[index].type = e.target.value;
                                      setRestaurantData({...restaurantData, jobs: updatedJobs});
                                    }}
                                    sx={{ width: 120 }}
                                  />
                                ) : (
                                  job.type
                                )}
                              </Typography>
                            </Box>
                            
                            {job.urgent && (
                              <Chip 
                                label="Urgent Hiring" 
                                color="primary"
                                sx={{ 
                                  fontWeight: 600, 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: 'primary.main',
                                  border: `1px solid ${theme.palette.primary.main}`,
                                }}
                              />
                            )}
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Salary Range
                            </Typography>
                            <Typography variant="body1">
                              {isEditing ? (
                                <TextField 
                                  variant="standard" 
                                  value={job.salary}
                                  onChange={(e) => {
                                    const updatedJobs = [...restaurantData.jobs];
                                    updatedJobs[index].salary = e.target.value;
                                    setRestaurantData({...restaurantData, jobs: updatedJobs});
                                  }}
                                />
                              ) : (
                                job.salary
                              )}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                              Positions Available
                            </Typography>
                            <Typography variant="body1">
                              {isEditing ? (
                                <TextField 
                                  variant="standard" 
                                  value={job.openings}
                                  onChange={(e) => {
                                    const updatedJobs = [...restaurantData.jobs];
                                    updatedJobs[index].openings = parseInt(e.target.value);
                                    setRestaurantData({...restaurantData, jobs: updatedJobs});
                                  }}
                                  type="number"
                                  sx={{ width: 80 }}
                                />
                              ) : (
                                job.openings
                              )}
                            </Typography>
                          </Box>
                          
                          {isEditing && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                Mark as Urgent
                              </Typography>
                              <Button
                                variant={job.urgent ? "contained" : "outlined"}
                                color="primary"
                                size="small"
                                onClick={() => {
                                  const updatedJobs = [...restaurantData.jobs];
                                  updatedJobs[index].urgent = !updatedJobs[index].urgent;
                                  setRestaurantData({...restaurantData, jobs: updatedJobs});
                                }}
                              >
                                {job.urgent ? "Urgent" : "Not Urgent"}
                              </Button>
                            </Box>
                          )}
                          
                          <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth
                            sx={{ 
                              mt: 2,
                              fontWeight: 600,
                            }}
                          >
                            Apply Now
                          </Button>
                          
                          {isEditing && (
                            <Button 
                              variant="outlined" 
                              color="secondary"
                              fullWidth
                              sx={{ 
                                mt: 1
                              }}
                              onClick={() => {
                                const updatedJobs = [...restaurantData.jobs];
                                updatedJobs.splice(index, 1);
                                setRestaurantData({...restaurantData, jobs: updatedJobs});
                              }}
                            >
                              Remove Position
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                  
                  {isEditing && (
                    <Grid item xs={12} md={6}>
                      <Card sx={{ 
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        boxShadow: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.03),
                        },
                      }}>
                        <CardContent>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center',
                              p: 3,
                            }}
                            onClick={() => {
                              const newJob = {
                                title: "New Position",
                                type: "Full-time",
                                salary: "$XX-$XX/hour",
                                openings: 1,
                                urgent: false
                              };
                              setRestaurantData({
                                ...restaurantData,
                                jobs: [...restaurantData.jobs, newJob]
                              });
                            }}
                          >
                            <WorkIcon color="primary" sx={{ fontSize: 40, mb: 2, opacity: 0.7 }} />
                            <Typography variant="h6" color="primary.main">
                              Add New Position
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
            
            {/* Gallery Tab */}
            {value === 4 && (
              <Box>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{ 
                    position: 'relative',
                    pb: 1,
                    mb: 3,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: 60,
                      height: 3,
                      backgroundColor: 'primary.main',
                      borderRadius: 4,
                    }
                  }}
                >
                  Restaurant Gallery
                </Typography>
                
                <Grid container spacing={2}>
                  {restaurantData.photos.map((photo, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card sx={{ 
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          '& .MuiCardMedia-root': {
                            transform: 'scale(1.05)',
                          },
                        },
                      }}>
                        <Box
                          component="img"
                          src={photo}
                          alt={`Restaurant photo ${index + 1}`}
                          sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                          }}
                        />
                        {isEditing && (
                          <Box sx={{ 
                            position: 'absolute', 
                            top: 8, 
                            right: 8, 
                            zIndex: 1 
                          }}>
                            <IconButton
                              sx={{
                                bgcolor: 'background.paper',
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: alpha('#fff', 0.9),
                                }
                              }}
                              onClick={() => {
                                alert("In a real application, this would open a file picker to change this gallery image");
                              }}
                            >
                              <CameraIcon />
                            </IconButton>
                          </Box>
                        )}
                      </Card>
                    </Grid>
                  ))}
                  
                  {isEditing && (
                    <Grid item xs={12} sm={6} md={3}>
                      <Card sx={{ 
                        borderRadius: 2,
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        boxShadow: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.03),
                        },
                      }}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center' 
                          }}
                          onClick={() => {
                            alert("In a real application, this would open a file picker to add a new gallery image");
                            
                            // After successful upload, you would add the new image to the photos array
                            // setRestaurantData({
                            //   ...restaurantData,
                            //   photos: [...restaurantData.photos, newImageUrl]
                            // });
                          }}
                        >
                          <CameraIcon color="primary" sx={{ fontSize: 40, mb: 1, opacity: 0.7 }} />
                          <Typography variant="body1" color="primary.main">
                            Add Photo
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  </ThemeProvider>
);
};

export default RestaurantProfile;