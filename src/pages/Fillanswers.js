import React, {Component} from 'react'
import {Table, Radio, Input, Card, Checkbox, Button} from 'antd';
import _ from 'lodash/filter';
import uniqBy from 'lodash/uniqBy'
import uuid from 'uuid/v4'
import submitAnswers from '../actions/SubmitAnswers'

const TextArea = Input.TextArea
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const getprojectquestions = require('../actions/GetProjectQuestions')
const columns = [{
    title: 'Sr.No',
    dataIndex: 'srno',
    width: "12%"
}, {
    title: 'Question',
    dataIndex: 'question',
    width: "30%"
}, {
    title: 'Options',
    dataIndex: 'options',
    width: "25%"
}]

export default class Fillanswers extends Component {
    state = {
        data: [],
        step1: [],
        value: 1,
        otherSteps: [],
        answers: [],
        data: "",
        userId: uuid().split("-").join("")
    }

    componentWillMount = () => {
        this.setState({
            surveyId: this.props.params.projectId
        })
    }

    onChange = (data, option, answersId) => {
        this.state.answers.unshift({
            id: data.questionId,
            answer: option,
            answersId: answersId,
            question: data.question,
            userId: this.state.userId
        })
        this.state.answers = uniqBy(this.state.answers, 'answersId')
    }

    toggleCheckbox = (data, option, answersId) => {
        let checkedFlag = document.getElementById(data.questionId + option).checked
        if (checkedFlag) {
            this.state.answers.unshift({
                id: data.questionId,
                answer: option,
                answersId: answersId,
                question: data.question,
                userId: this.state.userId
            })
        } else {
            let filter = []
            for (let i = 0; i < this.state.answers.length; i++) {
                console.log(this.state.answers[i].answersId, answersId);
                if (this.state.answers[i].answersId != answersId) {
                    filter.push(this.state.answers[i])
                }
            }
            this.state.answers = filter
        }
    }

    getTextAreaValue = (data, answersId) => {
        this.state.answers.unshift({
            id: data.questionId,
            answer: document.getElementById(data.questionId).value,
            answersId: answersId,
            question: data.question,
            userId: this.state.userId
        })
        this.state.answers = uniqBy(this.state.answers, 'answersId')
    }

    componentDidMount = () => {
        const projectId = this.props.params.projectId;
        getprojectquestions.getProjectQuestions(projectId, (data) => {
            let counter = 0;
            let step1 = [];
            let otherSteps = [];
            this.state.data = data;
            data.map((item) => {
                let radioOptions = [];
                if (item.stepNum == "step2") {
                    let answersId = uuid().split("-").join("");
                    for (let i in item.options) {
                        radioOptions.push(<div style={{display: "inline"}}>
                            <input
                                type="radio"
                                name={item.questionId}
                                value={parseInt(i)}
                                onChange={() => this.onChange(item, parseInt(i), answersId)}></input>
                            <label style={{marginLeft: "5px", marginRight: "5px"}}>{i}</label>
                        </div>)
                    }

                    step1.push({
                        srno: ++counter,
                        question: item.question,
                        options: radioOptions
                    })
                } else if (item.stepNum == "step3") {
                    if (item.type == "radio") {
                        let radioOptions = [];
                        let answersId = uuid().split("-").join("");
                        for (let j = 0; j < item.options.length; j++) {
                            if (item.options[j] != null) {
                                radioOptions.push(<div>
                                    <input
                                        type="radio"
                                        name={item.questionId}
                                        value={item.options[j]}
                                        onChange={() => this.onChange(item, item.options[j], answersId)}></input>
                                    <label style={{marginLeft: "5px"}}>{item.options[j]}</label>
                                </div>)
                            }
                        }
                        otherSteps.push(
                            <div style={{marginBottom: "10px"}}>
                                <Card title={++counter + "." + item.question} style={{width: "100%"}}>
                                    {radioOptions}
                                </Card>
                            </div>
                        )
                    } else if (item.type == "checkbox") {
                        let radioOptions = [];
                        for (let j = 0; j < item.options.length; j++) {
                            let answersId = uuid().split("-").join("");
                            if (item.options[j] != null) {
                                radioOptions.push(<div>
                                    <input
                                        type="checkbox"
                                        id={`${item.questionId}${item.options[j]}`}
                                        value={item.options[j]}
                                        className={item.questionId}
                                        onChange={() => this.toggleCheckbox(item, item.options[j], answersId)}></input>
                                    <label style={{marginLeft: "5px"}}>{item.options[j]}</label>
                                </div>)
                            }
                        }
                        otherSteps.push(
                            <div style={{marginBottom: "10px"}}>
                                <Card title={++counter + "." + item.question} style={{width: "100%"}}>
                                    {radioOptions}
                                </Card>
                            </div>
                        )
                    } else {

                    }
                } else if (item.stepNum == "step4") {
                    let answersId = uuid().split("-").join("");
                    let dividerArr = []
                    otherSteps.push(
                        <div style={{marginBottom: "10px"}}>
                            <Card title={++counter + "." + item.question} style={{width: "100%"}}>
                                <TextArea style={{resize: "none"}} id={item.questionId} rows={10}
                                          onChange={() => this.getTextAreaValue(item, answersId)}></TextArea>
                            </Card>
                        </div>
                    )
                }
            })
            this.setState({step1: step1, otherSteps: otherSteps})
        })
    }

    handleSubmit = () => {
        let data = {
            answers: this.state.answers,
            surveyId: this.state.surveyId
        }
        submitAnswers.submitAnswers(data, (response) => {
            if (response.code == 200) {
                alert('Answers submitted successfully');
            }
        })
        console.log(this.state.answers);
    }

    render = () => {
        return (
            <div style={{padding: "50px"}}>
                <label>Participant id:</label><br/>
                <Input id='participantId' style={{width: "300px"}} disabled={true}
                       value={this.state.userId}></Input><br/><br/>
                <Table dataSource={this.state.step1} columns={columns} indentSize={10} size={"small"}
                       pagination={false}/>
                <br/>
                {this.state.otherSteps}
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}