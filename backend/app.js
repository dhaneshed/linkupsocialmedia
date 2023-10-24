const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const logger = require('morgan');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using middlewares

var corsoption = {
  origin: process.env.ORIGIN, //origin from where you requesting
  credentials: true,
  methods: "POST, GET, OPTIONS, PUT, DELETE", // Define the allowed HTTP methods
  allowedHeaders: "Content-Type, X-Auth-Token, Origin, Authorization", // Define the allowed headers
  optionSuccessStatus: 200,
};

//using cors
app.use(cors(corsoption));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


const post = require("./routes/post");
const user = require("./routes/user");
const admin = require("./routes/admin");
const chat = require("./routes/chat");
const message = require("./routes/message");

//Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1/admin", admin);
app.use("/api/v1/chat", chat);
app.use("/api/v1/message", message);

// ---------------Deployment----------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
// })

//---------------Deployment---------------------

module.exports = app;
