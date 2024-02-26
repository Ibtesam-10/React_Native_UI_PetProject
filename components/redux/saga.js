import { put, takeEvery } from 'redux-saga/effects';
import { USER_LIST,SET_USER_DATA } from './constants'
//call  API in saga


function* userList() {
    const url = "https://dummyjson.com/users";
    let data = yield fetch(url); //handle aync operations because of generator functions no need to add await
    data = yield data.json();
        yield put({type: SET_USER_DATA, payload:data})// put() directly connect with reducer like reducer
}

function* SagaData() {// * handle sync data functiontion iteratable then execute
    yield takeEvery(USER_LIST, userList)

}
export default SagaData;