import React, {Component} from 'react';
import {connect} from "react-redux";
import ListProjectData from '../components/ListProjectData.js'
import getprojectslist from '../actions/GetProjectsList'

class ListProjects extends Component {
    componentWillMount = () => {
        if (this.props.projectDataReceived == true) {
            this.setState({render: true})
        }
        else {
            if (sessionStorage.getItem("username")) {
                let userid = sessionStorage.getItem("userid")
                this.props.dispatch(getprojectslist(userid))
            }
            this.setState({render: false})
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.projectDataReceived == true)
            this.setState({render: true})
    }

    render = () => {
        return (
            this.state.render ? (<ListProjectData projectData={this.props.projectData}/>) : ""
        )
    }
}

const mapStateToProps = (store) => {
    return {
        projectData: store.projects.projectData,
        projectDataReceived: store.projects.projectDataReceived
    }
}
export default connect(mapStateToProps)(ListProjects);