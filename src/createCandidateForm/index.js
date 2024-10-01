import React, { useState } from 'react';
import './styles.css';
import Navbar from '../utils/Navbar';

const CreateCandidateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    fax: '',
    website: '',
    secondaryEmail: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
    experienceInYears: '',
    qualification: '',
    currentJobTitle: '',
    currentEmployer: '',
    expectedSalary: '',
    currentSalary: '',
    linkedin: '',
    facebook: '',
    twitter: '',
    candidateStatus: '',
    source: '',
    candidateOwner: '',
    education: [
      { degree: '', institution: '', yearOfCompletion: '' },
    ]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: '', institution: '', yearOfCompletion: '' }]
    });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log(formData);
  };

  return (
    <>
    <Navbar />
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Basic Info</h2>
        <div className="form-section">
          <div className="form-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email & Phone Section */}
        <div className="form-section">
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Secondary Email</label>
            <input
              type="email"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-field">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Professional Details */}
        <h2>Professional Details</h2>
        <div className="form-section">
          <div className="form-field">
            <label>Experience in Years</label>
            <input
              type="text"
              name="experienceInYears"
              value={formData.experienceInYears}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Highest Qualification Held</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-field">
            <label>Current Job Title</label>
            <input
              type="text"
              name="currentJobTitle"
              value={formData.currentJobTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Current Employer</label>
            <input
              type="text"
              name="currentEmployer"
              value={formData.currentEmployer}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Social Links */}
        <h2>Social Links</h2>
        <div className="form-section">
          <div className="form-field">
            <label>LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Facebook</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Other Info */}
        <h2>Other Info</h2>
        <div className="form-section">
          <div className="form-field">
            <label>Candidate Status</label>
            <input
              type="text"
              name="candidateStatus"
              value={formData.candidateStatus}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Educational Details */}
        <h2>Educational Details</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="form-section" style={{display:'flex'}}>
            <div className="form-field">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Year of Completion</label>
              <input
                type="text"
                value={edu.yearOfCompletion}
                onChange={(e) => handleEducationChange(index, 'yearOfCompletion', e.target.value)}
              />
            </div>

            <button type="button" onClick={() => removeEducation(index)}>
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addEducation}>Add More Education</button>

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default CreateCandidateForm;
