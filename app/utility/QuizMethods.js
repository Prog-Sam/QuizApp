export const generateAnswerArray = (items, quizSession) => {
    let answerArray = [];
    if(quizSession) {
        for(let i = 0; i < items.length; i++)
        answerArray.push({
            id: i,
            quizSessionuizSessionId: quizSession.id,
            userId: quizSession.userId,
            itemId: items[i].id,
            currentAnswer: null
        })
    }

    return answerArray;
}

export const pickAnswer = (answer, id, answerArray) => {
    let newAnswerArray = [...answerArray];
    const index = newAnswerArray.findIndex(obj => obj.id == id);
    newAnswerArray[index].currentAnswer = answer;

    return newAnswerArray;
}