import bcrypt from 'bcryptjs';

import User from '../models/users.js';

class UsersControllers {
    async add(ctx) {
        try {
            // TODO: async bcrypt
            const user = ctx.request.body;
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(user.password, salt);

            await new User({
                username: user.username,
                password: hash
            }).save();
            ctx.status = 200;
        } catch (err) {
            // There's already someone with that name
            ctx.throw(422);
        }
    }

    async delete(ctx) {
        try {
            const res = await User.deleteOne(ctx.request.body);
            if (res.deletedCount === 0) {
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
