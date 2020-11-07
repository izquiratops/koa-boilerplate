import Router from 'koa-router';
import UserControllers from '../controllers/users'

const router = new Router();
router.prefix(`/auth`);

router.post('/register', UserControllers.add);

export default router;
