const express = require("express");

const connect = require("./src/Configs/db");

const productControl = require("./src/Controllers/productController");

const app = express();

app.use(express.json());

app.use("/products", productControl);

app.listen(process.env.PORT || 8080, async (req, res) => {
  try {
    await connect();

    console.log("==> sever started. PORT:- " + (process.env.PORT || 8080));
  } catch (error) {
    console.log("==> database connect error :- " + error);
  }
});
