import { Express } from "express";
import { uploadRoutes } from "@modules/upload/routes";
import { authRoutes } from "@modules/auth/routes";
import { cartRoutes } from "@modules/carts/routes";
import { productRoutes } from "@modules/products/routes";

export default (app: Express) => {
  app.get("/", (req, res) => {
    res.json({ status: "My API is alive!" });
  });

  authRoutes(app);
  cartRoutes(app);
  productRoutes(app);
  uploadRoutes(app);
};
