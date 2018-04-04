import React, {Component} from 'react'
import TextArea from 'antd'
import uuid from 'uuid/v4'
import uniqBy from 'lodash/uniqBy'
import FillAnswersTable from './FillAnswersTable'

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
        let answersId = uuid().split("-").join("");
        let dividerArr = []
        let step4 = [];
        console.log(data);
        data.map((item) => {
            step4.push({
                question: item.question,
                answer: (<textarea
                    style={{resize: "none"}} id={item.questionId} rows="4" cols="50"
                    onChange={() => this.getTextAreaValue(item, answersId)}></textarea>)
                // <div style={{marginBottom: "10px"}}>
                //     <Card title={<label
                //         id={`required${item.questionId}`}>{item.required ? "*" + ++counter + "." + item.question : ++counter + "." + item.question}</label>}
                //           style={{width: "100%"}}>
                //
                //     </Card>
                // </div>
            })
        })
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
        if (document.getElementById(data.questionId).value.trim().length > 0 && data.required)
            this.state.checkedAnswers.add(data.questionId);
        else
            this.state.checkedAnswers.delete(data.questionId);
        this.state.answers = uniqBy(this.state.answers, 'answersId')
    }

    render = () => {
        return (
            <div>
                <FillAnswersTable props={this.state.tableData} align={"left"} width={"50%"}
                                  instructions={"Instructions: Please type your ansewer in the box to the right."}/>
                <input type={"submit"}
                       id='next'
                       onClick={this.next}
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