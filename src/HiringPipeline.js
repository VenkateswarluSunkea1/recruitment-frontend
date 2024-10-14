import React from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const HiringPipeline = ({ currentStage }) => {
  // Define stages and their associated colors
  const stages = [
    { label: 'Screening', color: '#ff5722' },   // Orange for Screening
    { label: 'Submissions', color: '#cddc39' }, // Lime for Submissions
    { label: 'Interview', color: '#00bcd4' },   // Cyan for Interview
    { label: 'Offered', color: '#8bc34a' },     // Light Green for Offered
    { label: 'Hired', color: '#4caf50' },       // Green for Hired
    { label: 'Rejected', color: '#f44336' },    // Red for Rejected
    { label: 'Archived', color: '#9e9e9e' },    // Grey for Archived
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
