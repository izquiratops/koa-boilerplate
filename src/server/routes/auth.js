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

router.post('/register', UsersController.add);

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

router.delete('/remove', UsersController.delete);

export default router;
