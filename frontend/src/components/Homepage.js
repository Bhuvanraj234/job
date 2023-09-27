import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Homepage.css';

function Homepage() {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/joblistings')
      .then((response) => {
        setJobListings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job listings:', error);
      });
  }, []);

  return (
    <div> 
    <div className="top-section">
      <h1 className="job-heading">Job Listings</h1>
      <Link to="/addjob" className="add-job-button">Add Job</Link>
      </div> 
      <ul className="job-listings">
        {jobListings.map((job) => (
          <li key={job._id}>
            <Link to={`/jobdetails/${job._id}`}>
            <h2><p>{job.title}</p></h2>
            <p><strong>Location: </strong> {job.location}</p>
            <p><strong>Employment type : </strong>{job.employmentType}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
