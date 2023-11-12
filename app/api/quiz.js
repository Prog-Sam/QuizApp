import client from './client'

const endpoint = '/getquiz'

const getQuizes = (tsc_number) => client.get(`${endpoint}?id=${tsc_number}`);

export default  {
    getQuizes
}