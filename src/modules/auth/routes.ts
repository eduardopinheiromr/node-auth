import { db } from "../../db";
import { jwt } from "../../utils/token";
import { Express } from "express";

import authMiddleware from "./";
const auth = authMiddleware();

export const authRoutes = (app: Express) => {
  app.get("/user", auth.authenticate(), (req, res) => {
    const decoded = jwt.decode(req);

    const { password, ...user } = db.findById("users", decoded.id);

    res.json(user);
  });

  app.post("/register", (req, res) => {
    const user = req.body;

    const userCreated = db.create("users", user);

    res.json(userCreated);
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const users = db.findAll("users");

      const user = users.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        const payload = { id: user.id };

        const token = jwt.encode(payload);

        res.json({ token, user: userWithoutPassword });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
};
