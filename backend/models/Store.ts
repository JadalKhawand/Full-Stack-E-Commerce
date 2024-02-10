import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  approved:{
    type: Boolean,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
    default: Date.now,
  }

})

const Store = mongoose.model("Store", StoreSchema);

export default Store;