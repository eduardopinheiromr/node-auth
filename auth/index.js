const passport = require("passport");
const passportJWT = require("passport-jwt");
const users = require("./users.js");
const config = require("./config.js");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = function () {
  const strategy = new Strategy(params, function (payload, done) {
    const user = users[payload.id] || null;
    if (user) {
      return done(null, { id: user.id });
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", config.jwtSession);
    },
  };
};
