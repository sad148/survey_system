import React, {Component} from 'react'
import uuid from "uuid/v4";
import uniqBy from 'lodash/uniqBy'
import FillAnswersTable from './FillAnswersTable'

export default class AnswerDemographicQuestions extends Component {
    state = {
        tableData: [],
        answers: []
    }
    componentWillMount = () => {
        this.formData(this.props.questions)
    }
    componentWillReceiveProps = (nextProps) => {
        this.formData(this.props.questions)
    }
    formData = (data) => {
        let step2 = []
        data.map((item) => {
            if (item.type == "radio") {
                let radioOptions = [];
                let answersId = uuid().split("-").join("");
                for (let j = 0; j < item.options.length; j++) {
                    if (item.options[j] != null) {
                        radioOptions.push(
                            <div style={{marginRight: "5px"}}>
                                <input
                                    name={item.questionId}
                                    value={item.options[j]}
                                    onChange={() => this.onChange(item, item.options[j], answersId)}
                                    type='radio'
                                />
                                <label style={{marginLeft: "5px"}}
                                       className={"fontColor"}>{item.options[j]}
                                </label>
                            </div>)
                    }
                }
                step2.push({
                    question: item.question,
                    answer: <div style={{display: "flex"}}>{radioOptions}</div>
                })
            } else if (item.type == "checkbox") {
                let radioOptions = [];
                for (let j = 0; j < item.options.length; j++) {
                    let answersId = uuid().split("-").join("");
                    if (item.options[j] != null) {
                        radioOptions.push(
                            <div style={{marginRight: "5px"}}>
                                <input
                                    name={item.questionId}
                                    value={item.options[j]}
                                    id={`${item.questionId}${item.options[j]}`}
                                    className={item.questionId}
                                    onChange={() => this.toggleCheckbox(item, item.options[j], answersId)}
                                    type='checkbox'
                                />
                                <label style={{marginLeft: "5px"}}
                                       className={"fontColor"}>{item.options[j]}
                                </label>
                            </div>)
                    }
                }
                step2.push({
                    question: item.question,
                    answer: <div style={{display: "flex"}}>{radioOptions}</div>
                })
            } else {
                let answersId = uuid().split("-").join("");
                step2.push({
                    question: item.question,
                    answer: <input type={"text"} id={item.questionId}
                                   style={{backgroundColor: "white", border: "1px solid #17509d"}}
                                   onChange={() => this.getTextAreaValue(item, answersId)}/>
                })
            }
        })
        this.setState({tableData: step2})
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
        let set = new Set();
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
                if (this.state.answers[i].answersId != answersId) {
                    filter.push(this.state.answers[i])
                    set.add(this.state.answers[i].id);
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

    next = () => {
        let step = {
            step3: {
                answers: this.state.answers
            }
        }
        this.props.props.dispatch({type: "RESET_FILL_ANSWERS_STEPS"})
        this.props.props.dispatch({type: "NEXT", payload: step})
        this.props.jumpToStep(2);
    }

    render = () => {
        return (
            <div>
                <FillAnswersTable props={this.state.tableData} align={"left"} width={"30%"}
                                  instructions={"Instructions: Please enter your answer by selecting or entering the correct response."}/>
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
        )
    }
}