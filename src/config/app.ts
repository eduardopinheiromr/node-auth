import express from "express";
import bodyParser from "body-parser";
import authMiddleware from "../modules/auth";

const auth = authMiddleware();
const app = express();

app.use(bodyParser.json());
app.use(auth.initialize());

export default app;
