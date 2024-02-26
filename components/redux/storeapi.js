import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

const middlewares = [thunk]

const storeapi = createStore( applyMiddleware(...middlewares))

export default storeapi