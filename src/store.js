import { Router, Route, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import registerUser from './reducers/RegisterUser.js';
import login from './reducers/Login.js';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
const logger = createLogger({})

const store = createStore(
    combineReducers({
        registerUser,
        login,
        routing: routerReducer
    }),{},applyMiddleware(logger,thunk,promise())
)

export const history = syncHistoryWithStore(createBrowserHistory(), store)

export default store;