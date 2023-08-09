const mongoose = require("mongoose");
const app = require("./app");

const mongo_uri = "mongodb+srv://sb262202:sb262202@patient-feedback.tywdpao.mongodb.net/patient?retryWrites=true&w=majority"

const PORT=5000

mongoose.connect(mongo_uri, 
  {
  useNewUrlParser: true,
  // createIndexes: true,
  useUnifiedTopology: true
}
).then(() => {
  console.log("Connected to MongoDB at", mongo_uri);
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});


app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
