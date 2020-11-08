import Router from 'koa-router';
import UserControllers from '../controllers/users'

const router = new Router();

router.delete('/user', UserControllers.delete);

export default router;
