import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {browserHistory} from 'react-router';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class Homepage extends Component {
    componentWillMount = () => {

    }

    componentDidMount = () => {
        console.log("inside componentdidmount");
        browserHistory.push('/survey_system/list_projects')
    }

    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    }

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

    render = () => {
        return (
            <div id="homepage">
                <div id="heading">
                    <label style={{color: "#17509e", fontSize: "30px", width: "50%"}}>PITT Usability
                        Questionnaires</label><br/>
                    <label style={{color: "#17509e", width: "50%"}}>For Telehealth System (TQU) and Mobile Health Apps
                        (MAUQ)</label>
                    <div id={"welcomeDiv"} style={{float: "right"}}>
                        <label className={"fontColor"}>Welcome Saurabh</label><br/>
                        <a>Logout</a>
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