import { Express } from "express";
import { db } from "../../db";

import authMiddleware from "../auth";
const auth = authMiddleware();

export const productRoutes = (app: Express) => {
  app.get("/products", (req, res) => {
    const products = db.findAll("products");
    res.json(products);
  });

  app.post("/products", auth.authenticate(), (req, res) => {
    const product = req.body;
    const productCreated = db.create("products", product);
    res.json(productCreated);
  });

  app.put("/products", auth.authenticate(), (req, res) => {
    const product = req.body;
    const productUpdated = db.update("products", product.id, product);
    res.json(productUpdated);
  });

  app.delete("/products", auth.authenticate(), (req, res) => {
    const product = req.body;
    const productDeleted = db.remove("products", product.id);
    res.json(productDeleted);
  });
};
