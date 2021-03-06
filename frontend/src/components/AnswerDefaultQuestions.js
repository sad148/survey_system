import React, {Component} from 'react'
import uuid from 'uuid/v4'
import uniqBy from 'lodash/uniqBy'
import {Icon} from 'antd'
import FillAnswersTable from './FillAnswersTable'

class AnswerDefaultQuestions extends Component {
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
        let step1 = []
        if (data != undefined) {
            data.map((item) => {
                let radioOptions = [];
                let answersId = uuid().split("-").join("");
                for (let i = 0; i < item.options.length; i++) {
                    radioOptions.push(
                        <div style={{marginRight: "20px"}}>
                            <label
                                className={"fontColor"}>{parseInt(item.options[i])}
                            </label><br/>
                            <input
                                name={item.questionId}
                                onChange={() => this.onChange(item, parseInt(item.options[i]), answersId)}
                                type='radio'/>
                        </div>
                    )
                }

                let answer = (
                    <div style={{display: "inline-flex"}}>
                        <Icon className={"fontColor"}
                              style={{
                                  marginRight: "10px",
                                  marginTop: "25px"
                              }} type="like"/>

                        {radioOptions}
                        <Icon className={"fontColor"}
                              style={{marginRight: "10px", marginTop: "22px"}}
                              type="dislike"/>
                    </div>)

                step1.push({
                    question: item.question,
                    answer: answer
                })
            })
        }
        this.setState({
            tableData: step1
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

    next = () => {
        let step = {
            step2: {
                answers: this.state.answers
            }
        }
        this.props.props.dispatch({type: "RESET_FILL_ANSWERS_STEPS"})
        this.props.props.dispatch({type: "NEXT", payload: step})
        this.props.next();
    }

    render = () => {
        return (
            <div>
                <FillAnswersTable props={this.state.tableData}
                                  instructions={"Instructions: Please rate these statements on the provided scale. 1 means Strongly Agree and 7 means Strongly Disagree"}/>
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

export default AnswerDefaultQuestions;