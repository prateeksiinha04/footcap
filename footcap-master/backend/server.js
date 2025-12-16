const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/footcap", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log("MongoDB Connected");

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const Product = mongoose.model("Product", ProductSchema);

/* ======================
   API ROUTES
====================== */

// Get all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (ADMIN)
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "Product added" });
});

// Update price (ADMIN)
app.put("/products/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, {
    price: req.body.price
  });
  res.json({ message: "Price updated" });
});

// Delete product (optional)
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

app.listen(5000, () =>
  console.log("Backend running at http://localhost:5000")
);
