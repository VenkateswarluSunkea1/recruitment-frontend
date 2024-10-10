import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import AssociateJobOpeningModal from './AssociateJobOpeningModal';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'applicationName', headerName: 'Application Name', width: 200 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  { field: 'hiringPipeline', headerName: 'Hiring Pipeline', width: 200 },
  { field: 'applicationStatus', headerName: 'Application Status', width: 180 },
  { field: 'postingTitle', headerName: 'Posting Title', width: 200 },
];

const rows = [
  {
    id: 1,
    applicationName: 'Java Developer',
    rating: 5,
    hiringPipeline: 'In Review',
    applicationStatus: 'Associated',
    postingTitle: 'Senior Java Developer',
  },
  {
    id: 2,
    applicationName: 'React Developer',
    rating: 4,
    hiringPipeline: 'Screening',
    applicationStatus: 'Pending',
    postingTitle: 'Frontend Developer',
  },
  // Add more rows as needed
];

const ApplicationsPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {selectedRows.length > 0 && (
        <Toolbar
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="subtitle1" sx={{ flex: "1 1 100%" }}>
            {selectedRows.length} Candidate{selectedRows.length > 1 ? "s" : ""} selected
          </Typography>
          <Button onClick={clearSelection} variant="text">
            Clear
          </Button>
          <AssociateJobOpeningModal />
        </Toolbar>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleRowSelectionChange}
        sx={{ height: 400 }}
      />
    </Box>
  );
};

export default ApplicationsPage;
