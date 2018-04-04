import React, {Component} from 'react'
import {Table, Input, Card, Button, Icon} from 'antd';
import uniqBy from 'lodash/uniqBy'
import uuid from 'uuid/v4'
import submitAnswers from '../actions/SubmitAnswers'
import StepZilla from 'react-stepzilla';
import AnswerDefaultQuestions from '../components/AnswerDefaultQuestions'
import AnswerDemographicQuestions from '../components/AnswerDemographicQuestions'
import AnswerOpenEndedQuestions from '../components/AnswerOpenEndedQuestions'

import {connect} from 'react-redux'

const TextArea = Input.TextArea
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

class Fillanswers extends Component {
    state = {
        step1: [],
        value: 1,
        otherSteps: [],
        answers: [],
        data: "",
        userId: "",
        questionIdSet: new Set(),
        checkedAnswers: new Set(),
        questions: {}
    }

    componentWillMount = () => {
        let questions = [];
        this.props.data.map((item) => {
            if (!questions[item.stepNum])
                questions[item.stepNum] = [];
            questions[item.stepNum].push(item)
        })
        this.setState({
            questions: questions
        })
    }

    componentWillReceiveProps = (nextProps) => {

    }

    // componentDidMount = () => {
    //     const projectId = this.props.params.projectId;
    //     getprojectquestions.getProjectQuestions(projectId, (data) => {
    //         let counter = 0;
    //         let step1 = [];
    //         let otherSteps = [];
    //         this.state.data = data;
    //         data.map((item) => {
    //             let radioOptions = [];
    //             if (item.required)
    //                 this.state.questionIdSet.add(item.questionId)
    //             if (item.stepNum == "step2") {
    //                 let answersId = uuid().split("-").join("");
    //                 for (let i = 0; i < item.options.length; i++) {
    //                     radioOptions.push(<div style={{display: "inline"}}>
    //                         <input
    //                             type="radio"
    //                             name={item.questionId}
    //                             value={parseInt(item.options[i])}
    //                             onChange={() => this.onChange(item, parseInt(item.options[i]), answersId)}></input>
    //                         <label style={{marginLeft: "5px", marginRight: "5px"}}>{item.options[i]}</label>
    //                     </div>)
    //                 }
    //
    //                 step1.push({
    //                     srno: ++counter,
    //                     question: <label id={`required${item.questionId}`}
    //                                      className={"requiredClass"}>{item.required ? `*${item.question}` : item.question}</label>,
    //                     options: radioOptions
    //                 })
    //             } else if (item.stepNum == "step3") {
    //                 if (item.type == "radio") {
    //                     let radioOptions = [];
    //                     let answersId = uuid().split("-").join("");
    //                     for (let j = 0; j < item.options.length; j++) {
    //                         if (item.options[j] != null) {
    //                             radioOptions.push(<div>
    //                                 <input
    //                                     type="radio"
    //                                     name={item.questionId}
    //                                     value={item.options[j]}
    //                                     onChange={() => this.onChange(item, item.options[j], answersId)}></input>
    //                                 <label style={{marginLeft: "5px"}}>{item.options[j]}</label>
    //                             </div>)
    //                         }
    //                     }
    //                     otherSteps.push(
    //                         <div style={{marginBottom: "10px"}}>
    //                             <Card title={<label
    //                                 id={`required${item.questionId}`}>{item.required ? "*" + ++counter + "." + item.question : ++counter + "." + item.question}</label>}
    //                                   style={{width: "100%"}}>
    //                                 {radioOptions}
    //                             </Card>
    //                         </div>
    //                     )
    //                 } else if (item.type == "checkbox") {
    //                     let radioOptions = [];
    //                     for (let j = 0; j < item.options.length; j++) {
    //                         let answersId = uuid().split("-").join("");
    //                         if (item.options[j] != null) {
    //                             radioOptions.push(<div>
    //                                 <input
    //                                     type="checkbox"
    //                                     id={`${item.questionId}${item.options[j]}`}
    //                                     value={item.options[j]}
    //                                     className={item.questionId}
    //                                     onChange={() => this.toggleCheckbox(item, item.options[j], answersId)}></input>
    //                                 <label style={{marginLeft: "5px"}}>{item.options[j]}</label>
    //                             </div>)
    //                         }
    //                     }
    //                     otherSteps.push(
    //                         <div style={{marginBottom: "10px"}}>
    //                             <Card title={<label
    //                                 id={`required${item.questionId}`}>{item.required ? "*" + ++counter + "." + item.question : ++counter + "." + item.question}</label>}
    //                                   style={{width: "100%"}}>
    //                                 {radioOptions}
    //                             </Card>
    //                         </div>
    //                     )
    //                 } else {
    //                     let answersId = uuid().split("-").join("");
    //                     otherSteps.push(
    //                         <div style={{marginBottom: "10px"}}>
    //                             <Card title={<label
    //                                 id={`required${item.questionId}`}>{item.required ? "*" + ++counter + "." + item.question : ++counter + "." + item.question}</label>}
    //                                   style={{width: "100%"}}>
    //                                 <Input id={item.questionId}
    //                                        onChange={() => this.getTextAreaValue(item, answersId)}/>
    //                             </Card>
    //                         </div>
    //                     )
    //                 }
    //             } else if (item.stepNum == "step4") {
    //                 let answersId = uuid().split("-").join("");
    //                 let dividerArr = []
    //                 otherSteps.push(
    //                     <div style={{marginBottom: "10px"}}>
    //                         <Card title={<label
    //                             id={`required${item.questionId}`}>{item.required ? "*" + ++counter + "." + item.question : ++counter + "." + item.question}</label>}
    //                               style={{width: "100%"}}>
    //                             <TextArea
    //                                 style={{resize: "none"}} id={item.questionId} rows={10}
    //                                 onChange={() => this.getTextAreaValue(item, answersId)}></TextArea>
    //                         </Card>
    //                     </div>
    //                 )
    //             }
    //         })
    //         this.setState({step1: step1, otherSteps: otherSteps})
    //     })
    // }


