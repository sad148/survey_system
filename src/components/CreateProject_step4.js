import React, {Component} from 'react'
import {arrayMove} from 'react-sortable-hoc';
import {Card, Input, Button, Checkbox} from 'antd';
import Sortable from 'react-sortablejs';

var uuid = require('uuid/v1')


class OpenEndedQuestions extends Component {
    state = {
        items: [],
        checkedQues: [],
        questions: [],
        finalData: [],
        showLoader: false,
        selected: 0
    };

    componentDidMount = () => {
        let display = []
        console.log("inside idi mount");
        if (this.props.props.data.step4) {
            let data = this.props.props.data.step4.questions
            for (let i = 0; i < data.length; i++) {
                let id = uuid().split("-").join("");
                this.state.questions.push({
                    question: data[i].question,
                    questionId: id
                })
                display.push(<tr>
                        <td height="10" className={"fontColor questionTD"} style={{height: "10px"}}>{data[i].question}</td>
                        <td height="10" className={"checkBoxTD"} style={{height: "10px"}}>
                            <Checkbox
                                style={{width: "5%", float: "right"}}
                                onChange={() => this.toggleCheckbox(id + 'checkbox')}
                                defaultChecked
                                id={id + 'checkbox'}
                            />
                        </td>
                    </tr>
                )
            }
            this.setState({
                items: display
            })
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    addNewQuestion = () => {
        let question = document.getElementById("question").value;
        if (question.trim().length == 0) {
            return alert('Please enter question')
        }
        this.setState(prevState => {
            selected: prevState.selected++
        })
        let id = uuid().split("-").join("");
        this.state.questions.push({
            question: question,
            questionId: id
        })
        let display = (<tr>
                <td height="10" className={"fontColor questionTD"} style={{height: "10px"}}>{question}</td>
                <td height="10" className={"checkBoxTD"} style={{height: "10px"}}><Checkbox
                    style={{width: "5%", float: "right"}}
                    onChange={() => this.toggleCheckbox(id + 'checkbox')}
                    defaultChecked
                    id={id + 'checkbox'}/></td>
            </tr>
        )
        this.setState(prevState => {
            return {items: [...prevState.items, display]}
        })
    }

    toggleCheckbox = (id) => {
        console.log(id);
        if (document.getElementById(id).checked)
            this.setState(prevState => {
                selected: prevState.selected++
            })
        else
            this.setState(prevState => {
                selected: prevState.selected--
            })
    }

    handleSubmit = () => {
        let step4 = [];
        this.state.questions.forEach((data) => {
            if (document.getElementById(data.questionId + 'checkbox').checked)
                step4.push(data)
        })

        let step = {
            step4: {
                questions: step4
            }
        }
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "NEXT", payload: step})
        this.props.jumpToStep(4);
    }

    render = () => {
        return (
            <div style={{marginTop: "10px"}}>
                <div className={"tableDivBlock"} style={{marginTop: "10px", height: "10%", maxHeight: "61vh"}}>
                    <label className={"fontColor"}>Enter new question below. When done select all questions to be
                        added.</label>
                    <br/>
                    <div>
                        <input id={"question"} type={"text"} placeholder={"Enter New Question"}
                               style={{
                                   color: "white",
                                   backgroundColor: "#356fb7",
                                   border: "0px",
                                   width: "40%",
                                   marginTop: "20px",
                                   paddingLeft: "15px",
                                   paddingTop: "5px",
                                   paddingBottom: "5px"
                               }}></input>
                        <input type={"submit"} onClick={this.addNewQuestion}
                               style={{
                                   "marginLeft": "5px", "marginBottom": "10px", "marginTop": "10px", paddingTop: "5px",
                                   paddingBottom: "5px"
                               }} value={"Add"}>
                        </input>
                    </div>
                    <table style={{borderCollapse: "separate"}} cellPadding={10}>
                        <thead>
                        <tr>
                            <th className={"fontColor"} style={{textAlign: "left"}}>Question</th>
                            <th className={"fontColor"} style={{textAlign: "right"}}><input type="submit"
                                                                                            style={{backgroundColor: "#356fb7"}}
                                                                                            value={`Selected ${this.state.selected}`}
                            />
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <Sortable style={{width: "100%", display: "contents"}}
                                  onSortEnd={this.onSortEnd}>{this.state.items}</Sortable>
                        </tbody>
                    </table>
                </div>
                <input type={"submit"} value={"Continue"} onClick={this.handleSubmit} style={{
                    "marginRight": "15%",
                    "marginTop": "10px",
                    "marginBottom": "10px",
                    width: "15%",
                    float: "right",
                    paddingBottom: "5px",
                    paddingTop: "5px"
                }}/>
            </div>
        );
    }
}

export default OpenEndedQuestions;