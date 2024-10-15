import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, Plus, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, TablePagination ,Select,MenuItem,Toolbar,Typography} from '@mui/material';
import Navbar from './utils/Navbar';
import AssociateJobOpeningModal from './AssociateJobOpeningModal';
import axiosInstance from './utils/axiosInstance';

// Custom CSS for a more professional look
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f4f6f8",
  },
  main: {
    flexGrow: 1,
    padding: "20px",
  },
  header: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxHeight: "400px",
    overflowY: "auto",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    textTransform: "none",
    boxShadow: "none",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  addButton: {
    marginLeft: "10px",
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

const FilterSidebar = ({
  filters,
  setFilters,
  setApplications,
  setTotalCount,
  page,
  rowsPerPage,
}) => {
  const [filterOptions, setFilterOptions] = useState(
    Object.keys(filters).reduce((acc, key) => {
      acc[key] = { open: false, option: "", value: "" };
      return acc;
    }, {})
  );
  const [selectedFilter, setSelectedFilter] = useState({}); // State for selected filter options and input values
  console.log(selectedFilter, "selectedFilter");
  const [clearFilters, setClearFilters] = useState(false); // To track if we are clearing filters

  console.log(filterOptions, "filterOptionseaeweeqeqwe");
  const handleCheckboxChange = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    setFilterOptions((prev) => ({
      ...prev,
      [key]: { ...prev[key], open: !prev[key].open },
    }));
  };

  const handleOptionChange = (key, option) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: { ...prev[key], option },
    }));
  };

  const handleInputChange = (key, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: { ...prev[key], value },
    }));
  };

  // const applyFilters = async () => {
  //   console.log(filterOptions, "filterOptionsklasdalsd");
  //   const activeFilters = Object.entries(filterOptions).reduce(
  //     (acc, [key, { open, option, value }]) => {
  //       if (open && value) {
  //         // Only include filters that are open and have a value
  //         acc[key] = JSON.stringify({ option, value });
  //       }
  //       return acc;
  //     },
  //     {}
  //   );
  //   console.log(activeFilters, "activeFiltersasdskbdfsdf");
  //   // Prepare the query parameters for the fetch request
  //   const queryParams = new URLSearchParams({
  //     ...activeFilters,
  //     page: 1, // Add pagination if needed
  //     limit: 5,
  //   });
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8000/api/resumes?${queryParams}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     // Update your state with the filtered candidates

  //     setApplications(data.data);
  //     setTotalCount(data.total_count);
  //   } catch (error) {
  //     console.error("Error fetching candidates:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (clearFilters) {
  //     applyFilters();
  //     setClearFilters(false);
  //   }
  // }, [filterOptions, clearFilters,applyFilters]);

  const applyFilters = useCallback(async () => {
    console.log(filterOptions, "filterOptions");

    const activeFilters = Object.entries(filterOptions).reduce(
      (acc, [key, { open, option, value }]) => {
        if (open && value) {
          // Only include filters that are open and have a value
          acc[key] = JSON.stringify({ option, value });
        }
        return acc;
      },
      {}
    );
    console.log(activeFilters, "activeFilters");

    // Prepare the query parameters for the fetch request
    const queryParams = new URLSearchParams({
      ...activeFilters,
      page: page+1, // Add pagination if needed
      limit: rowsPerPage,
    });
    console.log(queryParams, "queryParamsasdad");
    try {
      // const response = await fetch(
      //   `http://localhost:8000/api/resumes?${queryParams}`
      // );

      // const response = await fetch(
      //   `https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api/resumes?${queryParams}`, 
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'ngrok-skip-browser-warning': '69420',
      //     }
      //   }
      // );

      const response = await fetch(
        // `https://fa8b-2409-40f0-201d-a5aa-30df-2d3c-4b77-42d0.ngrok-free.app/api/resumes?${queryParams}`,
        `https://recruit.zapto.org/api/resumes?${queryParams}`,
        // `http://localhost:8000/api/resumes?${queryParams}`,
        {
          headers: {
            'Content-Type': 'application/json',
            // 'ngrok-skip-browser-warning': '69420',
          }
        }
      );

      // const response = await axiosInstance.get(`/resumes`, {
      //   params: {
      //     ...queryParams, // Assuming queryParams is an object
      //   },
      // });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // const data = await response.data;
      console.log(data, "datakabfkabfkasbd");
      // Update your state with the filtered candidates
      setApplications(data.data);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }, [filterOptions, setApplications, setTotalCount,page,rowsPerPage]); // Add filterOptions as a dependency

  useEffect(() => {
    console.log("endmhfbsdfbsdfbsd");
    if (clearFilters) {
      applyFilters();
      setClearFilters(false);
    }
  }, [filterOptions, clearFilters, applyFilters,page,rowsPerPage]);
  return (
    <div>
      <aside
        style={{
          width: "250px",
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          maxHeight: "550px",
          overflowY: "auto",
        }}
      >
        <h3 style={{ fontWeight: "600", marginBottom: "12px" }}>
          Filter Applications By
        </h3>
        {Object.entries(filters).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                id={key}
                checked={value}
                onChange={() => handleCheckboxChange(key)}
              />
              <label
                htmlFor={key}
                style={{ fontSize: "0.875rem", color: "#333" }}
              >
                {key}
              </label>
            </div>
            {/* Show the select box and input field when the checkbox is checked */}
            {filterOptions[key].open && (
              <div style={{ marginLeft: "32px", marginTop: "10px" }}>
                <Select
                  value={filterOptions[key].option}
                  onChange={(e) => handleOptionChange(key, e.target.value)}
                  displayEmpty
                  style={{ marginBottom: "10px", width: "100%" }}
                >
                  <MenuItem value="">
                    <em>Select Option</em>
                  </MenuItem>
                  <MenuItem value="is">is</MenuItem>
                  <MenuItem value="is_not">isn't</MenuItem>
                  <MenuItem value="contains">Contains</MenuItem>
                  <MenuItem value="not_contains">Does Not Contain</MenuItem>
                  <MenuItem value="starts_with">starts with</MenuItem>
                  <MenuItem value="ends_with">ends with</MenuItem>
                  <MenuItem value="is_empty">is empty</MenuItem>
                  <MenuItem value="is_not_empty">is not empty</MenuItem>
                </Select>
                <TextField
                  placeholder="Enter value"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={filterOptions[key].value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </aside>
      <div>
        <Button
          variant="contained"
          style={{ ...styles.button, ...styles.addButton }}
          onClick={() => applyFilters()}
          on
        >
          Apply Filter
        </Button>
        <Button
          // variant="contained"
          style={{ backgroundColor: "none" }}
          onClick={() => {
            setSelectedFilter({});
            setFilters({
              postingTitle: false,
              name: false,
              status: false,
              rating: false,
              pipeline: false,
              city: false,
              source: false,
              "skill set": false,
            });

            // Reset filterOptions to initial state and apply filters without any
            const clearedFilters = Object.keys(filters).reduce((acc, key) => {
              acc[key] = { open: false, option: "", value: "" }; // Resetting to initial state
              return acc;
            }, {});

            setFilterOptions(clearedFilters); // Update state with cleared filters
            setClearFilters(true);
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

// const ApplicationTable = ({ applications, onSort }) => (
//   <TableContainer component={Paper} style={styles.tableContainer}>
//     <Table>
//       <TableHead>
//         <TableRow>
//           {['RATING', 'APPLICATION NAME', 'CITY', 'CANDIDATE STAGE', 'APPLICATION ID', 'POSTING TITLE', 'SOURCE', 'CANDIDATE OWNER'].map((header) => (
//             <TableCell key={header} onClick={() => onSort(header.toLowerCase())} style={styles.tableHeader}>
//               {header} <ChevronDown className="inline h-4 w-4" />
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {applications.map((app) => (
//           <TableRow key={app.id} style={styles.tableRow}>
//             <TableCell>{'\u2B50'.repeat(app.rating)}</TableCell>
//             <TableCell>{app.name}</TableCell>
//             <TableCell>{app.pipeline}</TableCell>
//             <TableCell>{app.status}</TableCell>
//             <TableCell>{app.id}</TableCell>
//             <TableCell>{app.postingTitle}</TableCell>
//             <TableCell>{app.source}</TableCell>
//             <TableCell>{app.candidateOwner}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

const ApplicationTable = ({ applications, onSort ,selectedRows,setSelectedRows,onClick}) => {

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

  console.log(selectedRows,'selectedRowswerwewerwer');

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
              <TableCell key={header} onClick={() => onSort(header.toLowerCase())} style={styles.tableHeader}>
                {header} <ChevronDown className="inline h-4 w-4" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} style={styles.tableRow} selected={selectedRows.includes(app.id)} onClick={() => onClick(app)}>
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
  const [page, setPage] = useState(0); // Track current page (0-indexed)
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of records per page
  const [totalCount, setTotalCount] = useState(0); // Track total number of records
  const [filters, setFilters] = useState({
    postingTitle: false,
    name: false,
    status: false,
    rating: false,
    pipeline: false,
    city: false,
    source: false,
    "skill set": false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [showDropdown, setShowDropdown] = useState(false); // State to handle dropdown visibility
  const navigate = useNavigate();

  // Fetch applications from the backend with pagination
  const fetchApplications = async (page = 0, limit = 10) => {
    try {
      // const response = await fetch(
      //   `http://localhost:8000/api/resumes?page=${page + 1}&limit=${limit}`
      // );

      const response = await axiosInstance.get("/resumes", {
        params: {
          page: page + 1,
          limit: limit,
        },
      });

      // const data = await response.json();
      const data = await response.data;
      setApplications(data.data);
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = useMemo(() => {
    let sortableItems = Array.isArray(applications) ? [...applications] : [];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [applications, sortConfig]);

  const filteredApplications = sortedApplications.filter((app) => {
    return Object.entries(filters).some(([key, value]) => {
      const appValue = app[key];
      return (
        !value &&
        appValue?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (path) => {
    navigate(path);
    setShowDropdown(false);
  };
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows

  const [selectedApplication, setSelectedApplication] = useState(null);
  console.log(selectedApplication, "selectedApplication");
  const handleRowClick = (app) => {
    setSelectedApplication(app); // Set the clicked application to be displayed
    navigate("/application/overview", { state: { application: app } }); // Pass app data via state
  };
  return (
    <div style={styles.container}>
      <Navbar />

      {/* Conditionally render the top action bar when rows are selected */}
      {selectedRows.length > 0 && (
        <Toolbar
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="subtitle1" sx={{ flex: "1 1 100%" }}>
            {selectedRows.length} Candidate{selectedRows.length > 1 ? "s" : ""}{" "}
            selected
          </Typography>{" "}
          <Button
            onClick={() => {
              setSelectedRows([]);
            }}
            variant="text"
          >
            clear
          </Button>
          <AssociateJobOpeningModal selectedRows={selectedRows}/>
        </Toolbar>
      )}

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
                <Button
                  fullWidth
                  onClick={() => handleSelect("/import/resume")}
                >
                  Import Resume
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleSelect("/import/spreadsheet")}
                >
                  Import Spreadsheet
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleSelect("/create/candidate")}
                >
                  Create Candidate
                </Button>
              </div>
            )}
          </div>

          <Button variant="text" className="ml-2">
            <MoreVertical />
          </Button>
        </div>

        <div className="flex space-x-6">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            setApplications={setApplications}
            setTotalCount={setTotalCount}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          <section className="flex-grow">
            <ApplicationTable applications={filteredApplications} onSort={handleSort} onClick={handleRowClick}selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
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
