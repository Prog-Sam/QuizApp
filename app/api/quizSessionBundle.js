import client from './client'

const postEndpoint = '/savebundle'

const saveQuizSessionBundle = (quizSessionBundle) => client.post(postEndpoint,quizSessionBundle);

export default  {
    saveQuizSessionBundle
}