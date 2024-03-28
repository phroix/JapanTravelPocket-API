require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const spendingsRouter = require("./routes/spendings.routes");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.json({ message: "JapanTravelPocker-API." });
});

require("./routes/spendings.routes")(app);
require("./routes/tags.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on Port", PORT);
});
