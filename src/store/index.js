import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'; 

import rootSaga from './sagas';
import reducer from './reducers';


const sagaMiddleware = createSagaMiddleware();
/*const enhancerReduxDevTools = ((typeof window === 'object') && (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined')) ?
window.__REDUX_DEVTOOLS_EXTENSION__(): () => {}

const enhancer = compose(
      applyMiddleware(sagaMiddleware),
      enhancerReduxDevTools
      )
*/
const store = createStore(
      reducer,
      applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;