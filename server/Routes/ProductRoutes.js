import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import protect from "../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

//GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const products = await Product.find({ ...keyword });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const products = await Product.findById(req.params.id);
    if (products) {
      res.json(products);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// PRODUCTT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const products = await Product.findById(req.params.id);

    if (products) {
      const alreadyReviewed = products.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      products.reviews.push(review);
      productRoute.numReviews = products.reviews.length;
      products.rating =
        products.reviews.reduce((acc, item) => item.rating + acc, 0) /
        products.reviews.length;

      await products.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

export default productRoute;
