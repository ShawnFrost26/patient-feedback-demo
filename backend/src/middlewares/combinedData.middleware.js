const Joi = require("joi");

 const validateCombinedData = (req, res, next) => {
  const schema = Joi.object({
    patientInfo: Joi.object({
      name: Joi.string().required(),
      id: Joi.string().pattern(/^JPH\d{7}$/).required(),
      number: Joi.string().length(10).required(),
      email: Joi.string().email().required(),
    }).required(),
    feedbackResponses: Joi.array().items(
      Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
      })
    ),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

module.exports= {
    validateCombinedData
}