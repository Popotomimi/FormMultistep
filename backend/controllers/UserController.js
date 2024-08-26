const User = require("../models/Users");

exports.getAllUsers = async (req, res) => {
  res.status(200).json({ message: "Deu bom!" });
};
