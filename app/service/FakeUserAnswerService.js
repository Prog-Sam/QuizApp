import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        quizSessionId:1,
        userId: 3,
        itemId: 1,
        currentAnswer: 0
    },{
        id: 2,
        quizSessionId:1,
        userId: 3,
        itemId: 2,
        currentAnswer: 1
    },{
        id: 3,
        quizSessionId:1,
        userId: 3,
        itemId: 3,
        currentAnswer: 3
    }
]

export function getUserAnswers(){
    return fakeDb;
}

export function getUserAnswer(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveUserAnswer(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localUserAnswer = {...item, id: newId}
    fakeDb.push(localUserAnswer)
    return(fakeDb);
}

export function deleteUserAnswer(id){
    return fakeDb.filter(item => item.id != id)
}