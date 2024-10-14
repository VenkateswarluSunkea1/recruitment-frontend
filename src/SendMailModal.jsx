import React from "react";
import {
  IconButton,
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AssociateJobOpeningModal = ({ selectedRows }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleEmailClick = () => {
    navigate('/send-mail'); // Redirect to Send Mail page
  };

  return (
      <IconButton onClick={handleEmailClick} color="primary" aria-label="send-mail">
        <EmailIcon />
      </IconButton>
  );
};

export default AssociateJobOpeningModal;
