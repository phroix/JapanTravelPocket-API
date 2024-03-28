require("dotenv").config();
const express = require("express");
const spendingsController = require("../controller/spendings.controller");
const router = express.Router();

module.exports = (app) => {
  // accepts custom headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //GET, get spendings by date
  router.get("/", spendingsController.getSpendingByDate);

  //POST, create spending
  router.post("/", spendingsController.createSpending);

  //PUT, update spending by id
  router.put("/:id", spendingsController.updateSpending);

  //DELETE, delete spending by id
  router.delete("/:id", spendingsController.deleteSpending);

  app.use("/spendings", router);
};
