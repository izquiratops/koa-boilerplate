import User from '../models/users';

class UsersControllers {
    async add(ctx) {
        try {
            const user = await new User(ctx.request.body).save();
            ctx.body = user;
        } catch (err) {
            ctx.throw(422);
        }
    }
}

export default new UsersControllers();