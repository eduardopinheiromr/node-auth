import { db } from "../../db";
import { jwt } from "../../utils/token";
import { Express } from "express";

import authMiddleware from "./";
import { decrypt, encrypt } from "../../utils/encrypt";
const auth = authMiddleware();

export const authRoutes = (app: Express) => {
  app.get("/user", auth.authenticate(), (req, res) => {
    const decoded = jwt.decode(req);

    const { password, ...user } = db.findById("users", decoded.id);

    res.json(user);
  });

  app.post("/register", async (req, res) => {
    const userExists = db.find("users", "email", req.body.email);

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const createdUser = db.create("users", {
      ...req.body,
      password: await encrypt(req.body.password),
    });

    const { password, ...user } = createdUser;

    const cart = db.create("carts", { user_id: user.id, products: [] });

    const payload = { id: user.id };
    const token = jwt.encode(payload);

    res.json({ user, cart, token });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const users = db.findAll("users");

      const user = users.find(
        u => u.email === email && decrypt(password, u.password)
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        const payload = { id: user.id };

        const token = jwt.encode(payload);

        res.json({ user: userWithoutPassword, token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
};
