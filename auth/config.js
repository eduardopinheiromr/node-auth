require("dotenv").config();

module.exports = {
  jwtSecret: process.env.AUTH_SECRET,
  jwtSession: { session: false },
};
