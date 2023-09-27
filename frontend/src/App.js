import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import JobDetails from './components/JobDetails';
import ApplicationForm from './components/ApplicationForm';
import AddJob from './components/AddJob';

function App() {
 
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/jobdetails/:jobId" element={<JobDetails />} />
          <Route path="/applyjob/:jobId" element={<ApplicationForm />} />
          <Route path="/addjob" element={<AddJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
