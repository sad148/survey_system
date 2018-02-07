import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import registerUser from './reducers/RegisterUser.js';
import login from './reducers/Login.js';
import projects from './reducers/Projects.js';
import createProjectSteps from './reducers/CreateProjectSteps'
import errors from './reducers/Errors.js'
import demographicQuestion from './reducers/DemographicQuestion'
import toggleModal from './reducers/ToggleModal'

import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {browserHistory} from 'react-router';

const logger = createLogger({})

const store = createStore(
    combineReducers({
        registerUser,
        login,
        createProjectSteps,
        projects,
        errors,
        demographicQuestion,
        toggleModal,
        routing: routerReducer
    }), {}, applyMiddleware(logger, thunk, promise())
)

export const history = syncHistoryWithStore(browserHistory, store);

export default store;