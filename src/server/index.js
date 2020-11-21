import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import logger from 'koa-logger';
import mongoose from 'mongoose';
// import CSRF from 'koa-csrf';

import { port, connexionString, keys } from './config.js';

console.log('connecting to MongoDB...')
mongoose.connect(connexionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('error', console.error);

const app = new Koa({ proxy: true });

// Logger
app.use(logger());

// Sessions
app.keys = keys;
app.use(session(app));

// Bodyparser
app.use(bodyParser());

// Helmet
// app.use(helmet());

// Cross Site Request Forgery
// app.use(new CSRF({
//     invalidSessionSecretMessage: 'Invalid session secret',
//     invalidSessionSecretStatusCode: 403,
//     invalidTokenMessage: 'Invalid CSRF token',
//     invalidTokenStatusCode: 403
// }));

// Auth
import passport from './auth.js';
app.use(passport.initialize());
app.use(passport.session());

// Routes
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';

app.use(indexRoutes.routes());
app.use(authRoutes.routes());

// Server
const server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

export default server;
