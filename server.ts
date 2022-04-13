import app from "./src/config/app";
import routes from "./src/routes";
import * as dotenv from "dotenv";
import { checkEnv } from "@utils/checkEnv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const port = process.env.PORT || 3000;

routes(app);

app.listen(port, () => {
  console.log("API is running at http://localhost:" + port);

  checkEnv();
});
