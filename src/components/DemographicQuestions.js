import React, {Component} from 'react'
import {arrayMove} from 'react-sortable-hoc';
import {Input, Checkbox} from 'antd';
import Sortable from 'react-sortablejs';

var getDemographic = require('../actions/GetDemographic');
var _ = require('lodash/includes');
var unique = require('lodash/uniq');

class DemographicQuestions extends Component {
    state = {
        items: [],
        checkedQues: [],
        questions: [],
        finalData: [],
        selectedQuestions: 0
    };

    componentDidMount = () => {
        getDemographic.getdemographic((data) => {
            let row = []
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
            this.setState({items: row, selectedQuestions: row.length})
        })
    }

    //to create a new question
    componentWillReceiveProps = (nextProps) => {
        let options = [];
        if (nextProps.render == false)
            return;
        if (!this.state.questions[nextProps.data.questionId])
            this.state.questions[nextProps.data.questionId] = {}
        this.state.questions[nextProps.data.questionId]["question"] = nextProps.data.question
        this.state.questions[nextProps.data.questionId]["questionId"] = nextProps.data.questionId
        this.state.questions[nextProps.data.questionId]["type"] = nextProps.data.type;
        this.state.questions[nextProps.data.questionId]["options"] = nextProps.data.options;
        for (let i = 0; i < nextProps.data.options.length; i++) {
            options.push(<p><input type={nextProps.data.type}
                                   disabled></input><label className={"fontColor"}>{nextProps.data.options[i]}</label>
            </p>)
        }
        let row = (
            <tr style={{border: "1px solid #17509d", padding: "10px", cursor: "move"}} id={nextProps.data.questionId}
                key={nextProps.data.questionId}>
                <td width="50%" className={"fontColor questionTD"}>{nextProps.data.question}</td>
                <td className={"answerTD"} style={{textAlign: "left"}}>{options}</td>
                <td className={"checkBoxTD"}><Checkbox id={nextProps.data.questionId + "checkbox"}
                                                       onChange={() => this.updateSelectedCounter(nextProps.data.questionId + "checkbox")}
                                                       defaultChecked/>
                </td>
            </tr>
        )
        this.setState(prevState => {
            return {
                items: [...prevState.items, row],
                selectedQuestions: prevState.selectedQuestions + 1
            }
        })
    }

    previous = () => {
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "PREVIOUS", payload: this.props.props.data})
    }

    next = () => {
        let items = this.state.items
        let keys = Object.keys(this.state.questions);
        for (let i = 0; i < items.length; i++) {
            if (document.getElementById(items[i].props.id + "checkbox").checked) {
                this.state.checkedQues.push(items[i].props.id);
            }
        }
        for (let j = 0; j < this.state.checkedQues.length; j++) {
            if (_(keys, this.state.checkedQues[j])) {
                this.state.finalData.push(this.state.questions[this.state.checkedQues[j]])
            }
        }
        this.state.finalData = unique(this.state.finalData, "questionId")
        let step = {
            step3: {
                questions: this.state.finalData
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
        const {items} = this.state;
        const hasSelected = items.length > 0;
        return (<div style={{marginTop: "10px"}}>
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
                                                           value={hasSelected ? `Selected ${this.state.selectedQuestions}` : ''}
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