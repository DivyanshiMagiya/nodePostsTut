let express = require("express");
let router = express.Router();
let authController = require("./controller/auth");
let createPostController = require("./controller/createPost");
let updatePostController = require("./controller/update");
// let postImg = require("./controller/file");
router.post("/signup", authController.userSignup);
router.get("/signIn", authController.userSignIn);
router.post(
  "/createPost",
  authController.verifyToken,
  createPostController.getInput,
  createPostController.createPost
);
router.post(
  "/updatePost",
  createPostController.getInput,
  updatePostController.updatePost
);
router.post(
  "/addComments",
  authController.verifyToken,
  updatePostController.update
);
module.exports = router;
