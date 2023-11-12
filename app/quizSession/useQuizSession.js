import { useContext } from "react"
import moment from "moment"

import useAuth from "../auth/useAuth"
import QuizSessionContext from "./context"
import { getLocalQuizSession, proceedQuizState, removeLocalQuizSession, storeLocalQuizSession } from "./storage"

export default useQuizSession = () => {
    const {quizSession, setQuizSession} = useContext(QuizSessionContext)

    const {user} = useAuth();

    const newLocalQuizSession = (tsc_number) => {
        const iat = Date.now();

        return {
            id: moment(Date.now()).format('YYYYMMDDHHmmss').toString(),
            ta_id: user.ta_id,
            tsc_number: tsc_number,
            tsc_iat: moment(Date.now()).format('YYYYMMDDHHmmss').toString(),
            ta_username: user.ta_username,
            tr_id: user.tr_id,
            ta_status: user.ta_status,
            state: 1
        }
    }

    const startQuiz = async ( tsc_number) => {
        const localQuizSession = await storeLocalQuizSession(newLocalQuizSession(tsc_number));
        setQuizSession(localQuizSession);
    }

    const proceedQuiz = async () => {
        const localQuizSession = await proceedQuizState(user.ta_id);
        setQuizSession(localQuizSession);
    }

    const saveAnswers = async (answerArray, state) => {
        const quizIdentifier = state === 1 ? 'PreQuizAnswers' : 'PostQuizAnswers';
        const localQuizSession = {...await getLocalQuizSession(user.ta_id), [quizIdentifier]: [...answerArray]};
        await storeLocalQuizSession(localQuizSession);
        console.log(localQuizSession);
        setQuizSession(localQuizSession);
    }

    const endQuiz = async () => {
        const localQuizSession = await getLocalQuizSession(user.ta_id);
        await (removeLocalQuizSession(user.ta_id))
        setQuizSession(null);
        console.log('Finished');
    }

    return {quizSession, saveAnswers, startQuiz, proceedQuiz, endQuiz, setQuizSession}
}