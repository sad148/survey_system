import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Card, Checkbox, Input, Button } from 'antd';
import '../../node_modules/antd/lib/card/style/index.css'
var _ = require('lodash/includes');
var unique = require('lodash/uniq');
var uuid = require('uuid/v1')
const SortableItem = SortableElement(({value}) =>
    <div>{value}</div>
);

const SortableList = SortableContainer(({items}) => {
    let data = [];
    for(let i = 0;i < items.length;i++) {
        data.push(
            <SortableItem key={`item-${i}`} index={i} value={items[i]} />
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
        checkedQues:[],
        questions:[],
        finalData:[]
    };

    componentDidMount = () => {

    }

    componentWillReceiveProps = (nextProps) => {

    }

    previous = () => {
        this.props.props.dispatch({type:"RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type:"PREVIOUS" , payload:this.props.props.data})
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
            question:question,
            id:id
        })
        let display = (<div style={{"border":"1px solid", "borderColor":"lightGray", "borderRadius":"5px", "padding":"4px","marginBottom":"10px"}}>
                            <input type = 'checkbox' id = {id + 'checkbox'}/>
                            Question:<Input id = {id} value={question}/><br /><br />
                            Answer:<Input disabled/><br /><br />
                        </div>)
        let items = [...this.state.items, display];
        this.setState({items:items})
    }

    handleSubmit = () => {
        let finalSet = [];
        this.state.questions.forEach((data) => {
            if(document.getElementById(data.id+'checkbox').checked)
                finalSet.push(data)
        })
    }

    render = () => {
        return (<div>
            <Button id = 'previous' type="primary" htmlType="submit" onClick = {this.previous} style = {{"marginLeft":"5px","marginBottom":"10px"}}>
                Previous
            </Button><br />
            Add new question:<Input id = "question"/><br />
            <Button type="primary" htmlType="submit" onClick = {this.addNewQuestion} style = {{"marginLeft":"5px","marginBottom":"10px", "marginTop":"10px"}}>
                Add
            </Button>
            <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
            <Button id = 'previous' type="primary" htmlType="submit" onClick = {this.previous} style = {{"marginLeft":"5px", "marginTop":"10px"}}>
                Previous
            </Button>
            <Button id = 'create' type="primary" htmlType="submit" onClick = {this.handleSubmit} style = {{"marginLeft":"5px", "marginTop":"10px"}}>
                Create
            </Button>
        </div>);
    }
}

export default OpenEndedQuestions;