/*
  Product Controller
  Requests for Product Functions
*/
const { where } = require("sequelize");
const db = require("../entity/index.entity");
const EntryEntity = db.entry;
const Op = db.Sequelize.Op;

//POST, create product and save in db
exports.createEntry = (req, res) => {
  //create a product
  const entry = {
    name: req.body.name,
    day: req.body.day,
    amount: req.body.amount,
  };

  EntryEntity.create(entry)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating entries.",
      });
    });
};

//GET, return all product
exports.getAllEntries = (req, res) => {
  EntryEntity.findAll({
    order: [["entry_id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving entries.",
      });
    });
};

//PUT, update a product with product_id
exports.updateEntry = (req, res) => {
  const entry_id = req.params.entry_id;

  EntryEntity.update(req.body, {
    where: { entry_id: entry_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Entry with product_id=${entry_id}. Maybe Entry was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Entry with entry_id=" + entry_id,
      });
    });
};

//DELETE, delete a user with user_id
exports.deleteEntry = (req, res) => {
  const entry_id = req.params.entry_id;

  EntryEntity.destroy({
    where: { entry_id: entry_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Entry with entry_id=${entry_id}. Maybe Entry was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Entry with entry_id=" + entry_id,
      });
    });
};
