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

const ApplicationOverview = () => {
  const location = useLocation();
  const { application } = location.state || {};
  console.log(application, "applicationfsfsdfdf");
  const jobs = application.jobs;
  // Correct useEffect Hook without conditional wrapper
  console.log(jobs, "jobsasdasdasd");
  const [applications, setApplications] = useState(0);
  useEffect(() => {
    const fetchJobbs = async () => {
      if (jobs?.length > 0) {
        try {
          // const response = await axiosInstance.get(
          //   `get-jobs-by-ids/?job_ids=${jobs.join(",")}`
          // );
          const response = await axiosInstance.get(`get-jobs-by-ids/`, {
            params: { job_ids: jobs }, // Make sure jobs is an array, e.g., [1, 2]
          });
          setApplications(response.data);
          console.log(response.data, "jsbgskbskfsdfsdfksdfbskdfbskfd"); // Handle the response data
        } catch (error) {
          console.error("Error fetching jobs", error);
        }
      }
    };

    fetchJobbs();
  }, [jobs]);
  const navigate = useNavigate();

  // Refs for each section
  const smsRef = useRef(null);
  const invitedEventsRef = useRef(null);
  const campaignsRef = useRef(null);
  const checklistsRef = useRef(null);
  const toDosRef = useRef(null);
  const answeredAssessmentsRef = useRef(null);
  const notesRef = useRef(null);
  const ratingsReviewsRef = useRef(null);
  const attachmentsRef = useRef(null);
  const interviewsRef = useRef(null);
  const emailsRef = useRef(null);

  if (!application)
    return <Typography>Select an application to view details</Typography>;

  // Function to scroll to the corresponding section
  const handleScrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  console.log(jobs, "jobssdfsdf");

  // useEffect(() => {
  //   const fetchJobbs = async () => {
  //     if (jobs.length > 0) {
  //       const response = axiosInstance.get("get-jobs-by-ids/", jobs);
  //     }
  //   };
  //   fetchJobbs();
  // }, [jobs]);

  return (
    <>
    <Navbar />
    <Grid container spacing={2}>
      {/* Left Sidebar */}
      <Grid item xs={2}>
        <Paper sx={styles.leftSidebar}>
          <Typography variant="h6" component="h2">
            Quick Access
          </Typography>
          <List>
            <ListItem
              button
              onClick={() => navigate("/applications")}
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
                      {applications?.length}
                    </span>
                  </>
                }
              />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(smsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="SMS" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(invitedEventsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Invited Events" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(campaignsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Campaigns" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(checklistsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Checklists" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(toDosRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="To-Dos" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleScrollToSection(answeredAssessmentsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Answered Assessments" />
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
              onClick={() => handleScrollToSection(ratingsReviewsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Ratings and Reviews" />
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
            <ListItem
              button
              onClick={() => handleScrollToSection(emailsRef)}
              style={{ cursor: "pointer" }}
            >
              <ListItemText primary="Emails" />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      {/* Main Content */}
      <Grid item xs={10}>
        <Card sx={styles.cardContainer}>
          {/* Header Section */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" component="h2">
                {application.name}'s Overview
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
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
          <Card sx={styles.businessCard}>
            <CardContent>
              <Typography variant="h6" component="div">
                Business Card
              </Typography>
              <Divider sx={{ marginBottom: "10px" }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>Origin: Sourced</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Mobile: {application.mobile || "--"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Email: {application.email || "--"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Secondary Email: {application.secondaryEmail || "--"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Experience in Years: {application.experience || "--"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Current Job Title: {application.currentJobTitle || "--"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Current Employer: {application.currentEmployer || "--"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    Skill Set:{" "}
                    <span style={{ color: "green" }}>
                      {application.skills || "--"}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Other Details */}
          <Card sx={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Other Details
              </Typography>
              <Divider sx={{ marginBottom: "10px" }} />
              <Typography>ID: {application.id}</Typography>
              <Typography>Status: {application.status}</Typography>
              <Typography>Pipeline: {application.pipeline}</Typography>
              <Typography>Posting Title: {application.postingTitle}</Typography>
              <Typography>Source: {application.source}</Typography>
              <Typography>
                Candidate Owner: {application.candidateOwner}
              </Typography>
            </CardContent>
          </Card>

          {/* New Sections Merged from Both Screenshots */}
          <Paper sx={styles.sectionContainer} ref={smsRef}>
            <CardContent>
              <Box sx={styles.sectionTitle}>
                <Typography variant="h6">SMS</Typography>
                <Button variant="outlined" startIcon={<SmsIcon />}>
                  Send SMS
                </Button>
              </Box>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          {/* <Paper sx={styles.sectionContainer}>
            <CardContent>
            <Box sx={styles.sectionTitle}>
            <Typography variant="h6">Client Submission</Typography>
            </Box>
            <Divider />
            <Typography>No records found</Typography>
            <Button variant="contained">Submit to Client</Button>
            </CardContent>
          </Paper> */}

          <Paper sx={styles.sectionContainer} ref={invitedEventsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Invited Events
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          <Paper sx={styles.sectionContainer} ref={campaignsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Campaigns
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          <Paper sx={styles.sectionContainer} ref={checklistsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Checklists
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          {/* To-Do Section with buttons restored */}
          <Paper sx={styles.sectionContainer} ref={toDosRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                To-Dos
                <Box sx={styles.buttonGroup}>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    New Task
                  </Button>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    New Event
                  </Button>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Log a Call
                  </Button>
                </Box>
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

          <Paper sx={styles.sectionContainer} ref={answeredAssessmentsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Answered Assessments
              </Typography>
              <Divider />
              <Typography sx={styles.noRecordsText}>
                No records found
              </Typography>
            </CardContent>
          </Paper>

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

          <Paper sx={styles.sectionContainer} ref={ratingsReviewsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Ratings and Reviews
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

          <Paper sx={styles.sectionContainer} ref={emailsRef}>
            <CardContent>
              <Typography variant="h6" sx={styles.sectionTitle}>
                Emails
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

export default ApplicationOverview;
