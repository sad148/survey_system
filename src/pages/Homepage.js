import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { browserHistory } from 'react-router';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Homepage extends Component{
    componentWillMount = () => {

    }

    componentDidMount = () => {

    }

    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.projectDataReceived == true) {
            this.setState({projectData:nextProps.projectData})
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
        <div style={{"height":"100%"}}>
            <Layout style={{height:"100%"}}>
                <Sider width={200} style={{ background: '#fff' }}
                       collapsible
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}
                >
                    <div className="logo">
                    </div>
                    <Menu
                        theme="dark"
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><Icon type="bars" /><span className="nav-text" onClick={this.listProjects}>List Project</span></Menu.Item>
                        <Menu.Item key="2"><Icon type="plus-circle-o" /><span className="nav-text" onClick={this.createProject}>Create Project</span></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{width:"100%"}}>
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
                    <Layout style={{ padding: '24px 24px 24px 24px' }}>
                        {this.props.children}
                    </Layout>
                </Layout>
            </Layout>
        </div>
        )
    }
}

export default Homepage;