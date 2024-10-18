// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { AttachFile, MoreVert } from "@mui/icons-material";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

// const AttachmentsTable = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="attachments table">
//         <TableHead>
//           <TableRow>
//             <TableCell>File Name</TableCell>
//             <TableCell>Attached By</TableCell>
//             <TableCell>Date Created</TableCell>
//             <TableCell>Modified By</TableCell>
//             <TableCell>Date Modified</TableCell>
//             <TableCell>Size</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell align="right">
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<AttachFile />}
//                   style={{ marginRight: "10px" }}
//                 >
//                   Attach
//                 </Button>
//                 <IconButton onClick={handleClick}>
//                   <MoreVert />
//                 </IconButton>
//               </div>
//               <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//                 <MenuItem onClick={handleClose}>All</MenuItem>
//                 <MenuItem onClick={handleClose}>Resumes</MenuItem>
//                 <MenuItem onClick={handleClose}>Documents</MenuItem>
//               </Menu>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow>
//             <TableCell>
//               <PictureAsPdfIcon
//                 style={{ marginRight: "5px", verticalAlign: "middle" }}
//               />
//               <a href="#!" style={{ textDecoration: "none", color: "red" }}>
//                 sunkeVenkateswarlu_resume.pdf
//               </a>
//             </TableCell>
//             <TableCell>Venkateswarlu Sunke</TableCell>
//             <TableCell>09/17/2024</TableCell>
//             <TableCell>Venkateswarlu Sunke</TableCell>
//             <TableCell>09/17/2024</TableCell>
//             <TableCell>200.16 KB</TableCell>
//             <TableCell>
//               <Button variant="outlined" size="small" color="primary">
//                 Resume
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default AttachmentsTable;

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AttachFile,
  MoreVert,
  PictureAsPdf as PictureAsPdfIcon,
} from "@mui/icons-material";
import axiosInstance from "./utils/axiosInstance";

const AttachmentsTable = ({ resumeId, attachments, setAttachments }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [attachments, setAttachments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const open = Boolean(anchorEl);

  // Handle opening the dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle file selection from local device
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload to backend
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("filename", selectedFile.name);
    formData.append("uploaded_by", "John Doe"); // Replace with the actual uploader name
    formData.append("resume_id", resumeId);
    formData.append("attachment_type", "resume"); // You can change this based on your needs

    try {
      const response = await axiosInstance.post(
        "/upload_attachment/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response, "response");
      // After successful upload, fetch updated list of attachments
      fetchAttachments();
      setSelectedFile(null);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  // Fetch attachments for a given resume
  const fetchAttachments = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/resumes/${resumeId}/attachments/`
      );
      setAttachments(response.data);
    } catch (error) {
      console.error("Error fetching attachments:", error);
    }
  }, [resumeId,setAttachments]);
  // const fetchAttachments = async () => {
  //   try {
  //     const response = await axiosInstance.get(
  //       `/resumes/${resumeId}/attachments/`
  //     );
  //     setAttachments(response.data);
  //   } catch (error) {
  //     console.error("Error fetching attachments:", error);
  //   }
  // };

  // Fetch attachments when the component mounts
  useEffect(() => {
    if (resumeId) {
      fetchAttachments();
    }
    // Only resumeId is needed as a dependency
  }, [resumeId, fetchAttachments]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="attachments table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Attached By</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Modified By</TableCell>
            <TableCell>Date Modified</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AttachFile />}
                    style={{ marginRight: "10px" }}
                    component="span"
                  >
                    Attach
                  </Button>
                </label>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleFileUpload}
                  disabled={!selectedFile}
                >
                  Upload
                </Button>
                <IconButton onClick={handleClick}>
                  <MoreVert />
                </IconButton>
              </div>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>All</MenuItem>
                <MenuItem onClick={handleClose}>Resumes</MenuItem>
                <MenuItem onClick={handleClose}>Documents</MenuItem>
              </Menu>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attachments.map((attachment) => (
            <TableRow key={attachment.id}>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <PictureAsPdfIcon
                    style={{ marginRight: "5px", verticalAlign: "middle" }}
                  />
                  <a
                    href={`http://127.0.0.1:3000/api/attachments/${attachment.filename}`} // Use full URL if necessary
                    style={{ textDecoration: "none", color: "red" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attachment.filename}
                  </a>
                </div>
              </TableCell>
              <TableCell>{attachment.uploaded_by}</TableCell>
              <TableCell>{attachment.upload_date}</TableCell>
              <TableCell>{attachment.uploaded_by}</TableCell>
              <TableCell>{attachment.upload_date}</TableCell>
              <TableCell>{attachment.file_size_kb} KB</TableCell>
              <TableCell>
                <Button variant="outlined" size="small" color="primary">
                  {attachment.attachment_type}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttachmentsTable;
