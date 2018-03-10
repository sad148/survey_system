import React, {Component} from 'react'
import {Table, Radio, Input, Card, Checkbox, Button, Icon} from 'antd';
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
        step1: [],
        value: 1,
        otherSteps: [],
        answers: [],
        data: "",
        userId: ""
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
            question: data.question
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
                question: data.question
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
            question: data.question
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
                    for (let i = 0; i < item.options.length; i++) {
                        radioOptions.push(<div style={{display: "inline"}}>
                            <input
                                type="radio"
                                name={item.questionId}
                                value={parseInt(item.options[i])}
                                onChange={() => this.onChange(item, parseInt(item.options[i]), answersId)}></input>
                            <label style={{marginLeft: "5px", marginRight: "5px"}}>{item.options[i]}</label>
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
                        let answersId = uuid().split("-").join("");
                        otherSteps.push(
                            <div style={{marginBottom: "10px"}}>
                                <Card title={++counter + "." + item.question} style={{width: "100%"}}>
                                    <Input id={item.questionId}
                                           onChange={() => this.getTextAreaValue(item, answersId)}/>
                                </Card>
                            </div>
                        )
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

    generateID = () => {
        this.setState({
            userId: uuid().split("-").join("")
        })
    }

    updateIdText = (e) => {
        this.setState({
            userId: e.target.value
        })
    }

    handleSubmit = () => {
        if (this.state.userId.trim() == "") {
            alert('Please enter participant id')
        } else {
            let answers = this.state.answers
            this.state.answers.map(answer => answer.userId = this.state.userId.trim())
            let data = {
                answers: this.state.answers,
                surveyId: this.state.surveyId
            }
            submitAnswers.submitAnswers(data, (response) => {
                if (response.code == 200) {
                    alert('Answers submitted successfully');
                }
            })
        }
    }

    render = () => {
        return (
            <div style={{padding: "50px"}}>
                <label>Participant id:</label><br/>
                <Input id='participantId' style={{width: "300px"}}
                       placeholder={"Please enter your participant id"}
                       value={this.state.userId} onChange={this.updateIdText}></Input>&nbsp;<Button
                title="Generate new participant id"
                onClick={this.generateID}><Icon
                type="reload"/></Button><br/><br/>
                <Table dataSource={this.state.step1} columns={columns} indentSize={10} size={"small"}
                       pagination={false}/>
                <br/>
                {this.state.otherSteps}
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}