import React, {Component} from 'react'
import {Input, Icon} from 'antd';
import {browserHistory} from "react-router";
import getprojectslist from '../actions/GetProjectsList'
import createproject from '../actions/CreateProject'
import Loader from './Loader'

const TextArea = Input.TextArea

class CreateProjectStep5 extends Component {
    state = {
        showLoader: false
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("inside willreceiveprops", nextProps)
    }

    handleSubmit = () => {
        let finalData = this.props.props.data
        finalData["userid"] = sessionStorage.getItem("userid");
        createproject.createProject(finalData, (resp) => {
            if (resp.code == 200) {
                this.setState({
                    showLoader: false
                })
                alert('Project created successfully')
                browserHistory.replace('/survey_system/list_projects');
                this.props.props.dispatch({type: "PROJECT_CREATED"})
                this.props.props.dispatch(getprojectslist(finalData["userid"]));
            } else {
                this.setState({
                    showLoader: false
                })
                alert('Error in creating project')
            }
        })
    }

    render = () => {
        return (
            <div style={{
                marginTop: "10px"
            }}>
                <div>
                    {this.state.showLoader ? <Loader/> : ""}
                </div>
                <div style={{
                    paddingTop: "10px", paddingRight: "40px", paddingLeft: "40px", paddingBottom: "40px",
                    backgroundColor: "#f1f2f2",
                    width: "60%",
                    marginLeft: "25%"
                }}>
                    <label className={"fontColor"} style={{fontSize: "x-large"}}>Project
                        Overview</label>
                    <div style={{marginTop: "5%"}}>
                        <label className={"fontColor"} style={{width: "100%"}}>Name</label><br/>
                        <input type={"text"} value={this.props.props.data.step1.project_name}
                               style={{width: "90%", cursor: "not-allowed", backgroundColor: "white"}} disabled></input><Icon
                        onClick={() => this.props.jumpToStep(0)}
                        style={{color: "#17509e", cursor: "pointer"}} type="edit"/>
                    </div>
                    <div>
                        <label className={"fontColor"}>Description</label><br/>
                        <TextArea type="text" style={{
                            borderRadius: "0px",
                            width: "90%",
                            cursor: "not-allowed",
                            backgroundColor: "white",
                            color: "black"
                        }} disabled
                                  value={this.props.props.data.step1.description || ""}
                                  autosize={{minRows: 4, maxRows: 4}}/><Icon
                        style={{color: "#17509e", cursor: "pointer"}}
                        onClick={() => this.props.jumpToStep(0)}
                        type="edit"/>
                    </div>
                    <div>
                        <label className={"fontColor"}>Default Questions</label><br/>
                        <input type={"text"} value={this.props.props.data.step2.questions.length}
                               style={{cursor: "not-allowed", backgroundColor: "white"}} disabled></input><Icon
                        onClick={() => this.props.jumpToStep(1)}
                        style={{color: "#17509e", cursor: "pointer"}} type="edit"/>
                    </div>
                    <div>
                        <label className={"fontColor"}>Demographic Questions</label><br/>
                        <input type={"text"} value={this.props.props.data.step3.questions.length}
                               style={{cursor: "not-allowed", backgroundColor: "white"}} disabled></input><Icon
                        onClick={() => this.props.jumpToStep(2)}
                        style={{color: "#17509e", cursor: "pointer"}} type="edit"/>
                    </div>
                    <div>
                        <label className={"fontColor"}>Open ended Questions</label><br/>
                        <input type={"text"} value={this.props.props.data.step4.questions.length}
                               style={{cursor: "not-allowed", backgroundColor: "white"}} disabled></input><Icon
                        onClick={() => this.props.jumpToStep(3)}
                        style={{color: "#17509e", cursor: "pointer"}} type="edit"/>
                    </div>
                    <div>
                        <label className={"fontColor"}>Total Questions</label><br/>
                        <input type={"text"}
                               value={this.props.props.data.step2.questions.length + this.props.props.data.step3.questions.length + this.props.props.data.step4.questions.length}
                               style={{cursor: "not-allowed", backgroundColor: "white"}} disabled></input>
                    </div>
                </div>
                <input type={"submit"} style={{
                    "marginRight": "15%",
                    "marginTop": "10px",
                    "marginBottom": "10px",
                    width: "15%",
                    float: "right",
                    paddingBottom: "5px",
                    paddingTop: "5px"
                }} value={"Submit"} onClick={this.handleSubmit}></input>
            </div>
        )
    }
}

export default CreateProjectStep5;