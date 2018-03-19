import React, {Component} from 'react';
import {Table, Button, Popover, Icon, Divider, Modal, Input} from 'antd';
import exportcsv from '../actions/ExportCSV'
import exportspss from '../actions/ExportSPSS'

var download = require('../utils/download')
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
        console.log(this.props.projectData)
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

    exportspss = (projectId) => {
        exportspss.exportspss(projectId, (response) => {
            if (response.code == 200) {
                window.location.href = `http://localhost:3009/download/${projectId}`;
            } else
                this.props.dispatch({type: "DISPLAY_ERROR", message: "Error in exporting"})
        })
    }

    formData = (data) => {
        var arr = [];
        data.projects.map((item) => {
            arr.push(
                <tr>
                    <td style={{textAlign: "left"}}>{item.projectName}</td>
                    <td>{item.createdAt}</td>
                    <td>latest date entry</td>
                    <td>0</td>
                    <td>Action</td>
                </tr>
            )
            // let content = (
            //     <div style={{width: "100px"}}>
            //         <p style={{cursor: "pointer"}} onClick={() => this.sharelink(item.projectId)}>Share <Icon
            //             type="share-alt"/>
            //         </p>
            //         <Divider/>
            //         <p style={{cursor: "pointer"}}>Clone <Icon type="copy"/></p>
            //         <Divider/>
            //         <p style={{cursor: "pointer"}}>Edit <Icon type="edit"/></p>
            //         <Divider/>
            //         <p style={{cursor: "pointer"}} onClick={() => this.exportcsv(item.projectId)}>Export csv <Icon
            //             type="download"/></p>
            //         <Divider/>
            //         <p style={{cursor: "pointer"}} onClick={() => this.exportspss(item.projectId)}>Export spss <Icon
            //             type="download"/></p>
            //     </div>
            // );
            // return item.action = (<Popover content={content} placement="bottomLeft">
            //     <Button><Icon type="ellipsis"/></Button>
            // </Popover>)
        })
        this.setState({tableData: arr})
    }

    render = () => {
        return (
            <div id={"listProjectsDiv"} style={{height: "100%", padding: "20px"}}>
                <div id={"createProjectButtonDiv"}>
                    <input type="submit" value={"Create Project"}></input>
                </div>
                <div style={{height: "100%"}}>
                    <table style={{borderCollapse: "separate"}}>
                        <tr>
                            <th style={{fontSize: "40px"}}>Projects</th>
                            <th style={{textAlign: "center"}}>Date Created</th>
                            <th style={{textAlign: "center"}}>Latest Data Entry</th>
                            <th style={{textAlign: "center"}}>Number of participants</th>
                            <th style={{textAlign: "center"}}>Action</th>
                        </tr>
                        {this.state.tableData}
                    </table>
                </div>
            </div>
        )
    }
}

export default ListProjectData;
{/*<div>*/
}
{/*<Modal*/
}
{/*title="Link"*/
}
{/*visible={this.state.visible}*/
}
{/*footer={null}*/
}
{/*onCancel={this.handleCancel}*/
}
{/*>*/
}
{/*{this.state.link}*/
}
{/*</Modal>*/
}
{/*</div>*/
}