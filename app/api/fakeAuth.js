import client from "./client";

const login = (email, password) => {
    // return client.post('/auth', {email,password});

    if(email == 'test@gmail.com' && password == '12345')
    return {
            data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY5ODE2MDk0OX0.7atp68OAl0DU994xu5N-sSEdedAPUAGBO2qLWQKNDsU',
            ok: true
        }
    return {
        ok: false,
        data: 'Login Failed'
    }
}

export default {
    login
}