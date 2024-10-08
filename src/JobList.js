import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
// import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Navbar from "./utils/Navbar";

const JobList = () => {
  const [jobs, setJobs] = useState([]); // State to hold job data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [currPage, setCurrPage] = useState(1); // State for current page
  const pageSize = 1; // State for page size

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await axios.get(`https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api/jobs/`);
        const response = await axios.get(
            'https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api/jobs/',
            {
              headers: {
                'ngrok-skip-browser-warning': '69420',
                'Accept': 'application/json',
              },
            }
          );
        console.log(response.data);
        setJobs(response.data); // Assuming response.data contains the list of jobs
      } catch (err) {
        setError(err); // Set error state if the request fails
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchJobs();
  }, []); // Fetch jobs once when the component mounts

  const handleChangePage = (event, value) => {
    setCurrPage(value); // Update the current page
  };

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

  const totalJobs = jobs.length; // Total number of jobs
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
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={displayedJobs}
          columns={columns}
          // pageSize={pageSize} // You can still control this if needed
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Box>
      <Stack spacing={2} sx={{ marginTop: 2, alignItems: "center" }}>
        <Pagination
          count={totalPages}
          page={currPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  );
};

export default JobList;
