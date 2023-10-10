const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Using middlewares

var corsoption = {
  origin: "http://localhost:3000", //origin from where you requesting
  credentials: true
};
//using cors
app.use(cors(corsoption));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Importing  Routes
 
const post = require("./routes/post");
const user = require("./routes/user");
const admin = require("./routes/admin");
const chat = require("./routes/chat");
const message = require("./routes/message");

//Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1/admin", admin);
app.use("/api/v1/chat",chat);
app.use("/api/v1/message",message);

// ---------------Deployment----------------------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV==='production'){

  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
  });

}else{

  app.get("/", (req,res)=>{
    res.send("API is Running Successfully");
  });

}
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
// })

//---------------Deployment---------------------

module.exports = app;
