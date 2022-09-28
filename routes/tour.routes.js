const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controllers");

router
  .route("/")
  /**
   * @api{get} /tour all tours
   * @apiDescription get All tours
   * @apiQuery  [limit=number] [page=number] [sort=string]
   *@apiSuccess {[Object]} all the users
   */
  .get(tourController.getTour)
  /**
   * @api {Post} /tour create tour
   * @apiSuccess {Object} tour create
   */
  .post(tourController.createTour);

router
  .route("/trending")
  /**
   * @api{get} /tour/trending trending tours
   * @apiDescription get top 3 trending tours on the basis of viewCount
   *
   *@apiSuccess {[Object]}
   */
  .get(tourController.getTrending);

router
  .route("/cheapest")
  /**
   * @api{get} /tour/cheapest cheapest tours
   * @apiDescription get top 3 cheapest tours on the basis of price[ascending order]
   *
   *@apiSuccess {[Object]}
   */
  .get(tourController.getCheapest);

router
  .route("/:id")
  /**
   * @api{get} /tour/:id tour details
   * @apiDescription get tour details via mongodb Id
   * @apiParams {Number} tour id
   *@apiSuccess {[Object]}
   */
  .get(tourController.getTourById)
  /**
   * @api {patch} /tour/:id update tour
   * @apiDescription update tour via tour id
   * @apiParams {Number} tour id
   * @apiSuccess {success message}
   */
  .patch(tourController.updateTourById);

module.exports = router;