    // onChange = (data, option, answersId) => {
    //     this.state.answers.unshift({
    //         id: data.questionId,
    //         answer: option,
    //         answersId: answersId,
    //         question: data.question
    //     })
    //     if (data.required)
    //         this.state.checkedAnswers.add(data.questionId);
    //     this.state.answers = uniqBy(this.state.answers, 'answersId')
    // }
    //
    // toggleCheckbox = (data, option, answersId) => {
    //     let set = new Set();
    //     let checkedFlag = document.getElementById(data.questionId + option).checked
    //     if (checkedFlag) {
    //         if (data.required)
    //             this.state.checkedAnswers.add(data.questionId);
    //         this.state.answers.unshift({
    //             id: data.questionId,
    //             answer: option,
    //             answersId: answersId,
    //             question: data.question
    //         })
    //     } else {
    //         let filter = []
    //         for (let i = 0; i < this.state.answers.length; i++) {
    //             if (this.state.answers[i].answersId != answersId) {
    //                 filter.push(this.state.answers[i])
    //                 set.add(this.state.answers[i].id);
    //             }
    //         }
    //         if (!set.has(data.questionId))
    //             this.state.checkedAnswers.delete(data.questionId);
    //         this.state.answers = filter
    //     }
    // }
    //
    // getTextAreaValue = (data, answersId) => {
    //     this.state.answers.unshift({
    //         id: data.questionId,
    //         answer: document.getElementById(data.questionId).value,
    //         answersId: answersId,
    //         question: data.question
    //     })
    //     if (document.getElementById(data.questionId).value.trim().length > 0 && data.required)
    //         this.state.checkedAnswers.add(data.questionId);
    //     else
    //         this.state.checkedAnswers.delete(data.questionId);
    //     this.state.answers = uniqBy(this.state.answers, 'answersId')
    // }
    //
    // generateID = () => {
    //     this.setState({
    //         userId: uuid().split("-").join("")
    //     })
    // }
    //
    // updateIdText = (e) => {
    //     this.setState({
    //         userId: e.target.value
    //     })
    // }
    //
    // handleSubmit = () => {
    //     if (this.state.userId.trim() == "") {
    //         alert('Please enter participant id')
    //     } else {
    //         let answers = this.state.answers
    //         this.state.answers.map(answer => answer.userId = this.state.userId.trim())
    //         let data = {
    //             answers: this.state.answers,
    //             surveyId: this.state.surveyId
    //         }
    //         let questionIdSet = [...this.state.questionIdSet]
    //         let flag = false;
    //         for (let i in questionIdSet) {
    //             if (!this.state.checkedAnswers.has(questionIdSet[i])) {
    //                 document.getElementById(`required${questionIdSet[i]}`).style.color = "red"
    //                 flag = true
    //             }
    //             else
    //                 document.getElementById(`required${questionIdSet[i]}`).style.color = "black"
    //         }
    //
    //         if (flag)
    //             alert("Please answer questions marked in red")
    //         else {
    //             submitAnswers.submitAnswers(data, (response) => {
    //                 if (response.code == 200) {
    //                     alert('Answers submitted successfully');
    //                     //close window as soon as answers are submitted to avoid redundant data
    //                     window.close();
    //                 }
    //             })
    //         }
    //     }
    // }

    render = () => {
        let steps = [
            {
                name: 'Default Questions',
                component: <AnswerDefaultQuestions questions={this.state.questions.step2} props={this.props}/>
            },
            {
                name: "Demographic Questions",
                component: <AnswerDemographicQuestions questions={this.state.questions.step3} props={this.props}/>
            },

            {
                name: "Open Ended Questions",
                component: <AnswerOpenEndedQuestions questions={this.state.questions.step4} props={this.props}/>
            }
            // {
            //     name: 'Demographic Questions',
            //     component: <CreateProjectStep3 props={this.props}/>
            // }, {
            //     name: 'Open Ended Questions',
            //     component: <CreateProjectStep4 props={this.props}/>
            // },
            // {
            //     name: 'Finish',
            //     component: <CreateProjectStep5 props={this.props}/>
            // }
        ];

        return (
            <StepZilla steps={steps}/>

            // <div style={{padding: "50px"}}>
            //     <label>Participant id:</label><br/>
            //     <Input id='participantId' style={{width: "300px"}}
            //            placeholder={"Please enter your participant id"}
            //            value={this.state.userId} onChange={this.updateIdText}></Input>&nbsp;<Button
            //     title="Generate new participant id"
            //     onClick={this.generateID}><Icon
            //     type="reload"/></Button><br/><br/>
            //     <label style={{color: "red"}}>Please fill all questions marked as </label>*
            //     <Table dataSource={this.state.step1} columns={columns} indentSize={10} size={"small"}
            //            pagination={false}/>
            //     <br/>
            //     {this.state.otherSteps}
            //     <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            // </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {}
}
export default connect(mapStateToProps)(Fillanswers)