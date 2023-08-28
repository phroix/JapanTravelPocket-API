// const express = require('express');
const router = require("express").Router();

var entryController = require("../controller/entries.controller");

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
  router.post("/", entryController.createEntry);

  //GET, return all product
  router.get("/", entryController.getEntryAtDate);

  router.get("/list", entryController.getAllEntries);

  //PUT, update a product with product_id
  router.put("/:entry_id", entryController.updateEntry);

  //DELETE, delete a product with product_id
  router.delete("/:entry_id", entryController.deleteEntry);

  app.use("/entries", router);
};
