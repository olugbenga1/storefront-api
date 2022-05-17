import express, { Request, Response } from "express";
import { Order, OrderStore, OrderProducts } from "../models/order";
import { verifyAuthToken } from "./user";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json("Cannot fetch all orders");
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await store.show(id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json("Cannot get order");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body;
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400);
    res.json("Cannot create new order");
  }
};

const addProducts = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const quantity = req.body.quantity;
  const productId = req.body.productId;
  try {
    const addNewProduct = await store.addProducts(quantity, orderId, productId);
    res.json(addNewProduct);
  } catch (error) {
    res.status(400);
    res.json("Cannot create new order");
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders/:id", show);
  app.post("/orders/:orderId/products", verifyAuthToken, addProducts);
};

export default order_routes;
