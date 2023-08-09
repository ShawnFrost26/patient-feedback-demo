import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientDetails.css";
import { TextField, Button, Snackbar, Alert } from "@mui/material";

const PatientDetails = () => {

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    id: "",
    number: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientInfo.name || !patientInfo.id || !patientInfo.number || !patientInfo.email) {
      setErrorMessage("Please fill in all the required fields.");
      setErrorSnackbarOpen(true);
      return;
    }
    if (!/^JPH\d{7}$/.test(patientInfo.id)) {
      setErrorMessage("Patient ID should start with 'JPH' followed by 7 digits.");
      setErrorSnackbarOpen(true);
      return;
    }
    if (!/^\d{10}$/.test(patientInfo.number)) {
      setErrorMessage("Mobile number should have exactly 10 digits.");
      setErrorSnackbarOpen(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientInfo.email)) {
      setErrorMessage("Invalid email address.");
      setErrorSnackbarOpen(true);
      return;
    }

    console.log("Patient Info:", patientInfo);
    navigate("/feedback-form", { state: { patientInfo } });
  };

  return (
    <div>
      <div className="logo">
        <img
          src="https://jaiprakashhospitals.com/wp-content/uploads/2021/08/JP-Logo-New.png"
          alt="Logo"
        />
      </div>
      <div className="patient-details-container">
        <div className="feedback-image">
          <img
            src="https://peterainsworth.com/wp-content/uploads/2019/06/patient-feedback-form-luxury-countrys-largest-nhs-trust-to-deploy-digital-patient-of-patient-feedback-form.png"
            alt="Feedback"
          />
        </div>
        <div className="patient-form">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Patient's Name"
              variant="outlined"
              fullWidth
              name="name"
              value={patientInfo.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Patient's Id"
              variant="outlined"
              fullWidth
              name="id"
              value={patientInfo.id}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Patient's Mobile Number"
              variant="outlined"
              fullWidth
              name="number"
              value={patientInfo.number}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Patient's Email"
              type="email"
              variant="outlined"
              fullWidth
              name="email"
              value={patientInfo.email}
              onChange={handleInputChange}
              required
            />

            <Button
              type="submit"
              className="button"
              variant="contained"
              style={{ backgroundColor: "#69be05" }}
            >
              Next
            </Button>
          </form>
          <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%", justifyContent: "center", backgroundColor: "#f44336" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
        </div>
        <h1 className="message">Please use mobile</h1>
      </div>
    </div>
  );
};

export default PatientDetails;
