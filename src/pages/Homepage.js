import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {Form} from "antd/lib/index";
import {connect} from "react-redux";

class Homepage extends Component {
    state = {
        loginDone: false
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.loginSuccess) {
            this.setState({username: sessionStorage.getItem("username"), loginDone: true})
        }
        if (nextProps.projectDataReceived == true) {
            this.setState({projectData: nextProps.projectData})
        }
    }

    logout = () => {
        this.setState({loginDone: false})
        sessionStorage.clear();
        browserHistory.replace('/survey_system/about')
    }

    render = () => {
        let style = (this.state.loginDone == false) ? {display: "flex"} : {
            display: "flex",
            justifyContent: "space-between"
        }

        let style1 = (this.state.loginDone == false) ? {
            display: "flex",
            width: "45%",
            justifyContent: "space-around",
            marginTop: "10px"
        } : {display: "flex", width: "45%", justifyContent: "space-between", marginTop: "10px"}
        return (
            <div id="homepage">
                <div id="heading" style={style}>
                    <div>
                        <label style={{color: "#17509e", fontSize: "30px", width: "50%"}}>PITT Usability
                            Questionnaires</label><br/>
                        <label style={{color: "#17509e", width: "50%"}}>For Telehealth System (TQU) and Mobile Health
                            Apps
                            (MAUQ)</label>
                    </div>
                    <div style={style1}>
                        <Link to="/survey_system/about" className={"fontColor"} style={{fontSize: "15px"}}>About</Link>
                        <Link to="/survey_system/references" className={"fontColor"}
                              style={{fontSize: "15px"}}>References</Link>
                        {(this.state.loginDone == false) ?
                            <Link to="/survey_system/login" className={"fontColor"}
                                  style={{fontSize: "15px"}}>Login</Link> :
                            <Link to="/survey_system/list_projects" className={"fontColor"}
                                  style={{fontSize: "15px"}}>Projects</Link>}
                    </div>
                    {
                        (this.state.loginDone) ? <div id={"welcomeDiv"} style={{marginTop: "10px"}}>
                            <label className={"fontColor"}>Welcome {this.state.username}</label><br/>
                            <a onClick={this.logout}>Logout</a>
                        </div> : ""
                    }
                </div>
                <div className={"content"}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store.login.loginSuccess
    }
}

export default connect(mapStateToProps)(Homepage);
