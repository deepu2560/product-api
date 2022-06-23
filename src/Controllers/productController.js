const express = require("express");

const router = express.Router();

const Product = require("../Models/productModel");

router.post("", async (req, res) => {
  try {
    console.log("==> Post data in database :- " + req.body.name);
    res.status(200).send({ error: false, products: req.body });
  } catch (error) {
    console.log("==> Product post error");
    res.status().send({ error: true, products: false });
  }
});

module.exports = router;
