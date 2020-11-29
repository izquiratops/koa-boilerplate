import bcrypt from 'bcryptjs';

import User from '../models/users.js';

class UsersControllers {
    async add(ctx) {
        try {
            // TODO: async bcrypt
            const user = ctx.request.body;
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(user.password, salt);

            return new User({
                username: user.username,
                password: hash
            }).save();
        } catch (err) {
            // There's already someone with that name
            ctx.throw(500);
        }
    }

    async delete(ctx) {
        try {
            return User.deleteOne(ctx.request.body);
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404);
            } else {
                ctx.throw(500);
            }
        }
    }
}

export default new UsersControllers();
