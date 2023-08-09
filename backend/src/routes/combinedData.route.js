const express = require("express");
const router = express.Router();
const {submitFeedback, getAllPatients} = require("../controllers/combinedData.controller");
const {validateCombinedData} = require("../middlewares/combinedData.middleware")

router.post(
  "/feedback",
  validateCombinedData,
  submitFeedback
);

router.get("/patients-feedback", getAllPatients);

module.exports = router;
