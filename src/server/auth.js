import passport from "koa-passport";
import bcrypt from "bcryptjs";
import LocalStrategy from "passport-local";

import User from "./models/users.js";

const options = {};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        const validate = bcrypt.compareSync(password, user.password);
        if (validate) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => done(err, null));
  }, options)
);

export default passport;
