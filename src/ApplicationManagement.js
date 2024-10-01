import React, { useState, useEffect ,useMemo} from 'react';
import { AlertCircle, Bell, Menu, MoreVertical, Plus, Search, Settings, ChevronDown, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simulated API call
// const fetchApplications = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { id: 1, name: 'John Doe', status: 'New', rating: 4, pipeline: 'Interview', postingTitle: 'Software Engineer' },
//         { id: 2, name: 'Jane Smith', status: 'In Review', rating: 3, pipeline: 'Screening', postingTitle: 'Product Manager' },
//         { id: 3, name: 'Bob Johnson', status: 'Rejected', rating: 2, pipeline: 'Closed', postingTitle: 'Data Analyst' },
//       ]);
//     }, 1000);
//   });
// };

// const Navbar = () => (
//   <nav className="bg-blue-600 text-white p-4">
//     <div className="flex items-center justify-between">
//       <div className="flex items-center space-x-4">
//         <Menu className="h-6 w-6" />
//         <h1 className="text-xl font-bold">Recruit</h1>
//       </div>
//       <div className="hidden md:flex space-x-4">
//         {['Home', 'Job Openings', 'Candidates', 'Interviews', 'Clients', 'Contacts', 'Campaigns'].map((item) => (
//           <button key={item} className="hover:bg-blue-700 px-3 py-2 rounded">{item}</button>
//         ))}
//       </div>
//       <div className="flex items-center space-x-2">
//         {[Plus, Search, Bell, Settings].map((Icon, index) => (
//           <button key={index} className="hover:bg-blue-700 p-2 rounded">
//             <Icon className="h-4 w-4" />
//           </button>
//         ))}
//       </div>
//     </div>
//   </nav>
// );

const Navbar = () => {
  const [jobOpeningsDropdown, setJobOpeningsDropdown] = useState(false); // State to manage dropdown visibility
  const navigate = useNavigate();

  const toggleJobOpeningsDropdown = () => {
    setJobOpeningsDropdown(!jobOpeningsDropdown);
  };

  const handleRedirect = (path) => {
    navigate(path);
    setJobOpeningsDropdown(false); // Close dropdown after redirect
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6" />
          <h1 className="text-xl font-bold">Recruit</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <button
            onClick={toggleJobOpeningsDropdown} // Toggle dropdown on button click
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            Job Openings
          </button>
          <button
            onClick={() => handleRedirect('/job-list')}
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            Job list
          </button>
          <button
            onClick={toggleJobOpeningsDropdown} // Toggle dropdown on button click
            className="hover:bg-blue-700 px-3 py-2 rounded"
          >
            Candidates
          </button>
          {jobOpeningsDropdown && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={() => handleRedirect('/create/job-opening')}
              >
                Create Job Opening
              </button>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={() => handleRedirect('/import/job-openings')}
              >
                Import Job Openings
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {[Plus, Search, Bell, Settings].map((Icon, index) => (
            <button key={index} className="hover:bg-blue-700 p-2 rounded">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const FilterSidebar = ({ filters, setFilters }) => (
  <aside className="w-64 bg-gray-100 p-4">
    <h3 className="font-semibold mb-2">FILTER APPLICATIONS BY</h3>
    {Object.entries(filters).map(([key, value]) => (
      <div key={key} className="flex items-center mb-2">
        <input
          type="checkbox"
          id={key}
          checked={value}
          onChange={() => setFilters(prev => ({ ...prev, [key]: !prev[key] }))}
          className="mr-2"
        />
        <label htmlFor={key} className="text-sm">{key}</label>
      </div>
    ))}
  </aside>
);

const ApplicationTable = ({ applications, onSort }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        {['RATING', 'APPLICATION NAME', 'CITY', 'CANDIDATE STAGE', 'APPLICATION ID', 'POSTING TITLE','SOURCE','CANDIDATE OWNER'].map((header) => (
          <th key={header} className="border p-2 text-left cursor-pointer" onClick={() => onSort(header.toLowerCase())}>
            {header} <ChevronDown className="inline h-4 w-4" />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {applications.map((app) => (
        <tr key={app.id} className="hover:bg-gray-50">
          <td className="border p-2">{'\u2B50'.repeat(app.rating)}</td>
          <td className="border p-2">{app.name}</td>
          <td className="border p-2">{app.pipeline}</td>
          <td className="border p-2">{app.status}</td>
          <td className="border p-2">{app.id}</td>
          <td className="border p-2">{app.postingTitle}</td>
          <td className="border p-2">{app.postingTitle}</td>
          <td className="border p-2">{app.postingTitle}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [filters, setFilters] = useState({
    'postingTitle': false,
    'name': false,
    'status': false,
    'rating': false,
    'pipeline': false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/resumes/');  // Replace with your actual backend endpoint
      // if (!response.ok) {
      //   throw new Error('Failed to fetch applications');
      // }
      console.log(response,'responsefaeaa');
      const data = await response.json();
      console.log(data,'dataewewerwrwer');
      return data.data;  // Assuming your backend returns a list of applications
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };
  
  useEffect(() => {
    fetchApplications().then(setApplications);
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = useMemo(() => {
    let sortableItems = Array.isArray(applications) ? [...applications] : [];
    console.log(sortableItems,'sortableItemssdfsfewfef');
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
  console.log(sortedApplications,'sortedApplicationsadfadas');

  const filteredApplications = sortedApplications.filter(app => {
    return Object.entries(filters).some(([key, value]) => {
      console.log(app,'dfgststwbst');
      const appValue = app[key]; // No need to lowercase if not required
      console.log(key, value,'sdfsdfsdf',appValue); // Check each filter key and value

      return !value && appValue?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
  console.log(filteredApplications,'filteredApplicationsafad');

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (path) => {
    navigate(path); // Redirect to the selected path
    setShowDropdown(false); // Close the dropdown after selection
  };
  const navigate = useNavigate();
  console.log('djdjjiwoffnsdsdsdoisdsd');
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">APPLICATIONS</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search applications..."
            className="border p-2 rounded flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> Add
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleSelect('/import/resume')}
                >
                  Import Resume
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleSelect('/import/spreadsheet')}
                >
                  Import Spreadsheet
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleSelect('/create/candidate')}
                >
                  Create Candidate
                </button>
              </div>
            )}
          </div>
          
          <button className="text-gray-600 p-2 rounded hover:bg-gray-100 ml-2">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
        <div className="flex space-x-6">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <section className="flex-grow">
            <ApplicationTable applications={filteredApplications} onSort={handleSort} />
            <div className="flex justify-end mt-4">
              <select className="border p-2 rounded">
                <option value="10">10 Records per page</option>
                <option value="20">20 Records per page</option>
                <option value="50">50 Records per page</option>
              </select>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ApplicationManagement;