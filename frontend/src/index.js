import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store, {history} from './store.js'
import Login from './pages/Login.js'
import Homepage from './pages/Homepage.js'
import {Router, Route, IndexRoute} from "react-router";
import AnswersSubmitConfirmation from './pages/AnswersSubmitConfirmation'
import CreateProject from './pages/CreateProject'
import ListProjects from './pages/ListProjects'
import Fillanswershome from './pages/Fillanswershome'
import About from './components/About'
import References from './components/References'

store.subscribe(() => {
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/survey_system/" component={Homepage}>
                <IndexRoute component={About}/>
                <Route path="/survey_system/login" component={Login}/>
                <Route path="/survey_system/about" component={About}/>
                <Route path="/survey_system/references" component={References}/>
                <Route path="/survey_system/list_projects" component={ListProjects}/>
                <Route path="/survey_system/create_project" component={CreateProject}/>
            </Route>
            <Route path="/survey_system/answers/:projectId" component={Fillanswershome}/>
            <Route path="/survey_system/submit" component={AnswersSubmitConfirmation}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
