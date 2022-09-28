const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

//database connection

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("Database Connected Successfully");
});

const port = process.env.PORT || 5000;

app.listen(port);
