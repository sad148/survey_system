import React, {Component} from 'react'
import {Table, Radio, Input, Card, Checkbox, Button} from 'antd';

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
        answers: {}
    }
    componentWillMount = () => {
        console.log();
    }

    onChange = (questionId, option) => {
        if (!this.state.answers[questionId])
            this.state.answers[questionId] = {}
        this.state.answers[questionId] = option
    }

    componentDidMount = () => {
        const projectId = this.props.params.projectId;
        getprojectquestions.getProjectQuestions(projectId, (data) => {
            let counter = 0;
            let step1 = [];
            let otherSteps = [];
            data.map((item) => {
                let radioOptions = [];
                if (item.stepNum == "step2") {
                    for (let i in item.options) {
                        radioOptions.push(<div style={{display: "inline"}}>
                            <input type="radio" name={item.questionId} value={i}
                                   onChange={() => this.onChange(item.questionId, i)}></input>
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
                        for (let j = 0; j < item.options.length; j++) {
                            if (item.options[j] != null) {
                                radioOptions.push(<div>
                                    <input type="radio" name={item.questionId} value={item.options[j]}
                                           onChange={() => this.onChange(item.questionId, j)}></input>
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
                            if (item.options[j] != null) {
                                radioOptions.push(<div>
                                    <input type="checkbox" id={item.options} value={item.options[j]} onChange={()=>this.toggleCheckbox(item.options[j])}></input>
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
                    let dividerArr = []
                    otherSteps.push(
                        <div style={{marginBottom: "10px"}}>
                            <Card title={++counter + "." + item.question} style={{width: "100%"}}>
                                <TextArea style={{resize:"none"}} id={item.questionId} rows={10} onBlur={()=>this.onChange(item.questionId)}></TextArea>
                            </Card>
                        </div>
                    )
                }
            })
            this.setState({step1: step1, otherSteps: otherSteps})
        })
    }

    handleSubmit = () => {
        console.log(this.state.answers);
    }

    render = () => {
        return (
            <div style={{padding: "50px"}}>
                <label>Participant id:</label><br />
                <Input id = 'participantId' style={{width:"100px"}}></Input><br /><br />
                <Table dataSource={this.state.step1} columns={columns} indentSize={10} size={"small"}
                       pagination={false}/>
                <br/>
                {this.state.otherSteps}
                <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}