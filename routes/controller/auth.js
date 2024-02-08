let validate = require("./validation");
let bcrypt = require("bcrypt");
let user = require("../../schema/users.schema");
let jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  try {
    let request = await validate.validator.validateAsync(req.body);
    let { uname, email } = req.body;

    let existsUser = await user.find({ email: request.email });
    if (existsUser.length > 0) {
      res.json({
        message: "user already exists  ! ",
        data: null,
      });
    } else {
      let hashedPassword = await bcrypt.hash(request.password, 8);

      let addUser = await user.create({
        id: request.id,
        uname: request.uname,
        email: request.email,
        password: hashedPassword,
        address: request.address,
      });
      let userToken = await user.findOne({
        id: addUser.id,
        uname: addUser.uname,
        email: addUser.email,
      });
      if (addUser) {
        jwt.sign(
          { userToken },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "24h" },
          async (err, token) => {
            if (err) {
              res.json({ message: err.message });
            } else {
              let add = await user.findOneAndUpdate(userToken, {
                $set: { token: token },
              });
              res.json({
                message: "user Created and Token Generated",
                data: add,
              });
            }
          }
        );
      } else {
        res.json({
          message: "not a valid user ",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.userSignIn = async (req, res) => {
  let request = req.body;
  let userToken = await user.findOne({
    id: request.id,
    uname: request.uname,
  });
  let comparePassword = bcrypt.compare(
    request.password,
    userToken.password,
    (err, output) => {
      if (err) {
        res.json({
          message: "user not found!",
        });
      }
      if (output) {
        jwt.sign(
          { userToken },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "24h" },
          async (err, token) => {
            if (err) {
              res.json({ message: err.message });
            } else {
              let add = await user.findOneAndUpdate(userToken, token);
              res.json({
                message: `${userToken.uname} successfully signed-in and token added ! `,
                data: add,
              });
            }
          }
        );
      } else {
        res.json({ message: "wrong password" });
      }
    }
  );
};
exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.header("authorization");
    if (!token) {
      res.status(401).json({ error: "Access Denied" });
    } else {
      token = token.split(" ")[1];
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user1 = decodedToken.userToken;

      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
