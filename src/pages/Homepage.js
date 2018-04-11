import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class Homepage extends Component {
    componentDidMount = () => {
        browserHistory.push('/survey_system/list_projects')
    }

    state = {
        username: sessionStorage.getItem("username")
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.projectDataReceived == true) {
            this.setState({projectData: nextProps.projectData})
        }
    }

    listProjects = (data) => {
        browserHistory.push('/survey_system/list_projects')
    }

    createProject = () => {
        browserHistory.push('/survey_system/create_project')
    }

    logout = () => {
        sessionStorage.clear();
        browserHistory.replace('/survey_system/')
    }

    render = () => {
        return (
            <div id="homepage">
                <div id="heading">
                    <label style={{color: "#17509e", fontSize: "30px", width: "50%"}}>PITT Usability
                        Questionnaires</label><br/>
                    <label style={{color: "#17509e", width: "50%"}}>For Telehealth System (TQU) and Mobile Health Apps
                        (MAUQ)</label>
                    <div id={"welcomeDiv"} style={{float: "right"}}>
                        <label className={"fontColor"}>Welcome {this.state.username}</label><br/>
                        <a onClick={this.logout}>Logout</a>
                    </div>
                </div>
                <div className={"content"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Homepage;