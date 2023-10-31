import client from "./client";

const login = (username, password) => client.post('/getlogin', {username,password});

export default {
    login
}