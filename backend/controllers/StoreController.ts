import express from "express";
import Store from "../models/Store";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth";
import multer from "multer";
import { logoUploads } from "../middleware/multer";
import dotenv from "dotenv";
import { superAdmins } from "../shared/constants";
dotenv.config();
const secret = process.env.TOKEN_SECRET;
if (!secret) throw new Error("add a secret variable in the env file");
const upload = multer({ dest: "./public/logos" });

const StoreController = express.Router();

StoreController.post(
  "/create",
  auth,
  logoUploads.single("logo"),
  async (req, res) => {
    try {
      const logoPath = "/logo/" + req.file?.filename;
      // @ts-ignore
      const ownerId = req?.decoded.user._id;
      if (!ownerId) res.status(400).json({ error: "Token missing ownerId!" });

      const { name, description, location } = req.body;

      const owner = await User.findById(ownerId);
      if (!owner) return res.status(400).json({ error: "Invalid user" });
      if (owner?.toJSON().store)
        res.status(400).json({ error: "This user already owns a store" });

      const store = new Store({
        name,
        description,
        location,
        owner: ownerId,
        logo: logoPath,
        approved: true,
      });
      const error = store.validateSync();
      if (error) {
        console.log(error);
        return res.status(400).json({ error: "Failed to create store!" });
      }

      await store.save();
      owner.store = store._id;
      await owner.save();
      const token = jwt.sign(
        { user: { ...owner?.toJSON(), password: "" } },
        secret
      );
      res.json({ store, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Failed to create store!" });
    }
  }
);

StoreController.put("/approve/:_id", auth, async (req, res) => {
  try {
    if (!req.params._id) {
      return;
    }

    // @ts-ignore
    const userEmail = req.decoded.user.email;

    if (!superAdmins.includes(userEmail)) {
      return res
        .status(400)
        .json({ error: "You don't have enough permissions!" });
    }

    const updatedStore = await Store.findByIdAndUpdate(
      req.params._id,
      {
        approved: true,
      },
      { new: true }
    );
    res.json(updatedStore);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create store!" });
  }
});

export default StoreController;
