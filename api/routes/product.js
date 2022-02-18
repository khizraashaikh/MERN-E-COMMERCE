const { verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");

const router = require("express").Router();

// CREATE PRODUCT ROUTE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = Product(req.body);

  try {
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE PRODUCT ROUTE
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE PRODUCT ROUTE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET PRODUCT ROUTE
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL PRODUCTS ROUTE
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
