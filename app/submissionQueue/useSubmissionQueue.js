import { useContext } from "react"
import moment from "moment"

import { getQueue, removeQueue, storeQueue} from "./storage"
import { isDuplicate } from "../utility/SubmissionMethods"
import quizSessionBundleApi from "../api/quizSessionBundle"

export default useQuizSession = () => {

    const addToSubmissionQueue = async (quizSessionBundle) => {
        const queue = await getQueue();
        if(isDuplicate(quizSessionBundle,queue)) return true;
        if(!await storeQueue([...queue, quizSessionBundle])) return false;
        return true;
    }

    const removeFromeSubmissionQueue = async (quizSessionId) => {
        const queue = await getQueue();
        const newQueue = [...queue.filter(item => item.id != quizSessionId)]
        await storeQueue([...newQueue]);
        return queue;
    }

    const submitToServer = async () => {
        const queue = await getQueue();
        let newQueue = [...queue] || [];
        try{
            for(let i = 0; i < newQueue.length; i++)
            {
                const {ok, data} = await quizSessionBundleApi.saveQuizSessionBundle(newQueue[i]);
                if(!ok) return {ok: false, data: data}
                await removeFromeSubmissionQueue(newQueue[i].id); 
            }
            console.log('Queue has been uploaded');
        }
        catch(ex){
            console.log(ex);
        }
    }

    return {addToSubmissionQueue, removeFromeSubmissionQueue, submitToServer}
}