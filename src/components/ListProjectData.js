import React, {Component} from 'react';
import {Table, Button, Popover, Icon, Divider, Modal, Input} from 'antd';
import exportcsv from '../actions/ExportCSV'

var download = require('../utils/download')
console.log(download);
const columns = [{
    title: 'Project Name',
    dataIndex: 'projectName'
}, {
    title: 'Created on',
    dataIndex: 'createdAt',
}, {title: 'Responses', dataIndex: 'responses'}, {
    title: 'Action',
    dataIndex: 'action'
}];

class ListProjectData extends Component {
    state = {
        visible: false,
        input: ""
    }
    componentWillMount = () => {
        this.formData(this.props.projectData)
    }
    componentWillReceiveProps = (nextProps) => {
        this.formData(nextProps.projectData)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    sharelink = (data) => {
        let baseUrl = `${window.location.hostname}:3000/survey_system/answers/${data}`;
        let input = (<Input value={baseUrl}></Input>);
        this.setState({link: input, visible: true})
    }

    exportcsv = (projectId) => {
        exportcsv.exportcsv(projectId, (response) => {
            if (response.code == 200)
                download.download(response.data, "export.csv", "text/csv");
            else
                this.props.dispatch({type: "DISPLAY_ERROR", message: "Error in exporting"})
        })
    }

    formData = (data) => {
        data.projects.map((item) => {
            let content = (
                <div style={{width: "100px"}}>
                    <p style={{cursor: "pointer"}} onClick={() => this.sharelink(item.projectId)}>Share <Icon
                        type="share-alt"/>
                    </p>
                    <Divider/>
                    <p style={{cursor: "pointer"}}>Clone <Icon type="copy"/></p>
                    <Divider/>
                    <p style={{cursor: "pointer"}}>Edit <Icon type="edit"/></p>
                    <Divider/>
                    <p style={{cursor: "pointer"}} onClick={() => this.exportcsv(item.projectId)}>Export csv <Icon
                        type="download"/></p>
                </div>
            );
            return item.action = (<Popover content={content} placement="bottomLeft">
                <Button><Icon type="ellipsis"/></Button>
            </Popover>)
        })

        this.setState({tableData: data.projects})
    }

    render = () => {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.tableData}/>
                <Modal
                    title="Link"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    {this.state.link}
                </Modal>
            </div>
        )
    }
}

export default ListProjectData;