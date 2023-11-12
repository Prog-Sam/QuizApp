import client from './client'

const getEndpoint = '/getuseranswer'
const postEndpoint = '/saveuseranswer'

const getUserAnswers = (quizSessionId) => client.get(`${getEndpoint}?id=${quizSessionId}`);

const saveUserAnswers = (userAnswer) => client.post(postEndpoint,userAnswer);

export default  {
    getUserAnswers,
    saveUserAnswers
}