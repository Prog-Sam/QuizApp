import client from './client'

const endpoint = '/getstory'
const getStoryContents = (ta_username) => client.get(`${endpoint}?username=${ta_username}`);

const getStoryContent = (tsc_number) => client.get(`${endpoint}?id=${tsc_number}`);

export default  {
    getStoryContent,
    getStoryContents
}