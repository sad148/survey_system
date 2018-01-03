import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './iconfont.css'
import App from './App';
import { Provider } from 'react-redux'
import store, { history } from './store.js'
import Login from './pages/Login.js'
import Homepage from './pages/Homepage.js'
import { Router, Route, IndexRoute } from "react-router";

import CreateProject from './pages/CreateProject'
import ListProjects from './pages/ListProjects'

store.subscribe(() => {})

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/survey_system/" component = {Login}/>
            <Route path="/survey_system/home" component={Homepage}>
            <IndexRoute component={ListProjects}/>
            <Route path="/survey_system/list_projects" component = {ListProjects}/>
            <Route path="/survey_system/create_project" component = {CreateProject}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
