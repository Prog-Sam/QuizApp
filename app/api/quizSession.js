import client from './client'

const endpoint = '/getquizsession'
const postEndpoint = '/savequizsession'

const getQuizSession = (username) => client.get(`${endpoint}?username=${username}`);

const saveQuizSession = (quizSession) => client.get(postEndpoint, quizSession);

export default  {
    getQuizSession,
    saveQuizSession
}