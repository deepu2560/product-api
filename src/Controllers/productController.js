const express = require("express");

const router = express.Router();

const Product = require("../Models/productModel");

// posting product data in local product database and datas collection
router.post("", async (req, res) => {
  try {
    const products = await Product.create(req.body);

    console.log("==> Post data in database :- " + products.name);
    res.status(200).send({ error: false, products });
  } catch (error) {
    console.log("==> Product post error");
    res
      .status(500)
      .send({ error: true, products: "server error! something went wrong" });
  }
});

// getting all data from database
router.get("", async (req, res) => {
  try {
    // pagination
    const size = req.query.size || 10;
    const page = req.query.page || 1;

    // find() for getting all data
    const products = await Product.find()
      .skip((page - 1) * size)
      .sort({ createdAt: -1 })
      .limit(size)
      .lean()
      .exec();
    const totalPage = Math.ceil((await Product.find().countDocuments()) / size);

    console.log("==> Showing all products data");
    res.status(200).send({ error: false, products, totalPage });
  } catch (error) {
    console.log("==> Showing all products data Error :- " + error);
    res
      .status(500)
      .send({ error: true, products: "Server error! something went wrong" });
  }
});

// getting data as per category
router.get("/category", async (req, res) => {
  try {
    // pagination
    const size = req.query.size || 10;
    const page = req.query.page || 1;

    // find({category: req.query.cat}) for getting data of a perticular category
    const products = await Product.find({ category: req.query.cat })
      .skip((page - 1) * size)
      .sort({ createdAt: -1 })
      .limit(size)
      .lean()
      .exec();
    const totalPage = Math.ceil(
      (await Product.find({ category: req.query.cat }).countDocuments()) / size,
    );

    if (products.length == 0) {
      console.log("==> Showing products data for Category :- " + req.query.cat);
      res
        .status(400)
        .send({ error: true, products: "category not in database" });
      return;
    }

    console.log("==> Showing products data for category :- " + req.query.cat);
    res.status(200).send({ error: false, products, totalPage });
  } catch (error) {
    console.log("==> showing product data for category Error :-", error);
    res.status(500).send({
      error: true,
      products: "server error! something went wrong",
    });
  }
});

// getting data for a perticular id of product
router.get("/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id).lean().exec();

    if (!products) {
      console.log("==> finding product by id Error :- " + req.params.id);
      res
        .status(400)
        .send({ error: true, products: "product not in database" });
      return;
    }

    console.log("==> finding product by id :- " + req.params.id);
    res.status(200).send({ error: false, products });
  } catch (error) {
    console.log("==> finding Product by id Error :- " + error);
    res.status(500).send({ error: true, products: "id is not proper" });
  }
});

// deleting product from database
router.delete("/:id", async (req, res) => {
  try {
    // deleteing product from database
    const products = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    console.log("==> deleting product by id :- " + req.params.id);
    res.status(200).send({ error: false, products: "Product deleted" });
  } catch (error) {
    console.log("==> deleting Product by id Error :- " + error);
    res.status(500).send({ error: true, products: "id is not proper" });
  }
});

// exporting router
module.exports = router;
