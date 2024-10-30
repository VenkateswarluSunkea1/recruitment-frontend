import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Checkbox } from '@mui/material';
import axiosInstance from './utils/axiosInstance';

// Custom CSS for a more professional look
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "20px",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: "0.875rem",
    color: "#555",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
};

const ApplicationTable = ({ applications, selectedRows, setSelectedRows }) => {
  // Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  // Handle select all rows
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = applications.map((app) => app.id);
      setSelectedRows(allRowIds); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const isAllSelected = selectedRows.length === applications.length;

  return (
    <TableContainer component={Paper} style={styles.tableContainer}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {/* Checkbox for Select All */}
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < applications.length}
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </TableCell>
            {/* Table Headers */}
            {['RATING', 'APPLICATION NAME', 'CITY', 'CANDIDATE STAGE', 'APPLICATION ID', 'POSTING TITLE', 'SOURCE', 'CANDIDATE OWNER'].map((header) => (
              <TableCell key={header} style={styles.tableHeader}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} style={styles.tableRow}>
              {/* Checkbox for Row Selection */}
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.includes(app.id)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => handleRowSelect(app.id)}
                />
              </TableCell>
              <TableCell>{'\u2B50'.repeat(app.rating)}</TableCell>
              <TableCell>{app.name}</TableCell>
              <TableCell>{app.pipeline}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.id}</TableCell>
              <TableCell>{app.postingTitle}</TableCell>
              <TableCell>{app.source}</TableCell>
              <TableCell>{app.candidateOwner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows

  // Fetch applications from the backend
  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get("/resumes");
      const data = await response.data;
      setApplications(data.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div style={styles.container}>
      <ApplicationTable applications={applications} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
    </div>
  );
};

export default ApplicationManagement;