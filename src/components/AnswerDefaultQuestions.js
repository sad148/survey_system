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
        data.map((item) => {
            let radioOptions = [];
            let answersId = uuid().split("-").join("");
            for (let i = 0; i < item.options.length; i++) {
                radioOptions.push(
                    <div style={{marginRight: "5px"}}>
                        <label
                            className={"fontColor"}>{parseInt(item.options[i])}
                        </label><br/>
                        <input
                            name={item.questionId}
                            onChange={() => this.onChange(item, parseInt(item.options[i]), answersId)}
                            type='radio'/>
                    </div>
                    // {/*<input*/
                    // }
                    // {/*type="radio"*/
                    // }
                    // {/*name={item.questionId}*/
                    // }
                    // {/*value={parseInt(item.options[i])}*/
                    // }
                    // {/*onChange={() => this.onChange(item, parseInt(item.options[i]), answersId)}></input>*/
                    // }
                    // {/*<label style={{marginLeft: "5px", marginRight: "5px"}}>{item.options[i]}</label>*/
                    // }
                )
            }

            let answer = (
                <div style={{display: "inline-flex"}}>
                    <Icon className={"fontColor"}
                          style={{marginRight: "10px", marginTop: "22px"}}
                          type="dislike"/>
                    {radioOptions}
                    <Icon className={"fontColor"}
                          style={{
                              marginRight: "10px",
                              marginTop: "25px"
                          }} type="like"/>
                </div>)

            step1.push({
                question: item.question,
                answer: answer
            })
        })
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
        console.log(this.props)
        this.props.props.dispatch({type: "RESET_FILL_ANSWERS_STEPS"})
        this.props.props.dispatch({type: "NEXT", payload: step})
        this.props.jumpToStep(1);
    }

    render = () => {
        return (
            <div>
                <FillAnswersTable props={this.state.tableData}
                                  instructions={"Instructions: Please rate these questions on the provided scale. One\n" +
                                  "                being the lowest and seven the highest."}/>
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