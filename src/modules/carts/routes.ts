import { Express } from "express";
import { db } from "../../db";
import { jwt } from "../../utils/token";
import authMiddleware from "../auth";
const auth = authMiddleware();

export const cartRoutes = (app: Express) => {
  app.get("/carts", auth.authenticate(), (req, res) => {
    const token = jwt.decode(req);
    const cart = db.find("carts", "user_id", token.id);
    res.json(cart);
  });

  app.post("/carts", auth.authenticate(), (req, res) => {
    const token = jwt.decode(req);
    const cart = { ...req.body, user_id: token.id };
    const cartCreated = db.create("carts", cart);
    res.json(cartCreated);
  });

  app.put("/carts", auth.authenticate(), (req, res) => {
    const token = jwt.decode(req);
    const updatedCart = req.body;
    const currentCart = db.find("carts", "user_id", token.id);
    const cartUpdated = db.update("carts", currentCart.id, {
      ...currentCart,
      ...updatedCart,
    });
    res.json(cartUpdated);
  });

  app.delete("/carts", auth.authenticate(), (req, res) => {
    const cart = req.body;
    const cartDeleted = db.remove("carts", cart.id);
    res.json(cartDeleted);
  });
};
