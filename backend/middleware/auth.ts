import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.TOKEN_SECRET;

interface AuthenticatedRequest extends Request {
  decoded?: any; 
}

if (!secret)
  throw new Error("Please add the TOKEN_SECRET variable in .env file");


export const auth = (req: AuthenticatedRequest, res: Response, next: Function) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(403).send({ error: "Token missing!" });
    }

    const decoded = jwt.verify(token, secret);

    if (decoded) {
      req.decoded = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to verify JWT" });
  }
};
