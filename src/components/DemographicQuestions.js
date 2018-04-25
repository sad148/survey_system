import React, {Component} from 'react'
import {arrayMove} from 'react-sortable-hoc';
import {Input, Checkbox} from 'antd';
import Sortable from 'react-sortablejs';
import Loader from './Loader'
import store from '../store'

var getDemographic = require('../actions/GetDemographic');
var _ = require('lodash/includes');
var unique = require('lodash/uniqBy');

class DemographicQuestions extends Component {
    state = {
        items: [],
        checkedQues: [],
        questions: [],
        finalData: [],
        selectedQuestions: 0,
        showLoader: true
    };

    componentDidMount = () => {
        getDemographic.getdemographic((data) => {
            this.formData(data)
        })
    }

    //to create a new question
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.render == false)
            return;
        this.formData(nextProps.data)
    }

    formData = (data) => {
        let row = []
        let storeData = store.getState().createProjectSteps.createProjectStepsData
        if (storeData.step3) {
            data.push(...storeData.step3.questions)
        }
        data = unique(data, "questionId")
        for (let i = 0; i < data.length; i++) {
            if (!this.state.questions[data[i].questionId])
                this.state.questions[data[i].questionId] = {}
            this.state.questions[data[i].questionId]["question"] = data[i].question
            this.state.questions[data[i].questionId]["questionId"] = data[i].questionId
            this.state.questions[data[i].questionId]["type"] = data[i].type;
            this.state.questions[data[i].questionId]["options"] = data[i].options;
            let options = [];
            if (data[i].type == "radio" || data[i].type == "checkbox") {
                for (let j = 0; j < data[i].options.length; j++) {
                    options.push(<p><input type={data[i].type}
                                           disabled></input><label
                        className={"fontColor"}>{data[i].options[j]}</label>
                    </p>)
                }
                row.push(
                    <tr style={{border: "1px solid #17509d", padding: "10px", cursor: "move"}}
                        id={data[i].questionId}
                        key={data[i].questionId}>
                        <td width="50%" className={"fontColor questionTD"}>{data[i].question}</td>
                        <td className={"answerTD"} style={{textAlign: "left"}}>{options}</td>
                        <td className={"checkBoxTD"}><Checkbox
                            onChange={() => this.updateSelectedCounter(data[i].questionId + "checkbox")}
                            id={data[i].questionId + "checkbox"} defaultChecked/>
                        </td>
                    </tr>
                )
            } else if (data[i].type == "text") {
                row.push(
                    <tr style={{border: "1px solid #17509d", padding: "10px", cursor: "move"}}
                        id={data[i].questionId}
                        key={data[i].questionId}>
                        <td width="50%" className={"fontColor questionTD"}>{data[i].question}</td>
                        <td className={"answerTD fontColor"} style={{textAlign: "left"}}><Input type="text" disabled
                                                                                                style={{width: "50px"}}/>
                        </td>
                        <td className={"checkBoxTD"}><Checkbox
                            onChange={() => this.updateSelectedCounter(data[i].questionId + "checkbox")}
                            id={data[i].questionId + "checkbox"} defaultChecked/>
                        </td>
                    </tr>
                )
            }
        }
        this.setState(prevState => {
            return {
                items: [...prevState.items, row],
                selectedQuestions: prevState.selectedQuestions + 1,
                showLoader: false
            }
        })
    }

    previous = () => {
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "PREVIOUS", payload: this.props.props.data})
    }

    next = () => {
        let items = this.state.questions
        for (let i in items) {
            if (document.getElementById(i + "checkbox").checked) {
                this.state.checkedQues.push(items[i]);
            }
        }
        let step = {
            step3: {
                questions: this.state.checkedQues
            }
        }
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "NEXT", payload: step})
        this.props.props.jumpToStep(3);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    updateSelectedCounter = (id) => {
        if (document.getElementById(id).checked)
            this.setState(prevState => {
                    return {selectedQuestions: prevState.selectedQuestions + 1}
                }
            )
        else
            this.setState(prevState => {
                    return {selectedQuestions: prevState.selectedQuestions - 1}
                }
            )
    }

    render = () => {
        return (
            <div style={{marginTop: "10px"}}>
                <div>
                    {this.state.showLoader ? <Loader/> : ""}
                </div>
                <div className={"tableDivBlock"} style={{marginTop: "10px"}}>
                    <input type={"submit"} value={"Add new question"} style={{
                        marginTop: "10px", paddingBottom: "5px",
                        paddingTop: "5px"
                    }}
                           onClick={this.props.addQuestionPopup}/>
                    <table style={{borderCollapse: "separate"}} cellPadding={10}>
                        <thead>
                        <tr>
                            <th className={"fontColor"} style={{textAlign: "left"}}>Question</th>
                            <th className={"fontColor"} style={{textAlign: "left"}}>Answer</th>
                            <th className={"fontColor"}><input type="submit"
                                                               style={{backgroundColor: "#356fb7"}}
                                                               value={`Selected ${this.state.selectedQuestions}`}
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
            </div>);
    }
}

export default DemographicQuestions;