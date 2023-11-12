import _ from "lodash";
import { shuffle } from "./shuffle";

export const generateAnswerArray = (items, quizSession) => {
    let answerArray = [];
    if(quizSession) {
        for(let i = 0; i < items.length; i++)
        answerArray.push({
            id: i,
            QuizSessionId: quizSession.id,
            tq_id: items[i].tq_id,
            Answer: null,
            Type: 0,
        })
    }

    return answerArray;
}

export const pickAnswer = (answer, tq_id, answerArray, quizSession) => {
    let newAnswerArray = [...answerArray];
    const index = newAnswerArray.findIndex(obj => obj.tq_id == tq_id);
    newAnswerArray[index].Answer = answer;
    newAnswerArray[index].Type = quizSession.state == 1 ? 0 : 1;

    return newAnswerArray;
}

export const allQuestionsAnswered = (answerArray=[]) => {
    for(let i = 0; i < answerArray.length; i++)
        if(answerArray[i].Answer == null) return {ok: false, message:`Please answer question ${i+1}`};
    return {ok: true, message: 'All questions answered.'}
}

export const generateChoices = (question) => {
    
    const choicesStringArray = shuffle(
        [
            question.tq_correctAnswer,
            question.tq_selectionA,
            question.tq_selectionB,
            question.tq_selectionC
        ]
    )
        let choiceArray = [];
        for(let i=0; i < choicesStringArray.length; i++){
            choiceArray.push({
                tq_id: question.tq_id,
                index: i,
                value: choicesStringArray[i]
            });
        }
        return choiceArray;
    }

export const generateChoiceArray = (questions) => {
    let choiceArray = [];

    for(let question of questions)
        choiceArray.push(generateChoices(question))

    return choiceArray;
}

export const extractScore = (answers, questions) => {
    let result = {
        questionScore: 0,
        score: 0,
    }

    for(answer of answers) {
        const question = _.find(questions,(q) => q.tq_id == answer.tq_id);
        result.questionScore += parseInt(question.tq_points);
        if(answer.Answer == question.tq_correctAnswer)
        result.score += parseInt(question.tq_points);
        // console.log(answer.Answer, question.tq_correctAnswer, answer.Answer == question.tq_correctAnswer);
        // console.log(answer.Answer, question);
    }

    return result;
}