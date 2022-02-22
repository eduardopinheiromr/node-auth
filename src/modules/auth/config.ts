import * as dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default {
  jwtSecret: process.env.AUTH_SECRET,
  jwtSession: { session: false },
};
