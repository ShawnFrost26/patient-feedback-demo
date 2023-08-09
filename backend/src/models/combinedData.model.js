const mongoose = require("mongoose");
const validator = require("validator")

const combinedDataSchema = new mongoose.Schema({
  patientInfo: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      validate: {
        validator: (value) => /^JPH\d{7}$/.test(value),
        message: "Patient ID should start with 'JPH' followed by 7 digits.",
      },
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length === 10,
        message: "Patient mobile number should be 10 characters.",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address.",
      },
    },
  },
  feedbackResponses: [
    {
      question: String,
      answer: String,
    },
  ],
});

const CombinedData = mongoose.model("CombinedData", combinedDataSchema);

module.exports = CombinedData;
