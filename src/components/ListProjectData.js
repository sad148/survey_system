import React, {Component} from 'react';
import {Modal, Input} from 'antd';
import exportcsv from '../actions/ExportCSV'
import exportspss from '../actions/ExportSPSS'
import moment from 'moment'
import {browserHistory} from 'react-router'
import Loader from './Loader'

var download = require('../utils/download')

class ListProjectData extends Component {
    state = {
        visible: false,
        input: "",
        showLoader: true
    }
    componentWillMount = () => {
        this.formData(this.props.projectData)
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({showLoader: true})
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
        this.setState({showLoader: true})
        exportcsv.exportcsv(projectId, (response) => {
            if (response.code == 200) {
                download.download(response.data, "export.csv", "text/csv");
                this.setState({showLoader: false})
            }
            else {
                this.setState({showLoader: false})
                this.props.dispatch({type: "DISPLAY_ERROR", message: "Error in exporting"})
            }
        })
    }

    exportspss = (projectId) => {
        this.setState({showLoader: true})
        exportspss.exportspss(projectId, (response) => {
            if (response.code == 200) {
                this.setState({showLoader: false})
                window.location.href = `http://localhost:3009/download/${projectId}`;
            } else {
                this.setState({showLoader: false})
                this.props.dispatch({type: "DISPLAY_ERROR", message: "Error in exporting"})
            }

        })
    }

    selectOption = (projectId) => {
        let value = document.getElementById(projectId + "action").value
        if (value === "share")
            this.sharelink(projectId)
        else if (value === "csv")
            this.exportcsv(projectId)
        else
            this.exportspss(projectId)
    }

    formData = (data) => {
        var arr = [];
        data.projects.map((item) => {
            let action = (
                <select id={item.projectId + "action"} style={{border: "0px"}}>
                    <option value={"share"}>Share</option>
                    <option value={"csv"}>Export CSV</option>
                    <option value={"spss"}>Export SPSS</option>
                </select>
            )
            arr.push(
                <tr>
                    <td className={"listProjectsTD"} style={{textAlign: "left"}}>{item.projectName}</td>
                    <td className={"listProjectsTD"}>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td className={"listProjectsTD"}>{!item.latestDateEntry ? "N/A" : moment(item.latestDateEntry).format('DD-MM-YYYY')}</td>
                    <td className={"listProjectsTD"}>{!item.response ? 0 : item.response}</td>
                    <td className={"listProjectsTD"}>{action}&nbsp;<input
                        style={{borderRadius: "0px", paddingTop: "2px", paddingBottom: "2px"}}
                        type={"submit"} onClick={() => this.selectOption(item.projectId)}
                        value={"Go"}/></td>
                </tr>
            )
        })
        this.setState({tableData: arr, showLoader: false})
    }

    callCreateProject = () => {
        browserHistory.push("/survey_system/create_project")
    }

    render = () => {
        return (
            <div>
                <div>
                    {
                        this.state.showLoader ? <Loader/> : ""
                    }
                </div>
                <div id={"listProjectsDiv"} style={{height: "100%", padding: "20px"}}>
                    <div id={"createProjectButtonDiv"}>
                        <input type="submit" style={{paddingTop: "10px", paddingBottom: "10px", borderRadius: "20px"}}
                               value={"Create Project"}
                               onClick={this.callCreateProject}></input>
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
                    <Modal
                        title={"Link"}
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        {this.state.link}
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ListProjectData;