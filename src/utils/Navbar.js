import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Bell, Menu, MoreVertical, Plus, Search, Settings, ChevronDown, Filter } from 'lucide-react';

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
              onClick={() => handleRedirect('/')} // Toggle dropdown on button click
              className="hover:bg-blue-700 px-3 py-2 rounded"
            >
              Home
            </button>
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
  export default Navbar;