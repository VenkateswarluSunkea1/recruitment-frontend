import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Chip, Box, Divider } from '@mui/material';

const styles = {
  cardContainer: {
    margin: '20px',
    padding: '20px',
    borderRadius: '10px',
  },
  stagesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  activeStage: {
    backgroundColor: '#FF9900',
    color: '#fff',
  },
  businessCard: {
    marginTop: '20px',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
  },
  businessCardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
  },
};

const ApplicationOverview = () => {
  const location = useLocation();
  const { application } = location.state || {};

  if (!application) return <Typography>Select an application to view details</Typography>;

  return (
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
        {['New', 'In Review', 'Available', 'Engaged', 'Offered', 'Hired', 'Rejected'].map(
          (stage, index) => (
            <Chip
              key={index}
              label={stage}
              sx={{
                ...(stage === 'Engaged' ? styles.activeStage : {}),
                padding: '10px',
                minWidth: '70px',
                textAlign: 'center',
              }}
            />
          )
        )}
      </Box>

      {/* Business Card */}
      <Card sx={styles.businessCard}>
        <CardContent>
          <Typography variant="h6" component="div">
            Business Card
          </Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Origin:</strong> Sourced</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Mobile:</strong> {application.mobile || '--'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Email:</strong> {application.email || '--'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Secondary Email:</strong> {application.secondaryEmail || '--'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Experience in Years:</strong> {application.experience || '--'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Current Job Title:</strong> {application.currentJobTitle || '--'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Current Employer:</strong> {application.currentEmployer || '--'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Skill Set:</strong> {application.skillSet || '--'}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Other Details */}
      <Card sx={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Other Details
          </Typography>
          <Divider sx={{ marginBottom: '10px' }} />
          <Typography><strong>ID:</strong> {application.id}</Typography>
          <Typography><strong>Status:</strong> {application.status}</Typography>
          <Typography><strong>Pipeline:</strong> {application.pipeline}</Typography>
          <Typography><strong>Posting Title:</strong> {application.postingTitle}</Typography>
          <Typography><strong>Source:</strong> {application.source}</Typography>
          <Typography><strong>Candidate Owner:</strong> {application.candidateOwner}</Typography>
        </CardContent>
      </Card>
    </Card>
  );
};

export default ApplicationOverview;
