let userData = require("../../schema/userPosts.schema");
exports.updatePost = async (req, res) => {
  try {
    let request = req.body;
    let input = "";
    let getUserId = await userData.find({}, { _id: request._id });
    let checkPost = req.file;
    if (checkPost) {
      input = req.file.filename;
    } else {
      input = request.message;
    }
    let addQuery = { message: input };
    let update = await userData.findByIdAndUpdate(getUserId, addQuery, {
      new: true,
    });
    res.json({ message: "records updated!", data: update });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// exports.addComments = async (req, res) => {
//   try {
//     let request = req.body;
//     let findPost = await userData.findOne({ _id: request._id });
//     if (findPost) {
//       let temp = [];
//       // let findUser = { uname: req.user.uname };
//       let addComment = await userData.findByIdAndUpdate(
//         findPost,
//         { uname: req.user.uname, comments: request.comments },
//         { new: true }
//       );
//       let res = temp.push({ comments: addComment });
//       res.json({ message: "records updated", data: res });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

exports.update = async (req, res) => {
  let request = req.body;
  let p_id = await userData.findOne({ _id: request._id });
  if (p_id) {
    let details = req.user1;
    let data = await userData.findOneAndUpdate(
      { _id: request._id },
      {
        $push: {
          comments: { uname: details.id, comments: request.comments },
        },
      },
      { new: true }
    );
    res.json({
      message: "Post Details",
      data: data,
    });
  } else {
    res.send("Post not found");
  }
};
