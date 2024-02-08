let mongoose = require("mongoose");
let schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    uname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    token: String,
  },
  { timestamps: true }
);

// let mongoose = require("mongoose");

module.exports = mongoose.model("sign_ups", schema);
