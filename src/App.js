import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ApplicationManagement from './ApplicationManagement'
import { ImportResume, ImportSpreadsheet } from './ImportPages';
import CreateJobOpening from './CreateJobOpening';
import ImportJobOpenings from './ImportJobOpenings';
import CreateCandidateForm from './createCandidateForm';
import JobList from './JobList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApplicationManagement />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/import/resume" element={<ImportResume />} />
        <Route path="/import/spreadsheet" element={<ImportSpreadsheet />} />
        <Route path="/create/job-opening" element={<CreateJobOpening />} />
        <Route path="/import/job-openings" element={<ImportJobOpenings />} />
        <Route path="/create/candidate" element={<CreateCandidateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
