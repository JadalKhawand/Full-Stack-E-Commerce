import express from "express";
import Review from "../models/Review";
import Product from "../models/Product";
import { auth } from "../middleware/auth";

const ReviewController = express.Router();

ReviewController.get("/", async (req, res) => {
  try {
    // @ts-ignore
    const userId = req?.decoded.user._id;
    if (!userId) throw new Error("User not authenticated");
    const reviews = await Review.find({ user: userId });
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Couldn't get reviews" });
  }
});

ReviewController.get("/:product_id", async (req, res) => {
  try {
    if (!req.params.product_id) {
      return;
    }

    const reviews = await Review.find({
      product: req.params.product_id,
    });

    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create store!" });
  }
});

ReviewController.post("/create", auth, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req?.decoded.user._id;
    if (!userId) throw new Error("User not authenticated");

    const { productId, rating, comment } = req.body;
    const review = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });
    const product = await Product.find({ _id: productId });
    const newSumOfRatings = product?.sumOfRatings + rating
    const newNumberOfReviews = (product?.numberOfReviews || 0) + 1;
    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        sumOfRatings: newSumOfRatings,
        numberOfReviews: newNumberOfReviews,
      },
      {
        new: true,
      }
    );
    await review.save()
    res.json(updatedProduct)
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create review!" });
  }
});
export default ReviewController;
