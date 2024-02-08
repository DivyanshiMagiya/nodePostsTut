let mongoose = require("mongoose");
let userSchema = require("./users.schema");

let schema1 = new mongoose.Schema(
  {
    uname: String,
    comments: String,
  },
  { _id: false },
  { timestamps: true }
);

let schema2 = new mongoose.Schema(
  {
    message: String,
    like_id: Number,
    comments: [schema1],
    isVisible: Boolean,
    userDetails: {
      uname: String,
      email: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_posts", schema2);
