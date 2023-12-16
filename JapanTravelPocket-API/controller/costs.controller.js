/*
  Product Controller
  Requests for Product Functions
*/
const { where } = require("sequelize");
const db = require("../entity/index.entity");
const CostEntity = db.cost;
const Op = db.Sequelize.Op;

//POST, create product and save in db
exports.createCost = (req, res) => {
  //create a product
  const cost = {
    name: req.body.name,
    date: req.body.date,
    amount: req.body.amount,
    currency: req.body.currency
  };
  console.log(cost.name);
  console.log(cost.day);
  console.log(cost.amount);

  CostEntity.create(cost)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating entries.",
      });
    });
};

/// GET, return all entries with an exact matching date
exports.getCostAtDate = (req, res) => {
  const date = req.query.date;

  if (!date) {
    return res.status(400).send({
      message: "No date provided for searching entries.",
    });
  }

  CostEntity.findAll({
    where: { date: date },
    order: [["cost_id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while retrieving entries.",
      });
    });
};

//GET, return all product
exports.getAllCosts = (req, res) => {
  CostEntity.findAll({
    order: [["cost_id", "ASC"]],
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
exports.updateCost = (req, res) => {
  const cost_id = req.params.cost_id;

  CostEntity.update(req.body, {
    where: { cost_id: cost_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Entry with product_id=${cost_id}. Maybe Entry was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Entry with entry_id=" + cost_id,
      });
    });
};

//DELETE, delete a user with user_id
exports.deleteCost = (req, res) => {
  const cost_id = req.params.cost_id;

  CostEntity.destroy({
    where: { cost_id: cost_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Entry was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Entry with entry_id=${cost_id}. Maybe Entry was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Entry with entry_id=" + cost_id,
      });
    });
};
