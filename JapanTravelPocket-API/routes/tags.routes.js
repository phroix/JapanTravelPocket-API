require("dotenv").config();
const express = require("express");
const tagsController = require("../controller/tags.controller");
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
  
    //GET, get tags
    router.get("/", tagsController.getTags);
  
    //POST, tag spending
    router.post("/", tagsController.createTag);
  
    //PUT, update tag by id
    router.put("/:id", tagsController.updateTag);
  
    //DELETE, delete tag by id
    router.delete("/:id", tagsController.deleteTag);
  
    app.use("/tags", router);
  };