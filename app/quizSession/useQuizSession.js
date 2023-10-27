import { useContext } from "react"
import jwtDecode from "jwt-decode"
import moment from "moment"

import useAuth from "../auth/useAuth"
import QuizSessionContext from "./context"
import { getLocalQuizSession, proceedQuizState, removeLocalQuizSession, storeLocalQuizSession } from "./storage"

export default useQuizSession = () => {
    const {quizSession, setQuizSession} = useContext(QuizSessionContext)

    const {user} = useAuth();

    const newLocalQuizSession = (quizBundleId) => {
        const iat = Date.now();
        return {
            id: moment(iat).format('YYYYMMDDHHmmss').toString(),
            userId: user.userId,
            quizBundleId,
            iat,
            state:1
        }
    }

    const startQuiz = async ( quizBundleId) => {
        const localQuizSession = await storeLocalQuizSession(newLocalQuizSession(quizBundleId));
        setQuizSession(localQuizSession);

    }

    const proceedQuiz = async () => {
        const localQuizSession = await proceedQuizState(user.userId);
        setQuizSession(localQuizSession);
    }

    const saveAnswers = async (answerArray, state) => {
        const quizIdentifier = state === 1 ? 'PreQuizAnswers' : 'PostQuizAnswers';
        const localQuizSession = {...await getLocalQuizSession(user.userId), [quizIdentifier]: [...answerArray]};
        await storeLocalQuizSession(localQuizSession);
        setQuizSession(localQuizSession);
    }

    const endQuiz = async () => {
        const localQuizSession = await getLocalQuizSession(user.userId);
        await (removeLocalQuizSession(user.userId))
        setQuizSession(null);
        console.log('Finished');
    }

    return {quizSession, saveAnswers, startQuiz, proceedQuiz, endQuiz, setQuizSession}
}