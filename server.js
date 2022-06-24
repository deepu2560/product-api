// importing required liberary
const express = require("express");
const cors = require("cors");

// importing connect function which connect api to local database
const connect = require("./src/Configs/db");

// importing router of product controller
const productControl = require("./src/Controllers/productController");

// app for express function
const app = express();

// express.json for posting data in json format
app.use(express.json());
1;
app.use(cors());

// "/products" to get and post data from database
app.use("/products", productControl);

// app.listen for starting server
app.listen(process.env.PORT || 8080, async (req, res) => {
  try {
    await connect();

    console.log("==> sever started. PORT:- " + (process.env.PORT || 8080));
  } catch (error) {
    console.log("==> database connect error :- " + error);
  }
});
