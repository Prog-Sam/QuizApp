import _ from 'lodash';

const { getUsers } = require("./FakeUserService");

const fakeDb = getUsers();

export function login(user) {
    const userInDb = _.find(fakeDb, {email: user.email, password: user.password})

    if(!userInDb) return false;
    return true;
}