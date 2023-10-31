import _ from 'lodash';

const fakeDb = [
    {
        tq_id: 1,
        ta_username: 'admin',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: true,
        tr_id: 1
    },{
        tq_id: 2,
        ta_username: 'user',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: true,
        tr_id: 1
    },{
        tq_id: 3,
        ta_username: 'teacher',
        ta_password: '1234',
        ta_dateCreated: Date.now(),
        ta_status: false,
        tr_id: 1
    }
]

export function getQuizs(){
    return fakeDb;
}

export function getQuiz(tq_id){
    return _.find(fakeDb, item => item.tq_id == tq_id);
}

export function saveQuiz(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localQuiz = {...item, tq_id: newId}
    fakeDb.push(localQuiz)
    return(fakeDb);
}

export function deleteQuiz(tq_id){
    return fakeDb.filter(item => item.tq_id != tq_id)
}