import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import SagaData from './saga'

const sagaMiddelware = createSagaMiddleware();

const store=configureStore({
    reducer:rootReducer,
    middleware:()=>[sagaMiddelware]
}
);

sagaMiddelware.run(SagaData);
export default store;

