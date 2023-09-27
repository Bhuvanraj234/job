import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/ApplicationForm.css';
import '../App.css';

function ApplicationForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    pincode: '',
    experience: '',
    resume: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/applyjob/${jobId}`, formData)
      .then((response) => {
        console.log('Application submitted successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error submitting application:', error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Application Form</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-field">
      <label className="form-label">First Name:</label>
      <input type="text" className="form-input" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
    
      <label className="form-label">Last Name:</label>
      <input type="text" className="form-input" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
    
      <label className="form-label">Email:</label>
      <input type="email" className="form-input" name="email" value={formData.email} onChange={handleInputChange} required />
    
      <label className="form-label">Phone Number:</label>
      <input type="tel" className="form-input" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
   
      <label className="form-label">Address:</label>
      <input type="text" className="form-input" name="address" value={formData.address} onChange={handleInputChange} required />
    
      <label className="form-label">Pincode:</label>
      <input type="text" className="form-input" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
    
      <label className="form-label">Experience (in years):</label>
      <input type="number" className="form-input" name="experience" value={formData.experience} onChange={handleInputChange} required />
    
      <label className="form-label">Resume:</label>
      <input type="text" className="form-input" name="resume" value={formData.resume} onChange={handleInputChange} required />
      
      </div>
      <button className="form-submit-button" type="submit">Apply</button>
  </form>
</div>

  );
}

export default ApplicationForm;
