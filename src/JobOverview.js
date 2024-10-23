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
  // const [open, setOpen] = useState(false);
  // const [profileUrl, setProfileUrl] = useState("");
  // const [platform, setPlatform] = useState(""); // State to track the clicked platform
  // const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  // const [anchorEl, setAnchorEl] = useState(null);

  // // Close menu handler
  // const handleMenuClose = () => setAnchorEl(null);
  // console.log(platform, "platformusdffdf");
  // const handleOpen = (platform) => {
  //   setPlatform(platform); // Set the platform (LinkedIn, Facebook, or Twitter)
  //   if (platform === "LinkedIn") {
  //     setProfileUrl(application.linkedInUrl || "");  // Prefill LinkedIn URL if available
  //   } else if (platform === "Facebook") {
  //     setProfileUrl(application.facebookUrl || "");  // Prefill Facebook URL if available
  //   } else if (platform === "Twitter") {
  //     setProfileUrl(application.twitterUrl || "");   // Prefill Twitter URL if available
  //   }
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setProfileUrl(""); // Reset URL input when the modal is closed
  // };

  // const handleSave = () => {
  //   console.log(profileUrl, "profileUrlsfsdsdfsdfsdf");

  //   const apiUrl = "/update-social-url/"; // No need to include the full URL, as it's set in the axios instance

  //   // Data to send to the API
  //   const requestData = {
  //     resume_id: application.id, // Assuming `application.id` is the resume ID
  //     url_type: platform, // The type of social media (e.g., 'linkedIn', 'facebook', 'twitter')
  //     new_url: profileUrl, // The new profile URL to update
  //   };

  //   // Call the API using axiosInstance
  //   axiosInstance
  //     .post(apiUrl, requestData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         console.log("Profile URL updated successfully.");
  //       } else {
  //         console.error("Failed to update profile URL:", response.data.error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating profile URL:", error);
  //     });

  //   handleClose(); // Close modal after saving
  // };

  // const location = useLocation();
  // const { application } = location.state || {};
  // console.log(application, "applicationfsfsdfdf");
  // const jobs = application.jobs;
  // Correct useEffect Hook without conditional wrapper
  // console.log(jobs, "jobsasdasdasd");
  // const [applications, setApplications] = useState(0);
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     if (jobs?.length > 0) {
  //       try {
  //         // const response = await axiosInstance.get(
  //         //   `get-jobs-by-ids/?job_ids=${jobs.join(",")}`
  //         // );
  //         const response = await axiosInstance.get(`get-jobs-by-ids/`, {
  //           params: { job_ids: jobs }, // Make sure jobs is an array, e.g., [1, 2]
  //         });
  //         setApplications(response.data);
  //         console.log(response.data, "jsbgskbskfsdfsdfksdfbskdfbskfd"); // Handle the response data
  //       } catch (error) {
  //         console.error("Error fetching jobs", error);
  //       }
  //     }
  //   };

  //   fetchJobs();
  // }, [jobs]);
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

  // console.log(jobs, "jobssdfsdf");


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
              // onClick={() => navigate("/applications",{ state: { applications: applications } })}
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
                      {/* {applications?.length} */}
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
                {/* {application.postingTitle} */} postingTitle
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
                <Typography variant="h6" component="div">Business Card</Typography>
                <Divider sx={{ marginBottom: "10px" }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}><Typography>Publish: "--"</Typography></Grid>
                  <Grid item xs={6}><Typography>Expected Revenue:"--"</Typography></Grid>
                  <Grid item xs={6}><Typography>Missed Revenue: "--"</Typography></Grid>
                  <Grid item xs={6}><Typography>City: "--"</Typography></Grid>
                  <Grid item xs={6}><Typography>Contact Name: "--"</Typography></Grid>
                  <Grid item xs={6}><Typography>Actual Revenue: "--"</Typography></Grid>
                  <Grid item xs={6}><Typography>Target Date: "--"</Typography></Grid>
                  <Grid item xs={6}><Typography>Assigned Recruiter(s): "--"</Typography></Grid>
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
              <Typography>ID: sampleID</Typography>
              <Typography>Status: sampleStatus</Typography>
              <Typography>Pipeline: pipeline</Typography>
              <Typography>Posting Title: postingTitle</Typography>
              <Typography>Source: source</Typography>
              <Typography>
                Candidate Owner: candidateOwner
              </Typography>
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

// const JobOverview= ()=>{
//   return <p>JobOverview</p>
// }

export default JobOverview;










          //  <Box
          //     sx={{
          //       display: "flex",
          //       alignItems: "center",
          //       justifyContent: "center",
          //       border: "1px solid #E0E0E0",
          //       borderRadius: "20px",
          //       width: "fit-content",
          //     }}
          //   >
          //     <Tooltip
          //       title={
          //         application.linkedInUrl
          //           ? "View/Edit LinkedIn URL"
          //           : "Add LinkedIn URL"
          //       }
          //     >
          //       <IconButton
          //         onClick={
          //           application.linkedInUrl
          //             ? handleMenuOpen
          //             : () => handleOpen("LinkedIn")
          //         }
          //       >
          //         <LinkedInIcon sx={{ color: "#0A66C2" }} />
          //       </IconButton>
          //     </Tooltip>

          //     {/* LinkedIn Dropdown */}
          //     <Menu
          //       anchorEl={anchorEl}
          //       open={Boolean(anchorEl)}
          //       onClose={handleMenuClose}
          //     >
          //       <MenuItem
          //         onClick={() =>
          //           window.open(application.linkedInUrl, "_blank")
          //         }
          //       >
          //         View
          //       </MenuItem>
          //       <MenuItem onClick={() => handleOpen("LinkedIn")}>Edit</MenuItem>
          //     </Menu>

          //     {/* Facebook Button */}
          //     <Tooltip
          //       title={
          //         application.facebookUrl
          //           ? "View/Edit Facebook URL"
          //           : "Add Facebook URL"
          //       }
          //     >
          //       <IconButton
          //         onClick={
          //           application.facebookUrl
          //             ? handleMenuOpen
          //             : () => handleOpen("Facebook")
          //         }
          //       >
          //         <FacebookIcon sx={{ color: "#1877F2" }} />
          //       </IconButton>
          //     </Tooltip>

          //     {/* Twitter Button */}
          //     <Tooltip
          //       title={
          //         application.twitterUrl
          //           ? "View/Edit Twitter URL"
          //           : "Add Twitter URL"
          //       }
          //     >
          //       <IconButton
          //         onClick={
          //           application.twitterUrl
          //             ? handleMenuOpen
          //             : () => handleOpen("Twitter")
          //         }
          //       >
          //         <TwitterIcon sx={{ color: "#1DA1F2" }} />
          //       </IconButton>
          //     </Tooltip>

          //     {/* Modal for Entering URL */}
          //     <Modal
          //       open={open}
          //       onClose={handleClose}
          //       aria-labelledby="modal-title"
          //       aria-describedby="modal-description"
          //     >
          //       <Box sx={style}>
          //         <Typography id="modal-title" variant="h6" component="h2">
          //           {platform} Profile
          //         </Typography>
          //         <TextField
          //           fullWidth
          //           label={`Enter Candidate's ${platform} Profile`}
          //           value={profileUrl}
          //           onChange={(e) => setProfileUrl(e.target.value)}
          //           variant="outlined"
          //           sx={{ marginTop: 2 }}
          //         />
          //         <Box
          //           sx={{
          //             display: "flex",
          //             justifyContent: "flex-end",
          //             marginTop: 3,
          //           }}
          //         >
          //           <Button onClick={handleClose} sx={{ marginRight: 1 }}>
          //             Cancel
          //           </Button>
          //           <Button
          //             variant="contained"
          //             color="primary"
          //             onClick={handleSave}
          //           >
          //             Save
          //           </Button>
          //         </Box>
          //       </Box>
          //     </Modal>
          //   </Box>