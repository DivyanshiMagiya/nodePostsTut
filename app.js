let express = require("express");
let routes = require("./routes/userPosts.routes");
let app = express();
require("dotenv").config();
require("./config/db");
app.use(express.json());
app.use("/user", routes);
app.listen(process.env.PORT || 3100, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
