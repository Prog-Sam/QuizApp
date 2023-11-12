import client from './client'

const endpoint = '/getuserdetails'

const getUser = (id) => client.get(`${endpoint}?id=${id}`);

export default  {
    getUser
}