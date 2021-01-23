import { put, takeLatest, all } from "redux-saga/effects";
import API from '../../utils/API';


function* fetchTodo() {
    const response = yield API.get('/')
    yield put({ type: "TODO_RECEIVED", data: { ...response.data.state }});
}

function* actionWatcher() {
    yield takeLatest("GET_TODO", fetchTodo);
}

export default function* rootSaga() {
    yield all([ actionWatcher() ]);
}

