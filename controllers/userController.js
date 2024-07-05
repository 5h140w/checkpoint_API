const user = require("../models/user");
const bcrypt = require("bcrypt");

// method : GET
// @localhost:8000/user/allusers
module.exports.getAllusers = async (req, res) => {
  const allusers = await user.find();
  return res.status(200).json(allusers);
};

// method : POST
// @ localhost:8000/user/add
module.exports.adduser = async (req, res) => {
  // req.body
  const { name, email, password, isActive } = req.body;

  // 9adeh min mara bech na3mel hashage
  const salt = await bcrypt.genSalt(10);
  // a3tini text => result
  const hashedpassword = await bcrypt.hash(password, salt);

  const addeduser = new user({
    name,
    // field email : email miniscule
    email: email.toLowerCase(),
    password: hashedpassword,
    isActive,
  });

  await addeduser.save();
  return res.status(200).json(addeduser);
};

// PUT
// @ localhost:8000/user/active/:idselected
// function => active user
module.exports.activeuser = async (req, res) => {
  const { idselected } = req.params;
  await user.findByIdAndUpdate(idselected, { $set: { isActive: true } });
  return res.status(200).json("activated!");
};

//delete
// @localhost:8000/user/delete/:iddelete
module.exports.deleteuser = async (req, res) => {
  const { iddelete } = req.params;
  await user.findByIdAndDelete(iddelete);
  return res.status(200).json("deleted!");
};
