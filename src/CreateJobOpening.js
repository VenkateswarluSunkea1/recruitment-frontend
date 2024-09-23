import React, { useState } from 'react';
import './JobOpeningForm.css';

const JobOpeningForm = () => {
  const [formData, setFormData] = useState({
    postingTitle: '',
    contactName: '',
    assignedRecruiter: '',
    targetDate: '',
    jobStatus: 'In-progress',
    industry: '',
    salary: '',
    clientName: '',
    accountManager: 'Venkateswarlu Sunke',
    dateOpened: '09/18/2024',
    jobType: 'Full time',
    workExperience: '',
    requiredSkills: '',
    addressInfo: {
      city: '',
      country: '',
      province: '',
      postalCode: ''
    },
    revenueDetails: {
      revenuePerPosition: '',
      actualRevenue: '',
      expectedRevenue: '',
      missedRevenue: ''
    },
    numberOfPositions: 1,
    jobDescription: '',
    requirements: '',
    benefits: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="job-opening-form" onSubmit={handleSubmit}>
      <h2>Job Opening Information</h2>
      <div className="form-group">
        <label>Posting Title *</label>
        <input type="text" name="postingTitle" value={formData.postingTitle} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Contact Name</label>
        <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Assigned Recruiter(s)</label>
        <input type="text" name="assignedRecruiter" value={formData.assignedRecruiter} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Target Date *</label>
        <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Job Opening Status</label>
        <select name="jobStatus" value={formData.jobStatus} onChange={handleChange}>
          <option value="In-progress">In-progress</option>
          <option value="Closed">Closed</option>
          <option value="On-hold">On-hold</option>
        </select>
      </div>

      <div className="form-group">
        <label>Industry *</label>
        <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Client Name *</label>
        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Account Manager</label>
        <input type="text" name="accountManager" value={formData.accountManager} readOnly />
      </div>

      <div className="form-group">
        <label>Date Opened</label>
        <input type="text" name="dateOpened" value={formData.dateOpened} readOnly />
      </div>

      <div className="form-group">
        <label>Job Type</label>
        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
        </select>
      </div>

      <div className="form-group">
        <label>Work Experience</label>
        <input type="text" name="workExperience" value={formData.workExperience} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Required Skills</label>
        <input type="text" name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} />
      </div>

      <h3>Address Information</h3>
      <div className="form-group">
        <label>City</label>
        <input type="text" name="city" value={formData.addressInfo.city} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Country</label>
        <input type="text" name="country" value={formData.addressInfo.country} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Province</label>
        <input type="text" name="province" value={formData.addressInfo.province} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Postal Code</label>
        <input type="text" name="postalCode" value={formData.addressInfo.postalCode} onChange={handleChange} />
      </div>

      <h3>Forecast Details</h3>
      <div className="form-group">
        <label>Revenue per Position</label>
        <input type="text" name="revenuePerPosition" value={formData.revenueDetails.revenuePerPosition} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Actual Revenue</label>
        <input type="text" name="actualRevenue" value={formData.revenueDetails.actualRevenue} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Expected Revenue</label>
        <input type="text" name="expectedRevenue" value={formData.revenueDetails.expectedRevenue} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Missed Revenue</label>
        <input type="text" name="missedRevenue" value={formData.revenueDetails.missedRevenue} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Number of Positions</label>
        <input type="number" name="numberOfPositions" value={formData.numberOfPositions} onChange={handleChange} />
      </div>

      <h3>Description Information</h3>
      <div className="form-group">
        <label>Job Description</label>
        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label>Requirements</label>
        <textarea name="requirements" value={formData.requirements} onChange={handleChange}></textarea>
      </div>

      <div className="form-group">
        <label>Benefits</label>
        <textarea name="benefits" value={formData.benefits} onChange={handleChange}></textarea>
      </div>

      <button className="submit-button" type="submit">Save and Publish</button>
    </form>
  );
};

export default JobOpeningForm;
