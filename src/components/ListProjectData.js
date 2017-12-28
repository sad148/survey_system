import React, { Component } from 'react';
import { Table } from 'antd';
import '../../node_modules/antd/lib/table/style/index.css'
import '../../node_modules/antd/lib/pagination/style/index.css'

const columns = [{
    title: 'Project Id',
    dataIndex: 'project_id',
}, {
    title: 'Questions',
    dataIndex: 'questions'
}, {
    title: 'Languages',
    dataIndex: 'languages',
},{
    title:'Action',
    dataIndex:'action'
}];

class ListProjectData extends Component{
    componentWillMount = () => {
        this.formData(this.props.projectData)
    }
    componentWillReceiveProps = (nextProps) => {
        this.formData(nextProps.projectData)
    }

    formData = (data) => {
        //let tableData = []
        this.setState({tableData:data.projects})
    }

    render = () => {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.tableData}/>
            </div>
        )
    }
}

export default ListProjectData;