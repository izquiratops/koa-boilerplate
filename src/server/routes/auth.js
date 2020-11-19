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
      // login() & logout() forman parte de koa-session
      ctx.login(user);
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

export default router;
