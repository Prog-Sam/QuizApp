import _ from 'lodash';
import moment from 'moment';

const fakeDb = [
    {
        tprt_id: 1,
        tq_id: 2,
        tprt_score: 100,
        tprt_date: Date.now(),
        tprt_time: moment(Date.now()).format('HH:mm:ss'),
        tud_id: 1
    }
]

export function getPreTests(){
    return fakeDb;
}

export function getPreTest(tprt_id){
    return _.find(fakeDb, item => item.tprt_id == tprt_id);
}

export function savePreTest(item){
    const newId = fakeDb[fakeDb.length-1] + 1;

    let localPreTest = {...item, tprt_id: newId}
    fakeDb.push(localPreTest)
    return(fakeDb);
}

export function deletePreTest(tprt_id){
    return fakeDb.filter(item => item.tprt_id != tprt_id)
}