import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Dashboard from "../components/Dashboard";
import {connect} from "react-redux";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Homepage extends Component{
    componentWillMount = () => {
        this.setState({projectData:this.props.projectData})
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.projectDataReceived == true) {
            this.setState({projectData:nextProps.projectData})
        }
    }

    render = () => {
        console.log("inside homepage render", this.props.projectData, this.props.projectDataReceived);
        return (
            <Layout style={{height:"100%"}}>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">Survey</Menu.Item>
                        <Menu.Item key="3">Analytics</Menu.Item>
                        <Menu.Item key="4">Reports</Menu.Item>
                    </Menu>
                </Header>
                {this.props.projectDataReceived == true ? (<Dashboard data = {this.state.projectData}/>) : ""}
            </Layout>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        projectData:store.projects.projectData,
        projectDataReceived:store.projects.projectDataReceived
    }
}

export default connect(mapStateToProps)(Homepage);