import React, {Component} from 'react'
import TextArea from 'antd'
import uuid from 'uuid/v4'
import uniqBy from 'lodash/uniqBy'
import FillAnswersTable from './FillAnswersTable'
import store from '../store';
import submitAnswers from '../actions/SubmitAnswers'
import {browserHistory} from 'react-router';

export default class AnswerOpenEndedQuestions extends Component {
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
        let step4 = [];
        if (data != undefined) {
            data.map((item) => {
                let answersId = uuid().split("-").join("");
                step4.push({
                    question: item.question,
                    answer: (<textarea
                        style={{resize: "none"}} id={item.questionId} rows="4" cols="50"
                        onChange={() => this.getTextAreaValue(item, answersId)}></textarea>)
                })
            })
        }
        this.setState({
            tableData: step4
        })
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

    handleSubmit = () => {
        let userId = this.props.props.userId
        let surveyId = window.location.pathname.split('/')
        surveyId = surveyId[surveyId.length - 1]
        let allAnswers = store.getState().fillAnswersSteps.fillAnswersStepsData
        let finalAnswer = [];
        for (let step in allAnswers) {
            finalAnswer.push(...allAnswers[step].answers)
        }
        if (this.state.answers.length > 0)
            finalAnswer.push(...this.state.answers)

        finalAnswer.map(answer => answer.userId = userId.trim())
        let data = {
            answers: finalAnswer,
            surveyId: surveyId
        }
        submitAnswers.submitAnswers(data, (response) => {
            if (response.code == 200) {
                alert('Answers submitted successfully');
                browserHistory.replace("/survey_system/submit");
            }
        })
    }

    render = () => {
        return (
            <div>
                <FillAnswersTable props={this.state.tableData} align={"left"} width={"50%"}
                                  instructions={"Instructions: Please type your answers in the box to the right."}/>
                <input type={"submit"}
                       id='next'
                       onClick={this.handleSubmit}
                       value={"Submit"}
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