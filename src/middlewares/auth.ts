import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
const tokenSecret = <string>process.env.TOKEN_SECRET;

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = <string>authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(token, tokenSecret);
    if (!token) {
      res.send("Invalid token");
    }

    next();
  } catch (error) {
    console.log(error);
    res.json(401);
    res.json(error);
  }
};
