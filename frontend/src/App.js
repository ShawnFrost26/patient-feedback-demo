import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";
import FeedbackForm from "./components/FeedbackForm";
import ThankYou from './components/ThankYou';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientDetails />} />
        <Route path="/feedback-form" element={<FeedbackForm/>} />
        <Route path="/thank-you" element={<ThankYou/>} />
      </Routes>
    </Router>
  );
}

export default App;
