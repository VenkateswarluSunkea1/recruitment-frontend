import React, { useState, useRef } from 'react';
import './JobOpeningForm.css';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Navbar from './utils/Navbar';

const JobOpeningForm = () => {
  const [formData, setFormData] = useState({
    posting_title: '',
    contact_name: '',
    assigned_recruiter: '',
    target_date: '',
    job_status: 'In-progress',
    industry: '',
    salary: '',
    client_name: '',
    account_manager: 'Venkateswarlu Sunke',
    date_opened: '09/18/2024',
    job_type: 'Full time',
    work_experience: '',
    required_skills: '',
    addressInfo: {
      address_city: '',
      address_country: '',
      address_province: '',
      address_postal_code: ''
    },
    revenueDetails: {
      revenue_per_position: '',
      actual_revenue: '',
      expected_revenue: '',
      missed_revenue: ''
    },
    numberOfPositions: 1,
    job_description: ''
    // requirements: '',
    // benefits: ''
  });

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };
  const editor = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the name includes a dot to handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [remote, setRemote] = useState(false);

  const handleCheckboxChange = (event) => {
    setRemote(event.target.checked);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert salary and revenue fields to numbers
    const adjustedData = {
      ...formData,
      salary: parseFloat(formData.salary) || null,
      revenueDetails: {
        revenue_per_position: parseFloat(formData.revenueDetails.revenue_per_position) || null,
        actual_revenue: parseFloat(formData.revenueDetails.actual_revenue) || null,
        expected_revenue: parseFloat(formData.revenueDetails.expected_revenue) || null,
        missed_revenue: parseFloat(formData.revenueDetails.missed_revenue) || null,
      },
      target_date: formData.target_date ? new Date(formData.target_date).toISOString().split('T')[0] : null,
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/jobs/', adjustedData);
      console.log("Job posted:", response.data);
    } catch (error) {
      console.error("There was an error posting the job:", error.response.data);
    }
  };

  return (
    <>
    <Navbar />
    <form className="job-opening-form p-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Job Opening Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Posting Title *</label>
          <input
            type="text"
            name="posting_title"
            value={formData.posting_title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Contact Name</label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Assigned Recruiter(s)</label>
          <input
            type="text"
            name="assigned_recruiter"
            value={formData.assigned_recruiter}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Target Date *</label>
          <input
            type="date"
            name="target_date"
            value={formData.target_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div> 

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Job Opening Status</label>
          <select
            name="job_status"
            value={formData.job_status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="In-progress">In-progress</option>
            <option value="Closed">Closed</option>
            <option value="On-hold">On-hold</option>
          </select>
        </div>

                <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Industry *</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

                <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Client Name *</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Account Manager</label>
          <input
            type="text"
            name="account_manager"
            value={formData.account_manager}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Date Opened</label>
          <input
            type="text"
            name="date_opened"
            value={formData.date_opened}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Full time">Full time</option>
            <option value="Part time">Part time</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Work Experience</label>
          <select
            name="work_experience"
            value={formData.work_experience}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select experience level</option>
            <option value="0-1 years">0-1 years</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <input
            type="text"
            name="required_skills"
            value={formData.required_skills}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
        
  
      <h3 className="text-lg font-semibold mt-6 mb-2">Address Information</h3>
      <label className="inline-flex items-center mb-4">
        Remote
        <input
          type="checkbox"
          checked={remote}
          onChange={handleCheckboxChange}
          className="ml-2"
        />
      </label>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">address_city</label>
          <input
            type="text"
            name="addressInfo.address_city"
            value={formData.addressInfo.address_city}
            disabled={remote}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${remote ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">address_country</label>
          <input
            type="text"
            name="addressInfo.address_country"
            value={formData.addressInfo.address_country}
            disabled={remote}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${remote ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">address_province</label>
          <input
            type="text"
            name="addressInfo.address_province"
            value={formData.addressInfo.address_province}
            disabled={remote}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${remote ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input
            type="text"
            name="addressInfo.address_postal_code"
            value={formData.addressInfo.address_postal_code}
            disabled={remote}
            onChange={handleChange}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${remote ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
  
      <h3 className="text-lg font-semibold mt-6 mb-2">Forecast Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Revenue per Position</label>
          <input
            type="text"
            name="revenueDetails.revenue_per_position"
            value={formData.revenueDetails.revenue_per_position}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Actual Revenue</label>
          <input
            type="text"
            name="revenueDetails.actual_revenue"
            value={formData.revenueDetails.actual_revenue}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Expected Revenue</label>
          <input
            type="text"
            name="revenueDetails.expected_revenue"
            value={formData.revenueDetails.expected_revenue}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">Missed Revenue</label>
          <input
            type="text"
            name="revenueDetails.missed_revenue"
            value={formData.revenueDetails.missed_revenue}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="form-group mb-4">
          <label className="block text-sm font-medium text-gray-700">Number of Positions</label>
          <input
            type="number"
            name="numberOfPositions"
            value={formData.numberOfPositions}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
  
      
  
      <h3 className="text-lg font-semibold mt-6 mb-2">Description Information</h3>
      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Job Description</label>
        <JoditEditor
          ref={editor}
          value={formData.job_description}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setFormData(prevState => ({ ...prevState, job_description: newContent }))} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {}} // Optional: handle changes here if needed
        />
        {/* <textarea name="job_description" value={formData.job_description} onChange={handleChange}></textarea> */}
      </div>
  
      {/* <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Requirements</label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
  
      <div className="form-group mb-4">
        <label className="block text-sm font-medium text-gray-700">Benefits</label>
        <textarea
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div> */}
  
      <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500" type="submit">
        Save and Publish
      </button>
    </form>
    </>
  );
  
};

export default JobOpeningForm;
