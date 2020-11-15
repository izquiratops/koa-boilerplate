import User from '../models/users.js';

class UsersControllers {
    async add(ctx) {
        try {
            const user = await new User(ctx.request.body).save();
            ctx.body = user;
        } catch (err) {
            // There's already someone with that name
            ctx.throw(422);
        }
    }

    async delete(ctx) {
        try {
            const res = await User.deleteOne(ctx.request.query);
            if (res.deletedCount == 0) {
                ctx.throw(404);
            } else {
                ctx.body = res;
            }
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            }
            ctx.throw(500);
        }
    }
}

export default new UsersControllers();
