const CombinedData = require("../models/combinedData.model");

const submitFeedback = async (req, res) => {
  try {
    const { patientInfo, feedbackResponses } = req.body;

    const combinedData = new CombinedData({
      patientInfo,
      feedbackResponses,
    });

    await combinedData.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error submitting feedback", error });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await CombinedData.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving patients", error });
  }
};

module.exports = {
  submitFeedback,
  getAllPatients
}
