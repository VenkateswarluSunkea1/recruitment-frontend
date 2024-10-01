import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Plus, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, TablePagination } from '@mui/material';
import Navbar from './utils/Navbar';

// Custom CSS for a more professional look
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f4f6f8',
  },
  main: {
    flexGrow: 1,
    padding: '20px',
  },
  header: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    textTransform: 'none',
    boxShadow: 'none',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
  addButton: {
    marginLeft: '10px',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
    color: '#555',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
};

const FilterSidebar = ({ filters, setFilters }) => (
  <aside style={styles.sidebar}>
    <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>Filter Applications By</h3>
    {Object.entries(filters).map(([key, value]) => (
      <div key={key} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <Checkbox
          id={key}
          checked={value}
          onChange={() => setFilters(prev => ({ ...prev, [key]: !prev[key] }))}
        />
        <label htmlFor={key} style={{ fontSize: '0.875rem', color: '#333' }}>{key}</label>
      </div>
    ))}
  </aside>
);

const ApplicationTable = ({ applications, onSort }) => (
  <TableContainer component={Paper} style={styles.tableContainer}>
    <Table>
      <TableHead>
        <TableRow>
          {['RATING', 'APPLICATION NAME', 'CITY', 'CANDIDATE STAGE', 'APPLICATION ID', 'POSTING TITLE', 'SOURCE', 'CANDIDATE OWNER'].map((header) => (
            <TableCell key={header} onClick={() => onSort(header.toLowerCase())} style={styles.tableHeader}>
              {header} <ChevronDown className="inline h-4 w-4" />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id} style={styles.tableRow}>
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

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0); // Track current page (0-indexed)
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of records per page
  const [totalCount, setTotalCount] = useState(0); // Track total number of records
  const [filters, setFilters] = useState({
    'postingTitle': false,
    'name': false,
    'status': false,
    'rating': false,
    'pipeline': false,
    'city': false,
    'source': false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showDropdown, setShowDropdown] = useState(false); // State to handle dropdown visibility
  const navigate = useNavigate();

  // Fetch applications from the backend with pagination
  const fetchApplications = async (page = 0, limit = 10) => {
    try {
      const response = await fetch(`http://localhost:8000/api/resumes?page=${page + 1}&limit=${limit}`); // Use 1-indexed for the API
      const data = await response.json();
      setApplications(data.data);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = useMemo(() => {
    let sortableItems = Array.isArray(applications) ? [...applications] : [];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [applications, sortConfig]);

  const filteredApplications = sortedApplications.filter(app => {
    return Object.entries(filters).some(([key, value]) => {
      const appValue = app[key];
      return !value && appValue?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.main}>
        <h2 style={styles.header}>Applications</h2>
        <div style={styles.searchContainer}>
          <TextField
            variant="outlined"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            style={{ flex: 1 }}
          />
          <div className="relative ml-2">
            <Button
              variant="contained"
              style={{ ...styles.button, ...styles.addButton }}
              startIcon={<Plus />}
              onClick={handleDropdownToggle}
            >
              Add
            </Button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                <Button fullWidth onClick={() => handleSelect('/import/resume')}>Import Resume</Button>
                <Button fullWidth onClick={() => handleSelect('/import/spreadsheet')}>Import Spreadsheet</Button>
                <Button fullWidth onClick={() => handleSelect('/create/candidate')}>Create Candidate</Button>
              </div>
            )}
          </div>

          <Button variant="text" className="ml-2">
            <MoreVertical />
          </Button>
        </div>

        <div className="flex space-x-6">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <section className="flex-grow">
            <ApplicationTable applications={filteredApplications} onSort={handleSort} />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ApplicationManagement;
