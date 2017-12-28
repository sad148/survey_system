import React, { Component } from 'react';
import { Layout } from 'antd';
import {connect} from "react-redux";
import ListProjectData from '../components/ListProjectData.js'
import '../../node_modules/antd/lib/layout/style/index.css'
import '../../node_modules/antd/lib/icon/style/'
const { Content } = Layout;

class ListProjects extends Component{
    componentWillMount = () => {
        console.log(this.props.projectDataReceived);
        if(this.props.projectDataReceived == true)
            this.setState({render:true})
        else
            this.setState({render:false})
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.projectDataReceived == true)
            this.setState({render:true})
    }

    render = () => {
        return (
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                    {this.state.render ? (<ListProjectData projectData = {this.props.projectData} />) : ""}
                </Content>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        projectData:store.projects.projectData,
        projectDataReceived:store.projects.projectDataReceived
    }
}
export default connect (mapStateToProps)(ListProjects);