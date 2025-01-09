require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // Corrected mongoose spelling
const cookieParser = require("cookie-parser");
const cors = require("cors");

const loginSignupRoute = require("./routes/loginSignupRoute");
const home = require("./routes/homeRoute");
const logout = require("./routes/logOutRoute");
const shortLink = require("./routes/shortLink");
const useLink = require("./routes/useLinkRoute");

const app = express();

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.DBConnectURL);
    console.log("DB Connected");
  } catch (err) { 
    console.log("! DB Connection error", err);
  }
})();

app.use(express.json())
app.use(cookieParser())

app.use(cors());





app.use(loginSignupRoute);
app.use(home);
app.use(logout);
app.use(shortLink);

app.use(useLink)

app.listen(process.env.PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
