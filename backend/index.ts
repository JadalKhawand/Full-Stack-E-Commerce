import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL
if(!DATABASE_URL){
  throw new Error("wjhggrgwregwejkgewr")
}
const app = express();







mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB Atlas!')
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}!`)
        })
    });