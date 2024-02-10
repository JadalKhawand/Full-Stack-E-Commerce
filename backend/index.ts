import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import StoreController from "./controllers/StoreController";

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("Please add the DATABASE_URL variable in .env file");
}

const app = express();
app.use(express.static("public"));

app.use(express.json());

app.use(cors());



// user login / register
app.use("/api/v1/user", UserController);

// Store 
app.use("/api/v1/store", StoreController)

mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URL).then(() => {
  console.log("Connected to MongoDB Atlas!");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
  });
});
