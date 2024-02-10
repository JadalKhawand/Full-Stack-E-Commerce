import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  pictures:{
    type: [String],
    required: true,
  },
  sumOfRatings: {
    type: Number,
    default: 0
},
numberOfReviews: {
    type: Number,
    default: 0
},
updatedAt: {
    type: Date,
    default: Date.now
},
createdAt: {
    type: Date,
    default: Date.now
},
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;

