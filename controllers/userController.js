const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  try {
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
  } catch (e) {
    return res.status(500).json(e.message);
  }
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

// POST
// @localhost:8000/user/login
module.exports.login = async (req, res) => {
  try {
    //req.body
    const { email, password } = req.body;
    const loginuser = await user.findOne({ email: email });
    // if none
    if (!loginuser) {
      return res.status(401).send("no user with this email");
    }
    // kan l9it
    // check password
    const isMatch = await bcrypt.compare(password, loginuser.password);
    if (!isMatch) {
      return res.status(400).send("invalid credentials");
    }

    const token = jwt.sign(
      //payload
      {
        id: loginuser._id,
      },
      "XXXXXXXXX", //jwt_secret
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
