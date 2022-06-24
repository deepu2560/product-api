const mongoose = require("mongoose");
// connecting to local products database
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/products");
};

module.exports = connect;
