import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Box,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Modal,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "./utils/axiosInstance";
import Navbar from "./utils/Navbar";

const styles = {
  cardContainer: {
    margin: "20px",
    padding: "20px",
    borderRadius: "10px",
  },
  stagesContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  activeStage: {
    backgroundColor: "#FF9900",
    color: "#fff",
  },
  businessCard: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "10px",
  },
  sectionContainer: {
    marginTop: "20px",
  },
  sectionTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noRecordsText: {
    color: "#777",
  },
  leftSidebar: {
    position: "fixed",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    height: "100vh",
    overflow: "hidden",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const JobOverview= ()=>{
  const location = useLocation();
  const { postingTitle, jobId } = location.state || {}; // Get postingTitle from the state
  console.log(jobId  + " dcbsdj dscv sd");
  const [applications, setApplications] = useState([]);
  console.log("thiis is applications "+ applications);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [job, setJob] = useState(null); // Store the job details

  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`jobs/${jobId}`);
      setJob(response.data); // Set the fetched job data
      console.log("ye h job ayi hui " + job)
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  // Fetch applications from the backend with pagination and filtering by posting title
  const fetchApplications = async (page = 0, limit = 10) => {
    try {
      const response = await axiosInstance.get(`jobs/${jobId}/resumes`, {
        params: {
          page: page + 1,
          limit: limit,
          // postingTitle: postingTitle, // Include postingTitle in the request
        },
      });

      const data = await response.data;
      setApplications(data);
      console.log("ths is data.dta"+ data);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails(); // Fetch job details when the component mounts
    if (postingTitle) {
      fetchApplications(postingTitle, page, rowsPerPage);
    }
  }, [postingTitle, page, rowsPerPage]);

  const navigate = useNavigate();

  // Refs for each section
  const notesRef = useRef(null);
  const attachmentsRef = useRef(null);
  const interviewsRef = useRef(null);

  // if (!application)
  //   return <Typography>Select an application to view details</Typography>;

  // Function to scroll to the corresponding section
  const handleScrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Navigate to the Job Opening Form for editing
  const handleEdit = () => {
    navigate("/create/job-opening", {
      state: { jobId, postingTitle }, // Pass jobId and postingTitle for editing purposes
    });
  };


  return (
    <>
    <Navbar />
    <Grid container spacing={2}>
      {/* Left Sidebar */}
      <Grid item xs={12} sm={3} md={2}>
      <Paper sx={{ 
        ...styles.leftSidebar, 
        height: '100vh', // Keep full height of the viewport
        position: 'sticky', // Makes it stick to the top of the viewport on scroll
        top: 0, // Stick to the top
        overflow: 'auto', // Allows scrolling if the content overflows
      }}>
          <Typography variant="h6" component="h2">
            Quick Access
          </Typography>
          <List>
            <ListItem
              button
              onClick={() => navigate("/applications", { state: { applications: applications, jobId: jobId, postingTitle:postingTitle } })}
              style={{ cursor: "pointer" }}
            >
              <ListItemText
                primary={
                  <>
                    Applications{" "}
                    <span
                      style={{
                        backgroundColor: "lightblue",
                        padding: "0px 5px",
                        borderRadius: "4px",
                      }}
                    >
                      {totalCount}
                    </span>
                  </>
                }
              />
            </ListItem>
            {/* add a modal for list of jobb boardd and carrer sites */}
            <ListItem>
            <ListItemText primary="Sourcing Summary" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleScrollToSection(notesRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Notes" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleScrollToSection(attachmentsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Attachments" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(interviewsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Interviews" />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10}>
        <Card sx={styles.cardContainer}>
          {/* Header Section */}
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            marginBottom={"10px"}
          >
            <Grid item>
              <Typography variant="h5" component="h2">
                {postingTitle}
              </Typography>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
          </Grid>

          {/* Candidate Stages */}
          <Box sx={styles.stagesContainer}>
            {[
              "New",
              "In Review",
              "Available",
              "Engaged",
              "Offered",
              "Hired",
              "Rejected",
            ].map((stage, index) => (
              <Chip
                key={index}
                label={stage}
                sx={{
                  ...(stage === "Engaged" ? styles.activeStage : {}),
                  padding: "10px",
                  minWidth: "70px",
                  textAlign: "center",
                }}
              />
            ))}
          </Box>


            {/* Business Card */}
            {job && (
              <Card sx={styles.businessCard}>
                <CardContent>
                  <Typography variant="h6" component="div">Business Card</Typography>
                  <Divider sx={{ marginBottom: "10px" }} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Typography>Publish: {job.date_opened}</Typography></Grid>
                    <Grid item xs={6}><Typography>Expected Revenue: {job.expected_revenue || "--"}</Typography></Grid>
                    <Grid item xs={6}><Typography>Missed Revenue: {job.missed_revenue || "--"}</Typography></Grid>
                    <Grid item xs={6}><Typography>City: {job.address_city || "--"}</Typography></Grid>
                    <Grid item xs={6}><Typography>Contact Name: {job.contact_name || "--"}</Typography></Grid>
                    <Grid item xs={6}><Typography>Actual Revenue: {job.actual_revenue || "--"}</Typography></Grid>
                    <Grid item xs={6}><Typography>Target Date: {job.target_date}</Typography></Grid>
                    <Grid item xs={6}><Typography>Assigned Recruiter(s): {job.assigned_recruiter || "--"}</Typography></Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

          {/* Other Details */}
          <Card sx={{ marginTop: "20px" }}>
              <CardContent>
                <Typography variant="h6" component="div">Other Details</Typography>
                <Divider sx={{ marginBottom: "10px" }} />
                <Typography>ID: {job?.id || "Loading..."}</Typography>
                <Typography>Status: {job?.job_status || "Loading..."}</Typography>
                <Typography>Pipeline: {job?.job_type || "Loading..."}</Typography>
                <Typography>Posting Title: {job?.posting_title}</Typography>
                <Typography>Source: {job?.industry || "Loading..."}</Typography>
                <Typography>Candidate Owner: {job?.account_manager}</Typography>
              </CardContent>
            </Card>


          {/* Additional Sections from Scrolled Down Image */}
          <Paper sx={styles.sectionContainer} ref={notesRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Notes
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          <Paper sx={styles.sectionContainer} ref={attachmentsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Attachments
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          <Paper sx={styles.sectionContainer} ref={interviewsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Interviews
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>
        </Card>
      </Grid>
    </Grid>
    </>
  );
};

export default JobOverview;