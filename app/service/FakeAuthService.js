import _ from 'lodash';
import jwt from 'jsonwebtoken';

const { getUsers } = require("./FakeUserService");

const fakeDb = getUsers();

export function login(user) {
    const userInDb = _.find(fakeDb, {email: user.email, password: user.password})

    if(!userInDb) return { error: "Invalid email or password.", value: null, ok: false};

    const token = jwt.sign(
        { userId: user.id, name: user.name, email },
        "jwtPrivateKey"
    );

    return {ok: true, value: token};
}