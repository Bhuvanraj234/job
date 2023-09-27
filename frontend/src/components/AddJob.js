import React, { useState } from 'react';
import axios from 'axios';
import './styles/AddJob.css';
import { useNavigate } from 'react-router-dom';

function AddJob() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    applicationDeadline: '', 
    salary: '', 
    location: '', 
    employmentType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/addjob', formData)
      .then((response) => {
        console.log('Job listing added successfully');
        Navigate('/');
      })
      .catch((error) => {
        console.error('Error adding job listing:', error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
      <h2 className="form-heading">Add Job Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Title:</label>
          <input className="form-input" type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Company Name:</label>
          <input className="form-input" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Description:</label>
          <textarea className="form-input" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Application Deadline:</label>
          <input className="form-input" type="text" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleInputChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Salary:</label>
          <input className="form-input" type="text" name="salary" value={formData.salary} onChange={handleInputChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Location:</label>
          <input className="form-input" type="text" name="location" value={formData.location} onChange={handleInputChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Employment Type:</label>
          <select className="form-select" name="employmentType" value={formData.employmentType} onChange={handleInputChange} required>
            <option value="">Select an option</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button className="form-submit-button" type="submit">Add Job</button>
      </form>
      </div>
    </div>
  );
}

export default AddJob;

