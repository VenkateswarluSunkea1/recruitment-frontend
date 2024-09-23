import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ApplicationManagement from './ApplicationManagement'
import { ImportResume, ImportSpreadsheet } from './ImportPages';
import CreateJobOpening from './CreateJobOpening';
import ImportJobOpenings from './ImportJobOpenings';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApplicationManagement />} />
        <Route path="/import/resume" element={<ImportResume />} />
        <Route path="/import/spreadsheet" element={<ImportSpreadsheet />} />
        <Route path="/create/job-opening" element={<CreateJobOpening />} />
        <Route path="/import/job-openings" element={<ImportJobOpenings />} />
      </Routes>
    </Router>
  );
}

export default App;
