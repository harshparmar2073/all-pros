import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ==============================
//   STYLED COMPONENTS / HELPERS
// ==============================
const StatPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

const ValueText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(24),
  color: theme.palette.text.primary,
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(2),
  minHeight: 300,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(0,0,0,0.15)',
  },
}));

// ==============================
//          MAIN COMPONENT
// ==============================
export default function DashboardFancy({
  stats = {
    applications: 0,
    onHold: 0,
    shortlisted: 0,
    vacancies: 0,
    interviewed: 0,
    futureRef: 0,
  },
  jobVacancy = [
    // Example structure
    { title: 'Waiter/Waitress', count: 0 },
    { title: 'Bartender', count: 0 },
    { title: 'Barista', count: 0 },
    { title: 'Sommelier', count: 0 },
    { title: 'Maitre D’', count: 0 },
    // ... add more as needed
  ],
  topReferrers = [
    // Example structure
    { label: 'Google', count: 0 },
    { label: 'Facebook Campaign', count: 0 },
    { label: 'LinkedIn Post', count: 0 },
    { label: 'Mail Campaign', count: 0 },
    // ... add more as needed
  ],
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f0f0f0, #fefefe)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* ROW 1: 3 stat cards */}
          <Grid item xs={12} sm={4}>
            <StatPaper>
              <TitleText>APPLICATIONS</TitleText>
              <ValueText>{stats.applications}</ValueText>
            </StatPaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatPaper>
              <TitleText>ON-HOLD</TitleText>
              <ValueText>{stats.onHold}</ValueText>
            </StatPaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatPaper>
              <TitleText>SHORTLISTED</TitleText>
              <ValueText>{stats.shortlisted}</ValueText>
            </StatPaper>
          </Grid>

          {/* ROW 2: 3 stat cards */}
          <Grid item xs={12} sm={4}>
            <StatPaper>
              <TitleText>VACANCIES</TitleText>
              <ValueText>{stats.vacancies}</ValueText>
            </StatPaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatPaper>
              <TitleText>INTERVIEWED</TitleText>
              <ValueText>{stats.interviewed}</ValueText>
            </StatPaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatPaper>
              <TitleText>FOR FUTURE REFERENCE</TitleText>
              <ValueText>{stats.futureRef}</ValueText>
            </StatPaper>
          </Grid>

          {/* ROW 3: 2 sections -> JOB VACANCY (left), TOP REFERRERS (right) */}
          <Grid item xs={12} sm={6}>
            <SectionPaper>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                JOB VACANCY
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List dense>
                  {jobVacancy.map((item, idx) => (
                    <ListItem key={idx} disableGutters>
                      <ListItemText
                        primary={item.title}
                        secondary={String(item.count)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </SectionPaper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SectionPaper>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                TOP REFERRERS
              </Typography>
              <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <List dense>
                  {topReferrers.map((ref, idx) => (
                    <ListItem key={idx} disableGutters>
                      <ListItemText
                        primary={ref.label}
                        secondary={String(ref.count)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </SectionPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
