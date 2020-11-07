import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import logger from 'koa-logger';
import mongoose from 'mongoose';

import indexRoutes from './routes/index';
import authRoutes from './routes/auth';

import { port, connexionString, keys } from './config';

mongoose.connect(connexionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error);

const app = new Koa();

// Logger
app.use(logger());

// Sessions
app.keys = keys;
app.use(session(app));

// Bodyparser
app.use(bodyParser());

// Helmet
// app.use(helmet());

// Auth
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(indexRoutes.routes());
app.use(authRoutes.routes());

// Server
const server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

module.exports = server;