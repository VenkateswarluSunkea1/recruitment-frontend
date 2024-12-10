import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import SendMailModal from './SendMailModal';
import HiringPipeline from './HiringPipeline'; // Import the HiringPipeline component
import { useLocation } from 'react-router-dom';
import axiosInstance from './utils/axiosInstance'; // Import axiosInstance

const ApplicationsPage = () => {
  const location = useLocation();
  const { applications, jobId, postingTitle } = location.state || {};
  const [hiringPipelines, setHiringPipelines] = useState({}); // Store fetched pipeline data

  // Function to fetch hiring pipeline for each row based on jobId and resumeId
  const fetchHiringPipeline = async (resumeId) => {
    if (!resumeId || !jobId) return; // If no resumeId or jobId, skip the API call

    try {
      // Adjust the URL as per your request format: /hiring_pipeline/{jobId}/{resumeId}
      const response = await axiosInstance.get(`/hiring-pipelines/${jobId}/${resumeId}`);
      
      // Store the pipeline data with key as the resumeId
      setHiringPipelines((prev) => ({
        ...prev,
        [resumeId]: response.data, // Store response by resumeId
      }));
    } catch (error) {
      console.error("Error fetching hiring pipeline:", error);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 }, // Assuming 'id' is resumeId
    { field: 'name', headerName: 'Application Name', width: 200 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    {
      field: 'hiringPipeline',
      headerName: 'Hiring Pipeline',
      width: 300,
      renderCell: (params) => {
        const resumeId = params.row.id;  // The 'id' field here is assumed to be resumeId
        const pipelineData = hiringPipelines[resumeId];

        // Fetch the pipeline data if not already fetched
        if (!pipelineData) {
          fetchHiringPipeline(resumeId); // Fetch the pipeline data
        }

        return (
          <HiringPipeline currentStage={pipelineData?.status} />
        );
      },
    },
    { field: 'job_status', headerName: 'Application Status', width: 180 },
  ];

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
          <SendMailModal />
        </Toolbar>
      )}
      <DataGrid
        rows={applications}
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