const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  })
);

module.exports = User;
