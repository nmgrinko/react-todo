import { put, takeLatest, all } from "redux-saga/effects";
import API from '../../utils/API';


function* fetchTodoGet() {
    try {
        const response = yield API.get('/');
        yield put({ type: "TODO_RECEIVED", data: { ...response.data.state }});
    } catch (error) {
        alert('Server is not available! Please update page :)');
        console.log('Server is not available!', error);
    }
}

function* actionWatcherGet() {
    yield takeLatest("GET_TODO", fetchTodoGet);
}

function* fetchTodoPut(state) {
    try {
        yield API.put('/', {state: state.state});
    } catch (error) {
        console.log('Server is not update!', error);
    }    
}

function* actionWatcherPut() {
    yield takeLatest("PUT_TODO", fetchTodoPut);
}

export default function* rootSaga() {
    yield all([ actionWatcherGet(), actionWatcherPut() ]);
}

