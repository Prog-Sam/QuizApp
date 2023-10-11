import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        userId: 3,
        quizId: 1,
    },
]

export function getQuizSessions(){
    return fakeDb;
}

export function getQuizSession(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveQuestionSession(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localQuestionSession = {...item, id: newId}
    fakeDb.push(localQuestionSession)
    return(fakeDb);
}

export function deleteQuizSession(id){
    return fakeDb.filter(item => item.id != id)
}