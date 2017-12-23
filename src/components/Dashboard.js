import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import ContentData from './ContentData.js'
import CreateProject from './CreateProject.js'
import '../../node_modules/antd/lib/layout/style/index.css'
import '../../node_modules/antd/lib/menu/style/index.css'
import '../../node_modules/antd/lib/icon/style/'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Dashboard extends Component{
    componentWillMount = () => {
        //this.setState({projectData:this.props.data, initiateProjectCreation:false})
        this.dashboard(this.props.data)
    }
    componentWillReceiveProps = (nextProps) => {
        this.dashboard(nextProps.data)
        //this.setState({projectData:nextProps.data})
    }

    dashboard = (data) => {
        this.setState({display:(<ContentData projectData = {data}/>)})
    }

    createProject = () => {
        this.setState({display:(<CreateProject data = {this.props.data}/>)})
    }

    render = () => {
        return (
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        theme="dark"
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1"><span className="nav-text" onClick={() => this.dashboard(this.props.data)}>List Projects</span></Menu.Item>
                        <Menu.Item key="2"><span className="nav-text" onClick={this.createProject}>Create Project</span></Menu.Item>
                        <Menu.Item key="3"><span className="nav-text">nav 3</span></Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '24px 24px 24px 24px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                        {this.state.display}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Dashboard;