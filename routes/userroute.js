const express = require("express");
const {
  getAllusers,
  adduser,
  activeuser,
  deleteuser,
  login,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/allusers", getAllusers);
userRoute.post("/add", adduser);
userRoute.post("/login", login);
userRoute.put("/active/:idselected", activeuser);
userRoute.delete("/delete/:iddelete", deleteuser);

module.exports = userRoute;
