import React, {Component} from 'react';
import {Icon, Checkbox} from 'antd';
import Loader from './Loader'

var _ = require('lodash/remove')
var getTUQ = require('../actions/GetTUQ');
var getMUQ = require('../actions/GetMUQ');

class CreateProjectStep2 extends Component {
    componentWillMount = () => {
        this.setState({
            tableData: [],
            selectedRowKeys: [], // Check here to configure the default column
            showLoader: true,
            checked: true
        })
    }

    componentDidMount = () => {
        if (this.props.props.data["step1"].template == 1) {    //TUQ
            //api call to get tuq questions
            getTUQ.gettuq((tuqData) => {
                for (let i = 0; i < tuqData.length; i++) {
                    tuqData[i].questionId = tuqData[i].id
                    this.state.selectedRowKeys.push(tuqData[i]);
                    tuqData[i].key = tuqData[i].id
                    tuqData[i].required = true
                    let answer = [];
                    for (let j = 0; j < tuqData[i].limit; j++) {
                        answer[j] = (
                            <div style={{marginRight: "5px"}}><label className={"fontColor"}>{j + 1}</label><br/><input
                                disabled
                                style={{cursor: "not-allowed"}}
                                type='radio'/>
                            </div>)
                    }
                    tuqData[i].answer = (
                        <div style={{display: "inline-flex"}}>
                            <Icon className={"fontColor"}
                                  style={{marginRight: "10px", marginTop: "22px"}}
                                  type="like"/>
                            {answer}
                            <Icon className={"fontColor"}
                                  style={{
                                      marginRight: "10px",
                                      marginTop: "25px"
                                  }} type="dislike"/>
                        </div>)
                    tuqData[i].checkbox = (
                        <Checkbox id={tuqData[i].id + "checkbox"} defaultChecked
                                  onChange={() => this.toggleCheckbox(tuqData[i])}/>
                    )
                }
                this.setState({
                    tableData: tuqData,
                    showLoader: false
                })
            })
        } else { //MUQ
            //api call to get muq questions
            getMUQ.gettuq((muqData) => {
                for (let i = 0; i < muqData.length; i++) {
                    muqData[i].questionId = muqData[i].id
                    this.state.selectedRowKeys.push(muqData[i]);
                    muqData[i].key = muqData[i].id
                    muqData[i].required = true
                    let answer = []
                    for (let j = 0; j < muqData[i].limit; j++) {
                        answer[j] = (
                            <div style={{marginRight: "5px"}}><label className={"fontColor"}>{j + 1}</label><br/><input
                                disabled
                                style={{cursor: "not-allowed"}}
                                type='radio'/>
                            </div>)
                    }
                    muqData[i].answer = (
                        <div style={{display: "inline-flex"}}>
                            <Icon className={"fontColor"}
                                  style={{marginRight: "10px", marginTop: "22px"}}
                                  type="like"/>
                            {answer}
                            <Icon className={"fontColor"}
                                  style={{
                                      marginRight: "10px",
                                      marginTop: "25px"
                                  }} type="dislike"/>
                        </div>)
                    muqData[i].checkbox = (
                        <Checkbox id={muqData[i].id + "checkbox"} defaultChecked
                                  onChange={() => this.toggleCheckbox(muqData[i])}/>
                    )
                }
                this.setState({
                    tableData: muqData,
                    showLoader:false
                })
            })
        }
    }

    //check/uncheck a question from tuq/muq question set
    toggleCheckbox = (data) => {
        let doc = document.getElementById(data.id + "checkbox");
        if (doc.checked) {
            //push if question is checked
            this.state.selectedRowKeys.push(data)
        } else {
            //remove if previously checked and then unchecked
            this.state.selectedRowKeys = _(this.state.selectedRowKeys, (item) => {
                return item.id != data.id;
            })
        }
        this.setState({selectedRowKeys: this.state.selectedRowKeys})
    }

    next = () => {
        //this.props.props.dispatch({type: "DISPLAY_ERROR", message: "Select at least one question"})
        if (this.state.selectedRowKeys.length < 6) {
            alert('Please select at least 5 questions')
            //this.props.props.dispatch({type: "DISPLAY_ERROR", message: "Select at least one question"})
        } else {
            let step = {
                step2: {
                    questions: this.state.selectedRowKeys
                }
            }
            this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
            this.props.props.dispatch({type: "NEXT", payload: step})
            this.props.jumpToStep(2);
        }
    }

    previous = () => {
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "PREVIOUS"})
    }

    render = () => {
        const {selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div style={{
                marginTop: "10px"
            }}>
                <div>
                    {
                        this.state.showLoader ? <Loader/> : ""
                    }
                </div>
                <div className={"tableDivBlock"}>
                    <label className={"fontColor"}>Please choose the default
                        questions provided by selecting the
                        box.</label>
                    <table style={{borderCollapse: "separate"}} cellPadding={10}>
                        <thead>
                        <tr>
                            <th className={"fontColor"} style={{textAlign: "left"}}>Question</th>
                            <th className={"fontColor"}>Answer</th>
                            <th className={"fontColor"}><input type="submit"
                                                               style={{backgroundColor: "#356fb7"}}
                                                               value={hasSelected ? `Selected ${selectedRowKeys.length}` : ''}/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tableData.map(item => {
                                return (
                                    <tr style={{border: "1px solid #17509d", padding: "10px"}}>
                                        <td width="50%" className={"fontColor questionTD"}>{item.question}</td>
                                        <td className={"answerTD"}>{item.answer}</td>
                                        <td className={"checkBoxTD"}>{item.checkbox}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <input type={"submit"}
                       id='next'
                       onClick={this.next}
                       value={"Continue"}
                       style={{
                           "marginRight": "15%",
                           "marginTop": "10px",
                           width: "15%",
                           float: "right",
                           "marginBottom": "10px",
                           paddingBottom: "5px",
                           paddingTop: "5px"
                       }}
                />
            </div>
        );
    }
}

export default CreateProjectStep2;