import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import helmet from 'koa-helmet';
import mongoose from 'mongoose';

import { port, connexionString, keys } from './config';

// Import Routes *here*

mongoose.connect(connexionString);
mongoose.connection.on('error', console.error);

const app = new Koa();
const PORT = port;

// Sessions
app.keys = keys;
app.use(session(app));

// Bodyparser
app.use(bodyParser());

// Helmet
app.use(helmet());

// Auth
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// Routes

// Server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;