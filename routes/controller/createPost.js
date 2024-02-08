let post = require("../../schema/userPosts.schema");
let uploadImg = require("./file");

exports.createPost = async (req, res) => {
  try {
    let request = req.body;
    let input = "";
    let checkPost = req.file;

    if (checkPost) {
      input = req.file.filename;
    } else {
      input = request.message;
    }
    let createPost = await post.create({
      message: input,
      userDetails: { uname: req.user1.uname, id: req.user1.id },
      like_id: request.like_id,
      comments: request.comments,
      isVisible: request.isVisible,
    });
    res.json({
      message: "post created!",
      data: createPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInput = uploadImg.single("myFile");
