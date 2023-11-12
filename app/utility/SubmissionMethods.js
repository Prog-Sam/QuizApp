import _ from 'lodash';
import quizSessionApi from '../api/quizSession';
import userAnswerApi from '../api/userAnswer';
import quizSessionBundle from '../api/quizSessionBundle';

export const extractQuizSession = (item, includeId = false) => {
    let picklist = ['ta_id','isc_iat','isc_number'];
    if(includeId)picklist.push('id');
    return _.pick(item, picklist);
}

export const injectAttribute = (item, name, value) => {
    return {...item, [name]: value}
}

export const extractUserAnswer = (item, quizSessionId) => {
    let picklist = ['tq_id', 'QuizSessionId', 'Answer', 'Type']
}

export const quizSessionBundler = (quizSession, UserAnswers) => {
    return {...quizSession,
            ['PreQuizAnswers']: [...UserAnswers.filter((ua) => ua.Type == 0)],
            ['PostQuizAnswers']: [...UserAnswers.filter((ua) => ua.Type == 1)]
        }
}

export const isDuplicate = (quizSessionBundle, queue) => {
    return _.find(queue, (item) => item.id == quizSessionBundle.id) ? true : false;
}

export const generateQuizSessionBundle = async (quizSession) => {
    //getUserAnsers
    const userAnswers = (await userAnswerApi.getUserAnswers(quizSession.id)).data;
    //use quizSession Bundler
    return quizSessionBundler(quizSession, userAnswers);
    //create new quizSessionBundle
    // return quizSessionBundle
}

export const removeUnecessaryDetails = (quizSessionBundle) => {
    let newQuizSession = {...quizSessionBundle,
        ['PreQuizAnswers']: quizSessionBundle.PreQuizAnswers.map(item => _.pick(item, ['tq_id', 'Answer', 'Type'])),
        ['PostQuizAnswers']: quizSessionBundle.PostQuizAnswers.map(item => _.pick(item, ['tq_id', 'Answer', 'Type'])),
    }
}