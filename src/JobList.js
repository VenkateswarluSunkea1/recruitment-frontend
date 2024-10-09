import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Navbar from "./utils/Navbar";
import {Toolbar, Typography, Button } from "@mui/material";

import AssociateJobOpeningModal from "./AssociateJobOpeningModal";
import axiosInstance from "./utils/axiosInstance";

const JobList = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currPage, setCurrPage] = useState(1); // State for current page
  const pageSize = 10; // State for page size
  const [totalJobs, setTotalJobs] = useState(0); // State for total jobs
  const [selectedRows, setSelectedRows] = useState([]); // State for selected rows

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await axios.get(`https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api/jobs/`);

        // const response = await axios.get(
        //     'https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api/jobs/',
        //     {
        //       headers: {
        //         'ngrok-skip-browser-warning': '69420',
        //         'Accept': 'application/json',
        //       },
        //     }
        //   );
        const response = await axiosInstance.get('/jobs');

        console.log(response.data);
        setJobs(response.data); // Assuming response.data contains the list of jobs
      } catch (err) {
        setError(err); // Set error state if the request fails
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    fetchJobs();
  }, [currPage]);

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/jobs/?page=${currPage}&limit=${pageSize}`
  //       );
  //       console.log(response.data, "assd"); // Log the entire response
  //       setJobs(response.data); // Adjust according to your API response structure
  //       setTotalJobs(response?.data?.total_count); // Adjust accordingly
  //     } catch (err) {
  //       setError(err); // Set error state if the request fails
  //     } finally {
  //       setLoading(false); // Set loading to false regardless of success or failure
  //     }
  //   };

  //   fetchJobs();
  // }, [currPage]); // Fetch jobs once when the component mounts

  const handleChangePage = (event, value) => {
    setCurrPage(value); // Update the current page
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }
  // Get jobs for the current page
  const displayedJobs = jobs.slice(
    (currPage - 1) * pageSize,
    currPage * pageSize
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error message
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Show error message
  }

  // const totalJobs = jobs.length; // Total number of jobs
  const totalPages = Math.ceil(totalJobs / pageSize); // Calculate total pages

  // Define the columns for the DataGrid
  const columns = [
    { field: "id", headerName: "Job Opening ID", width: 150 },
    { field: "posting_title", headerName: "Posting Title", width: 200 },
    {
      field: "assigned_recruiter",
      headerName: "Assigned Recruiter(s)",
      width: 180,
    },
    { field: "target_date", headerName: "Target Date", width: 120 },
    { field: "job_status", headerName: "Job Opening Status", width: 150 },
    { field: "city", headerName: "City", width: 120 }, // Ensure 'city' is available in your data
    { field: "client_name", headerName: "Client Name", width: 150 },
    { field: "contact_name", headerName: "Contact Name", width: 150 },
    { field: "account_manager", headerName: "Account Manager", width: 150 },
  ];

  return (
    <div>
      <Navbar />

      {/* Conditionally render the top action bar when rows are selected */}
      {selectedRows.length > 0 && (
        <Toolbar
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="subtitle1" sx={{ flex: "1 1 100%" }}>
            {selectedRows.length} Candidate{selectedRows.length > 1 ? "s" : ""}{" "}
            selected
          </Typography>{" "}
          <Button
            onClick={() => {
              setSelectedRows([]);
            }}
            variant="text"
          >
            clear
          </Button>
          <AssociateJobOpeningModal />
        </Toolbar>
      )}

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={jobs}
          columns={columns}
          pageSize={pageSize}
          checkboxSelection
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(newSelection) => {
            console.log("newawlwction", newSelection);
            setSelectedRows(newSelection); // Update selected rows
          }}
          sx={{ border: 0 }}
        />
      </Box>
    </div>
  );
};

export default JobList;
