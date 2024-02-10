import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

export default User;