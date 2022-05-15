import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Product, ProductStore } from "../models/product";

const store = new ProductStore();
const tokenSecret = <string>process.env.TOKEN_SECRET;

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json("Cannot fetch all users");
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const authorizationHeader = req.headers.authorization;
  const token = <string>authorizationHeader?.split(" ")[1];
  try {
    jwt.verify(token, tokenSecret);
  } catch (error) {
    res.status(401);
    res.json(`Invalid token ${error}`);
    return;
  }
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400);
    res.json("Cannot create new product");
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await store.show(id);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(`Cannot show product of id ${req.body.params}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const removedProduct = await store.remove(id);
    res.json(removedProduct);
  } catch (error) {
    res.status(400);
    res.json("Cannot remove product");
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.post("/product", create);
  app.get("/products/:id", show);
  app.delete("/products/:id", remove);
};

export default product_routes;
