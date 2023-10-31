import _ from 'lodash';
import moment from 'moment';

const fakeDb = [
    {
        tpt_id: 1,
        tq_id: 1,
        tpt_score: 100,
        tpt_date: Date.now(),
        tpt_time: moment(Date.now()).format('HH:mm:ss'),
        tud_id: 1
    }
]

export function getPostTests(){
    return fakeDb;
}

export function getPostTest(tpt_id){
    return _.find(fakeDb, item => item.tpt_id == tpt_id);
}

export function savePostTest(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localPostTest = {...item, tpt_id: newId}
    fakeDb.push(localPostTest)
    return(fakeDb);
}

export function deletePostTest(tpt_id){
    return fakeDb.filter(item => item.tpt_id != tpt_id)
}