import Router from 'koa-router';
import passport from 'koa-passport';

import UsersController from '../controllers/users.js'

const router = new Router();

router.prefix(`/auth`);

router.post('/register', UsersController.add);

router.delete('/user', UsersController.delete);

router.get('/login', async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.login(user);
        // ctx.redirect('/auth/status');
        ctx.status = 200;
        ctx.body = { status: 'OK' };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);
  });

export default router;
