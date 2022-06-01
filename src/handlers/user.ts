import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyAuthToken } from "../middlewares/auth";
import { UserStore, User } from "../models/user";

const store = new UserStore();
const tokenSecret = <string>process.env.TOKEN_SECRET;

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.json(400);
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.json(400);
    res.send(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.json(401);
    res.send(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const authenticatedUser = await store.authenticate(
      user.firstname,
      user.lastname,
      user.password
    );
    const token = jwt.sign({ user: authenticatedUser }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json("Cannot authenticate user");
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/signup", create);
  app.post("/login", verifyAuthToken, authenticate);
};

export default user_routes;
