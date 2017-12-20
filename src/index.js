import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import store, { history } from './store.js'
import Login from './pages/Login.js'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

store.subscribe(() => {})

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/*<Route path="/survey_system/home" component = {App} />*/}
                <Route path="/survey_system/login" component = {Login}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)