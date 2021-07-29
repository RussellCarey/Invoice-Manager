const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");

const globalErrorHandler = require("./controllers/errorController");

dotenv.config();

//? Notes
//? This limiter will limit an IPs amount of times it can make a request per window if time.
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message:
    "You have made too many requests from this IP. Please try again in 60 minutes.",
});

//? Setting some misc useful headers - check doc for more options
app.use(helmet());

//? Limit request
app.use("/api", limiter);

//? Body parsers
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));

//? Data sanitization against NoSQL query injects - checks body etc and filter out dollar signs and dots - removes mongo db operators
app.use(mongoSanitize());

//? Data sanitization against Cross site scripting attack - Clean any user input for malicious HTML code
app.use(xss());

//? Prevent parameter pollution of duplicate API queries eg sort and sort again. Pass object and white-list certain properties to allow duplicates eg. duration
app.use(
  hpp({
    whitelist: ["duration"],
  })
);

//! Create a route 'URL base' that the routes use
app.use("/api/users", userRoutes);
app.use("/api/data", dataRoutes);

app.use(globalErrorHandler);

app.listen(process.env.PORT || process.env.DB_PORT || 4444, () => {
  console.log("Server has loaded");
  console.log(process.env.NODE_ENV);
});

//! Mongo Connect
// Connect to mongo
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("CONNECTED to mongo")
);
