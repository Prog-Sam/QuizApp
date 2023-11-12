import client from './client'

const endpoint = '/getuseraccount'

const getAccount = (username) => client.get(`${endpoint}?username=${username}`);

export default  {
    getAccount
}