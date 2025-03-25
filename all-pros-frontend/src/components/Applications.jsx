import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TablePagination
} from '@mui/material';

// Optional helper to color the status Chip
function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case 'shortlisted':
      return 'primary';
    case 'interviewed':
      return 'info';
    case 'hired':
      return 'success';
    case 'rejected':
      return 'error';
    case 'further reference':
      return 'warning';
    default:
      return 'default';
  }
}

export default function Applications({ applications = [] }) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApps, setFilteredApps] = useState(applications);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Whenever applications or searchTerm changes, update the filtered list
  useEffect(() => {
    if (!searchTerm) {
      setFilteredApps(applications);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = applications.filter((app) =>
        app.firstName?.toLowerCase().includes(lowerSearch) ||
        app.lastName?.toLowerCase().includes(lowerSearch) ||
        app.email?.toLowerCase().includes(lowerSearch) ||
        app.jobAppliedFor?.toLowerCase().includes(lowerSearch)
      );
      setFilteredApps(filtered);
    }
  }, [searchTerm, applications]);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Current rows to display (slice of filteredApps)
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredApps.slice(startIndex, endIndex);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Top bar: Title + Search */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Application
        </Typography>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 250 }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Phone Number</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Experience</strong></TableCell>
              <TableCell><strong>Job Applied For</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((app, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    // Zebra striping for clarity
                    '&:nth-of-type(odd)': {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{app.firstName}</TableCell>
                  <TableCell>{app.lastName}</TableCell>
                  <TableCell>{app.phoneNumber}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.address}</TableCell>
                  <TableCell>{app.experience}</TableCell>
                  <TableCell>{app.jobAppliedFor}</TableCell>
                  <TableCell>
                    <Chip
                      label={app.status || 'N/A'}
                      color={getStatusColor(app.status)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredApps.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{ mt: 1 }}
      />
    </Container>
  );
}
