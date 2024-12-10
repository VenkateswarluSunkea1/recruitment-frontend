import React from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const HiringPipeline = ({ currentStage }) => {
  // Define stages and their associated colors
  const stages = [
    { label: 'screening', color: '#ff5722' },   // Orange for Screening
    { label: 'submissions', color: '#cddc39' }, // Lime for Submissions
    { label: 'interview', color: '#00bcd4' },   // Cyan for Interview
    { label: 'offered', color: '#8bc34a' },     // Light Green for Offered
    { label: 'hired', color: '#4caf50' },       // Green for Hired
    { label: 'rejected', color: '#f44336' },    // Red for Rejected
    { label: 'archived', color: '#9e9e9e' },    // Grey for Archived
  ];

  // Find the index of the current stage
  const currentIndex = stages.findIndex((stage) => stage.label === currentStage);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      {stages.map((stage, index) => (
        <Tooltip key={stage.label} title={stage.label} arrow>
          <span> {/* Add a wrapper span to fix the tooltip issue on disabled buttons */}
            <IconButton
              disabled // Disable interaction
              sx={{
                cursor: 'default',  // Ensure no pointer cursor
                padding: '4px',     // Adjust padding to fit inside the pipeline
              }}
            >
              {/* Color only the current stage, others will be gray */}
              <CircleIcon sx={{ color: index === currentIndex ? stage.color : '#e0e0e0' }} />
            </IconButton>
          </span>
        </Tooltip>
      ))}
    </Box>
  );
};

export default HiringPipeline;
