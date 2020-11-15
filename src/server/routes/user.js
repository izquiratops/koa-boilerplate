import Router from 'koa-router';
import UsersController from '../controllers/users.js'

const router = new Router();

router.delete('/user', UsersController.delete);

export default router;
