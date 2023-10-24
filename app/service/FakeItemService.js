import _ from 'lodash';

const fakeDb = [
    {
        id: 1,
        quizId: 1,
        question: 'The answer is A',
        choices: 'c1|c2|c3|c4',
        correctAnswer: 0,
    },{
        id: 2,
        quizId: 1,
        question: 'The answer is B',
        choices: 'c1|c2|c3|c4',
        correctAnswer: 1,
    },{
        id: 3,
        quizId: 1,
        question: 'The answer is C',
        choices: 'c1|c2|c3|c4',
        correctAnswer: 2,
    },{
        id: 4,
        quizId: 2,
        question: 'The answer is A',
        choices: 'c1|c2|c3|c4',
        correctAnswer: 0,
    },{
        id: 5,
        quizId: 2,
        question: 'The answer is B',
        choices: 'c1|c2|c3|c4',
        correctAnswer: 1,
    },{
        id: 6,
        quizId: 2,
        question: 'The answer is C',
        choices: 'c1|c2|c3|c4',
        correctAnswer: 2,
    }
]

export function getItems({quizId}){
    let localItem = [...fakeDb];

    if(quizId)
        localItem = localItem.filter((item) => item.quizId == quizId)

    return localItem;
}

export function getItem(id){
    return _.find(fakeDb, item => item.id == id);
}

export function saveItem(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localItem = {...item, id: newId}
    fakeDb.push(localItem)
    return(fakeDb);
}

export function deleteItem(id){
    return fakeDb.filter(item => item.id != id)
}