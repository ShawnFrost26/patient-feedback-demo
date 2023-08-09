import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const questions = [
  {
    question:
      "How would you rate your overall experience during your visit to our hospital?",
    type: "single-choice",
    options: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
  },
  {
    question:
      "How satisfied are you with the care provided by our medical staff?",
    type: "single-choice",
    options: [
      "Not Satisfied",
      "Somewhat Satisfied",
      "Satisfied",
      "Very Satisfied",
      "Extremely Satisfied",
    ],
  },
  {
    question:
      "Did you receive clear instructions about your treatment and medications?",
    type: "single-choice",
    options: ["Yes", "No"],
  },
  {
    question:
      "How likely are you to recommend our hospital to friends and family?",
    type: "single-choice",
    options: [
      "Not Likely",
      "Somewhat Likely",
      "Likely",
      "Very Likely",
      "Extremely Likely",
    ],
  },
  {
    question:
      "Is there anything specific you would like to highlight about your experience at our hospital?",
    type: "descriptive",
  },
  {
    question:
      "Do you have any suggestions for improving our hospital's services?",
    type: "descriptive",
  },
];

const FeedbackForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientInfo = location.state.patientInfo;

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [feedbackResponses, setFeedbackResponses] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill("")
  );
  const [textResponses, setTextResponses] = useState(
    Array(questions.length).fill("")
  );

  useEffect(() => {
    console.log("feedbackResponses inside useEffect:", feedbackResponses);
  }, [feedbackResponses]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = e.target.value;
    setSelectedOptions(updatedOptions);
  };

  const handleTextResponseChange = (e, index) => {
    const updatedResponses = [...textResponses];
    updatedResponses[index] = e.target.value;
    setTextResponses(updatedResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const areAllQuestionsAnswered = questions.every((q, index) => {
      if (q.type === "single-choice") {
        return selectedOptions[index] !== "";
      } else {
        return textResponses[index] !== "";
      }
    });

    if (!areAllQuestionsAnswered) {
      setSnackbarMessage("Please answer all questions before submitting.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const responses = questions.map((q, index) => ({
      question: q.question,
      answer:
        q.type === "single-choice"
          ? selectedOptions[index]
          : textResponses[index],
    }));

    setFeedbackResponses((prevFeedbackResponses) => [
      ...prevFeedbackResponses,
      ...responses,
    ]);

    const combinedData = {
      patientInfo,
      feedbackResponses: [...feedbackResponses, ...responses],
    };
    console.log("Combined Data:", combinedData);

    try {
      const response = await fetch("http://localhost:5000/v1/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedData),
      });

      if (response.ok) {
        setSnackbarMessage("Feedback submitted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        navigate("/thank-you");
        console.log("Feedback submitted successfully");
      } else {
        setSnackbarMessage("Feedback submission failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.log("Feedback submission failed");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSnackbarMessage("Error submitting feedback");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <Box key={index} mt={2}>
            <Typography variant="h6" gutterBottom>
              {index + 1}. {q.question}
            </Typography>
            {q.type === "single-choice" ? (
              <FormControl component="fieldset" required>
                <RadioGroup
                  value={selectedOptions[index]}
                  onChange={(e) => handleOptionChange(e, index)}
                >
                  {q.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <textarea
                rows={6}
                className="multiline-input"
                style={{ width: "100%", fontSize: "16px" }}
                value={textResponses[index]}
                onChange={(e) => handleTextResponseChange(e, index)}
                required
              />
            )}
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ margin: 16, backgroundColor: "rgb(105, 190, 5)" }}
        >
          Submit Feedback
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default FeedbackForm;
