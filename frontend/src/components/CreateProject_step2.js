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
            checked: true,
            totalQuestions: 0
        })
    }

    componentDidMount = () => {
        if (this.props.props.data["step1"].template == 1) {    //TUQ
            //api call to get tuq questions
            getTUQ.gettuq((tuqData) => {
                this.formData(tuqData)
            })
        } else { //MUQ
            //api call to get muq questions
            getMUQ.gettuq(this.props.props.data["step1"].template, (muqData) => {
                this.formData(muqData)
            })
        }
    }

    formData = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].questionId = data[i].id
            data[i].key = data[i].id
            let answer = [];
            for (let j = 0; j < data[i].limit; j++) {
                answer[j] = (
                    <div style={{marginRight: "5px"}}><label className={"fontColor"}>{j + 1}</label><br/><input
                        disabled
                        style={{cursor: "not-allowed"}}
                        type='radio'/>
                    </div>)
            }
            //console.log(data[i], answer.length)
            data[i].answers = (
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
            data[i].checkboxes = (
                <Checkbox id={data[i].id + "checkbox"} defaultChecked={this.checkQuestion(data[i])}
                          onChange={() => this.toggleCheckbox(data[i])}/>
            )
        }
        this.setState({
            tableData: data,
            showLoader: false,
            totalQuestions: data.length
        })
    }

    //to check if the question was checked or unchecked by the user previously
    checkQuestion = (data) => {
        if (!this.props.props.data.step2) {
            this.state.selectedRowKeys.push(data);
            return true;
        } else {
            let questions = this.props.props.data.step2.questions
            for (let i = 0; i < questions.length; i++) {
                if (data.id == questions[i].questionId) {
                    this.state.selectedRowKeys.push(data);
                    return true;
                }
            }
            return false;
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
        if (this.state.selectedRowKeys.length < this.state.totalQuestions - 5) {
            alert('Up to 5 questions can be removed')
        } else {
            let questions = this.state.selectedRowKeys.map((question) => {
                return {
                    id: question.id,
                    key: question.key,
                    limit: question.limit,
                    question: question.question,
                    questionId: question.questionId,
                    type: question.type
                }
            });
            let step = {
                step2: {
                    questions: questions
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
                                        <td className={"answerTD"}>{item.answers}</td>
                                        <td className={"checkBoxTD"}>{item.checkboxes}</td>
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