import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/JobDetails.css';

function JobDetails() {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobdetails/${jobId}`)
      .then((response) => {
        setJobDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });
  }, [jobId]);

  return (
    <div className="job-details-container">
      <h2 className="job-title">Job Details</h2>
      <h3>Title: {jobDetails.title}</h3>
      <p className="job-detail"><strong>Company Name:</strong> {jobDetails.companyName}</p>
      <p className="job-detail"><strong>Description:</strong> {jobDetails.description}</p>
      <p className="job-detail"><strong>Application Deadline:</strong> {jobDetails.applicationDeadline}</p>
      <p className="job-detail"><strong>Salary:</strong> {jobDetails.salary}</p>
      <p className="job-detail"><strong>Location:</strong> {jobDetails.location}</p>
      <p className="job-detail"><strong>Employment Type:</strong> {jobDetails.employmentType}</p>
      <Link to={`/applyjob/${jobId}`} className="apply-button">Apply for this Job</Link>
    </div>
  );
}

export default JobDetails;
