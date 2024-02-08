let mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
mongoose.connection
  .on("open", () => {
    `Connection Successful!`;
  })
  .on("err", (err) => {
    console.log(`Something went wrong ${err}`);
  });
