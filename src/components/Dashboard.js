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
        //this.dashboard(this.props.data)
    }
    componentWillReceiveProps = (nextProps) => {
        //this.dashboard(nextProps.data)
    }

    render = () => {
        return (
            <Layout style={{ padding: '24px 24px 24px 24px' }}>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                    {this.state.display}
                </Content>
            </Layout>
        )
    }
}

export default Dashboard;