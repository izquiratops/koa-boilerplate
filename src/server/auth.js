import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from './models/users.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    return User.findById(id)
        .then((user) => done(null, user))
        .catch((err) => done(err, null));
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            if (password === user.password) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => done(err, null));
}));

export default passport;