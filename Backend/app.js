const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://bhuvanraj:bhuvanraj@cluster.set51ms.mongodb.net/JobApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});


const jobListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  applicationDeadline: String,
  salary: String,
  location: String,
  employmentType: String,
});

const JobListing = mongoose.model('JobListing', jobListingSchema);

const applicationSchema = new mongoose.Schema({
  jobId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address: String,
  pincode: String,
  experience: String,
  resume: String,
});


const Application = mongoose.model('Application', applicationSchema);

// API routes for job listings, job details, job applications, and posting new job listings
app.get('/api/joblistings', async (req, res) => {
  try {
    const jobListings = await JobListing.find().exec();
    res.json(jobListings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/jobdetails/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const jobDetails = await JobListing.findById(jobId).exec();
    if (!jobDetails) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(jobDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/applyjob/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    pincode,
    experience,
    resume,
  } = req.body;

  try {
    const jobListing = await JobListing.findById(jobId).exec();
    if (!jobListing) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const application = new Application({
      jobId,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      pincode,
      experience,
      resume,
    });


    await application.save();
    return res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/addjob', async (req, res) => {
  const { title, description, applicationDeadline, salary, location, employmentType } = req.body;

  try {
    const jobListing = new JobListing({
      title,
      description,
      applicationDeadline,
      salary,
      location,
      employmentType,
    });

    await jobListing.save();
    res.json({ message: 'Job listing added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
