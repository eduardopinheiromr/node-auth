import jwt from "jwt-simple";
import users from "../modules/auth/users";
import config from "../modules/auth/config";
import authMiddleware from "../modules/auth";
import { Express } from "express";

const auth = authMiddleware();

export default (app: Express) => {
  app.get("/", function (req, res) {
    res.json({ status: "My API is alive!" });
  });

  app.get("/user", auth.authenticate(), function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token, config.jwtSecret);

    res.json(users.find((user) => user.id === decoded.id));
  });

  app.post("/token", function (req, res) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      var user = users.find(function (u) {
        return u.email === email && u.password === password;
      });
      if (user) {
        var payload = { id: user.id };
        var token = jwt.encode(payload, config.jwtSecret);
        res.json({ token: token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });
};
