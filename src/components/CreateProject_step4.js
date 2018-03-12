import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Card, Input, Button} from 'antd';
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
        showLoader: false
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
        let id = uuid().split("-").join("");
        this.state.questions.push({
            question: question,
            questionId: id,
            required: false
        })
        let display = (<div>
            <input type='checkbox' id={id + 'checkbox'}/>
            <Card title={question} style={{width: "100%", marginBottom: "10px"}}>
                Answer:<Input disabled/><br/><br/>
            </Card>
        </div>)
        let items = [...this.state.items, display];
        this.setState({items: items})
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
        return (<div>
            {
                (this.state.showLoader == true) ? <Spin size="large"></Spin> : ""

            }
            <Button id='previous' type="primary" htmlType="submit" onClick={this.previous}
                    style={{"marginLeft": "5px", "marginBottom": "10px"}}>
                Previous
            </Button><br/>
            Add new question:<Input id="question"/><br/>
            <Button type="primary" htmlType="submit" onClick={this.addNewQuestion}
                    style={{"marginLeft": "5px", "marginBottom": "10px", "marginTop": "10px"}}>
                Add
            </Button>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>
            <Button id='previous' type="primary" htmlType="submit" onClick={this.previous}
                    style={{"marginLeft": "5px", "marginTop": "10px"}}>
                Previous
            </Button>
            <Button id='create' type="primary" htmlType="submit" onClick={this.handleSubmit}
                    style={{"marginLeft": "5px", "marginTop": "10px"}}>
                Create
            </Button>
        </div>);
    }
}

export default OpenEndedQuestions;