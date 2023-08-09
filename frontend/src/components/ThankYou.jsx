import React from "react";
import { Typography, Box } from "@mui/material";

const ThankYou = () => {
  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Thank You!
      </Typography>
      <Typography variant="body1" textAlign="center">
        Your feedback has been submitted successfully.
      </Typography>
    </Box>
  );
};

export default ThankYou;
