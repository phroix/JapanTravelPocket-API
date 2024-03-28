// const express = require('express');
const router = require("express").Router();

var costController = require("../controller/costs.controller");

module.exports = (app) => {
  // accepts custom headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST, create entries and save in db
  router.post("/", costController.createCost);

  //GET, return costs at date product
  router.get("/", costController.getCostAtDate);

  router.get("/list", costController.getAllCosts);

  //PUT, update a product with product_id
  router.put("/:cost_id", costController.updateCost);

  //DELETE, delete a product with product_id
  router.delete("/:cost_id", costController.deleteCost);

  app.use("/costs", router);
};
