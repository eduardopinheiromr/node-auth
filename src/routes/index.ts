import jwt from "jwt-simple";
import config from "../modules/auth/config";
import authMiddleware from "../modules/auth";
import { Express } from "express";
import { db } from "../db";

const auth = authMiddleware();

export default (app: Express) => {
  app.get("/", function (req, res) {
    res.json({ status: "My API is alive!" });
  });

  app.get("/user", auth.authenticate(), function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, config.jwtSecret);

    const user = db.findById("users", decoded.id);

    res.json(user);
  });

  app.post("/register", (req, res) => {
    const user = req.body;

    const userCreated = db.create("users", user);

    res.json(userCreated);
  });

  app.post("/login", function (req, res) {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      const users = db.findAll("users");

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        const payload = { id: user.id };
        const token = jwt.encode(payload, config.jwtSecret);

        res.json({ token, user: userWithoutPassword });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
};
