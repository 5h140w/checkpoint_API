const mongoose = require("mongoose");

module.exports.connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("connected to database"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
