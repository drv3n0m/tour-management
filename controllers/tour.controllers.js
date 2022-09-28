const { query } = require("express");
const {
  createTourService,
  getTourServices,
  getTourByIdService,
  updateTourByIdService,
  getTrendingServices,
  getCheapestServices,
} = require("../services/tour.services");

exports.getTour = async (req, res) => {
  try {
    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 3 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tour = await getTourServices(queries);

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: err.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await getTourByIdService(id);

    res.status(200).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: err.message,
    });
  }
};

exports.getTrending = async (req, res) => {
  try {
    const result = await getTrendingServices();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: err.message,
    });
  }
};

exports.getCheapest = async (req, res) => {
  try {
    const result = await getCheapestServices();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: err.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const result = await createTourService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "failed to create Data",
      error: error.message,
    });
  }
};

exports.updateTourById = async (req, res) => {
  try {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        status: "fail",
        error: "Please insert data",
      });
    } else {
      if (req.body.viewCount) {
        res.status(403).json({
          status: "fail",
          error: "Sorry!!!",
        });
      } else {
        const result = await updateTourByIdService(id, req.body);
        console.log(result);
        res.status(200).json({
          status: "success",
          message: "Successfully updated the tour",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the tour",
      error: err.message,
    });
  }
};
