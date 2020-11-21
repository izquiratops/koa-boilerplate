import Router from 'koa-router';
import fs from "fs";

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
});

router.get('/home', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/home.html');
  } else {
    ctx.throw(401);
  }
});

export default router;
