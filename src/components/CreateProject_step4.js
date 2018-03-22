import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Card, Input, Button, Checkbox} from 'antd';
import createproject from '../actions/CreateProject'
import {Spin} from 'antd';
import {browserHistory} from "react-router";
import getprojectslist from '../actions/GetProjectsList'

var uuid = require('uuid/v1')
const SortableItem = SortableElement(({value}) =>
    <div>{value}</div>
);

const SortableList = SortableContainer(({items}) => {
    let data = [];
    for (let i = 0; i < items.length; i++) {
        data.push(
            <SortableItem key={`item-${i}`} index={i} value={items[i]}/>
        )
    }
    return (
        <div>
            {data}
        </div>
    );
});

class OpenEndedQuestions extends Component {
    state = {
        items: [],
        checkedQues: [],
        questions: [],
        finalData: [],
        showLoader: false,
        selected: 0
    };

    previous = () => {
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "PREVIOUS", payload: this.props.props.data})
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
            questionId: id,
            required: false
        })
        let display = (<div style={{textAlign: "left"}}>
            <label className={"fontColor"}>{question}</label>
            <Checkbox style={{width: "5%", float: "right"}} onChange={() => this.toggleCheckbox(id + 'checkbox')}
                      defaultChecked
                      id={id + 'checkbox'}/>
            <hr/>
        </div>)
        let items = [...this.state.items, display];
        this.setState({items: items})
    }

    toggleCheckbox = (id) => {
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

        let finalData = this.props.props.data
        finalData["step4"] = {questions: step4};
        finalData["userid"] = sessionStorage.getItem("userid");
        this.setState({showLoader: true})
        createproject.createProject(finalData, (resp) => {
            if (resp.code == 200) {
                alert('Project created successfully')
                browserHistory.replace('/survey_system/home');
                this.props.props.dispatch(getprojectslist(finalData["userid"]));
            } else {
                alert('Error in creating project')
            }
        })
    }

    render = () => {
        return (
            <div>
                <div style={{
                    backgroundColor: "white",
                    paddingRight: "40px",
                    paddingTop: "40px",
                    paddingLeft: "40px",
                    width: "70%",
                    marginLeft: "15%",
                    marginTop: "10px",
                    textAlign: "center"
                }}>
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
                        <input type={"submit"} style={{float: "right", marginTop: "20px"}}
                               value={`Selected ${this.state.selected}`}/>
                    </div>
                    <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>
                    {/*<Button id='create' type="primary" htmlType="submit" onClick={this.handleSubmit}*/}
                    {/*style={{"marginLeft": "5px", "marginTop": "10px"}}>*/}
                    {/*Create*/}
                    {/*</Button>*/}
                </div>
                <input type={"submit"} value={"Continue"} style={{
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