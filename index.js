// import express
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./config/database");
const userRoute = require("./routes/userroute");

const server = express();

connectDB();

server.use(express.json());

server.use("/user", userRoute);

//run server
server.listen(8000, () => {
  // console.log("")
  console.log("you are using port 8000");
});
