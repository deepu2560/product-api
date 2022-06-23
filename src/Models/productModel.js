const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    brand: { type: String, require: true },
    tags: [{ type: String, require: true }],
    category: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model("data", productModel);
