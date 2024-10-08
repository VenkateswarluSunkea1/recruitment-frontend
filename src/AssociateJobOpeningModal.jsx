import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import axios from "axios";

const styles = {
  inputLabel: {
    fontSize: "14px", // Adjust size if needed
    color: "#888888", // Similar to the one in your design
    marginBottom: "5px", // Spacing between label and input
  },
  select: {
    backgroundColor: "#f7f7f7", // Matches the light background
    padding: "12px", // Similar padding for the text
    borderRadius: "4px", // Rounded edges
    border: "1px solid #cccccc", // Light border color
  },
};

const AssociateJobOpeningModal = ({selectedRows}) => {
  const [open, setOpen] = useState(false);
  const [jobOpening, setJobOpening] = useState(""); // To handle job opening selection
  const [applicationStatus, setApplicationStatus] = useState("Associated"); // Default application status
  const [comments, setComments] = useState(""); // To handle comments

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAssociate = async () => {
    const job_id = jobOpening; // Your selected job id
    const resume_ids = selectedRows; // Your selected resume ids

    try {
      const response = await fetch(
        "http://localhost:8000/api/associate-resumes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_id,
            resume_ids,
          }),
        }
      );

      const data = await response.json();
      console.log(data.message,'testing123'); // Handle success message
    } catch (error) {
      console.error("Error associating resumes:", error); // Handle error
    }
    console.log(
      jobOpening,
      applicationStatus,
      comments,
      "fjksdfkbsdfshdbfkbsdf"
    );
    // Close modal after handling
    handleClose();
  };
  const [jobs, setJobs] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/`);
        console.log(response.data, "assd"); // Log the entire response
        setJobs(response.data); // Adjust according to your API response structure
      } catch (err) {
        setError(err); // Set error state if the request fails
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchJobs();
  }, []); // Fetch jobs when the current page changes
  console.log(jobs, "jobsslsdlferbta");
  return (
    <React.Fragment>
      <IconButton
        onClick={handleOpen}
        color="primary"
        aria-label="associate-job"
      >
        <WorkOutlineIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="associate-job-opening"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500, // Adjust width to match the design
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Associate Job Opening
          </Typography>

          {/* Choose Job Opening */}
          {/* <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              label="Choose Job Opening"
              value={jobOpening}
              onChange={(e) => setJobOpening(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <WorkOutlineIcon />
                  </IconButton>
                ),
              }}
            />
          </FormControl> */}

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="job-opening-label">Choose Job Opening</InputLabel>
            {loading ? (
              <CircularProgress /> // Show a loading spinner while fetching jobs
            ) : (
              <Select
                labelId="job-opening-label"
                value={jobOpening}
                onChange={(e) => setJobOpening(e.target.value)}
                label="Choose Job Opening"
                endAdornment={
                  <IconButton edge="end">
                    <WorkOutlineIcon />
                  </IconButton>
                }
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.posting_title}
                  </MenuItem>
                ))}
              </Select>
            )}
            {error && (
              <p style={{ color: "red" }}>
                Error fetching jobs: {error.message}
              </p>
            )}
          </FormControl>

          {/* Select Application Status */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="application-status-label">
              Select Application Status
            </InputLabel>
            <Select
              labelId="application-status-label"
              value={applicationStatus}
              label="Select Application Status"
              onChange={(e) => setApplicationStatus(e.target.value)}
            >
              <MenuItem value="Associated">Associated</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          {/* Comments */}
          <TextField
            label="Comments"
            multiline
            rows={3}
            fullWidth
            sx={{ mt: 2 }}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          {/* Buttons */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleAssociate} variant="contained">
              Associate
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default AssociateJobOpeningModal;

// import React, { useState } from "react";
// import {
//   Button,
//   Modal,
//   Typography,
//   Box,
//   IconButton,
//   TextField,
//   Autocomplete,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

// const AssociateJobOpeningModal = () => {
//   const [open, setOpen] = useState(false);
//   const [jobOpening, setJobOpening] = useState("");
//   const [applicationStatus, setApplicationStatus] = useState("Associated");
//   const [comments, setComments] = useState(""); // To handle comments

//   const jobOptions = [
//     { category: "Screening", label: "Applied" },
//     { category: "Screening", label: "Interview Scheduled" },
//     { category: "Hiring", label: "Offer Extended" },
//     { category: "Hiring", label: "Offer Accepted" },
//     { category: "Onboarding", label: "Documents Submitted" },
//     { category: "Onboarding", label: "Onboarding Completed" },
//   ];

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleAssociate = () => {
//     console.log({
//       jobOpening,
//       applicationStatus,
//       comments,
//     });
//     handleClose();
//   };

//   return (
//     <React.Fragment>
//       <IconButton
//         onClick={handleOpen}
//         color="primary"
//         aria-label="associate-job"
//       >
//         <WorkOutlineIcon />
//       </IconButton>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="associate-job-opening"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 500, // Adjust width to match the design
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Associate Job Opening
//           </Typography>
//           {/* Choose Job Opening with searchable dropdown */}{" "}
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <TextField
//               label="Choose Job Opening"
//               value={jobOpening}
//               onChange={(e) => setJobOpening(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <IconButton edge="end">
//                     <WorkOutlineIcon />
//                   </IconButton>
//                 ),
//               }}
//             />
//           </FormControl>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <Autocomplete
//               options={jobOptions}
//               groupBy={(option) => option.category} // Group by category
//               getOptionLabel={(option) => option.label} // Show sub-category label
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Select Application Status"
//                   variant="outlined"
//                   placeholder="Search..."
//                 />
//               )}
//               onChange={(event, newValue) => {
//                 setJobOpening(newValue ? newValue.label : "");
//               }}
//             />
//           </FormControl>
//           <TextField
//             label="Comments"
//             multiline
//             rows={3}
//             fullWidth
//             sx={{ mt: 2 }}
//             value={comments}
//             onChange={(e) => setComments(e.target.value)}
//           />
//           {/* Buttons */}
//           <Box display="flex" justifyContent="flex-end" mt={3}>
//             <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
//               Cancel
//             </Button>
//             <Button onClick={handleAssociate} variant="contained">
//               Associate
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// };

// export default AssociateJobOpeningModal;
