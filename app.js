const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes

const tourRoute = require("./routes/tour.routes.js");

app.get("/", (req, res) => {
  res.send("Tour management Home Page!!!");
});

app.use("/api/v1/tour", tourRoute);

module.exports = app;
