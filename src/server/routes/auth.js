import Router from 'koa-router';
import passport from 'koa-passport';
import fs from 'fs';

// Mongo controllers
import UsersController from '../controllers/users.js'

// Routing
const router = new Router();
router.prefix(`/auth`);

// API Methods
router.get('/register', async (ctx) => {
    ctx.type = ('html');
    ctx.body = fs.createReadStream('./src/server/views/register.html');
});

router.post('/register', async (ctx) => {
    const user = await UsersController.add(ctx);
    if (user) {
        ctx.status = 200;
    } else {
        ctx.throw(400);
    }
});

router.get('/login', async (ctx) => {
    ctx.type = ('html');
    ctx.body = fs.createReadStream('./src/server/views/login.html');
});

router.post('/login', async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user); // login() & logout() --> koa-session
            ctx.status = 200;
        } else {
            ctx.throw(400);
        }
    })(ctx);
});

router.get('/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.status = 200;
    } else {
        ctx.throw(401);
    }
});

router.delete('/remove', async (ctx) => {
    if (ctx.isAuthenticated()) {
        const res = await UsersController.delete(ctx);
        if (res.deletedCount === 1) {
            ctx.status = 200;
        } else {
            ctx.throw(404);
        }
    } else {
        // Bad auth!
        ctx.throw(401);
    }
});

export default router;
