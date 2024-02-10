import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error(
    "database url was not found. Please add the DATABASE_URL variable in .env file"
  );
}

const app = express();
app.use(express.static("public"));

app.use(express.json());

app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URL).then(() => {
  console.log("Connected to MongoDB Atlas!");
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
  });
});
