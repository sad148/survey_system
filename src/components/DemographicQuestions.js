import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Card, Icon, Input, Button } from 'antd';
var getDemographic = require('../actions/GetDemographic');
var _ = require('lodash/includes');
var unique = require('lodash/uniq');
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
class DemographicQuestions extends Component {
    state = {
        items: [],
        checkedQues:[],
        questions:[],
        finalData:[]
    };

    componentDidMount = () => {
        getDemographic.getdemographic((data) => {
            let cards = []
            for (let i = 0; i < data.length; i++) {
                if(!this.state.questions[data[i].questionId])
                    this.state.questions[data[i].questionId] = {}
                this.state.questions[data[i].questionId]["question"] = data[i].question
                this.state.questions[data[i].questionId]["questionId"] = data[i].questionId
                this.state.questions[data[i].questionId]["type"] = data[i].type;
                this.state.questions[data[i].questionId]["options"] = data[i].options;
                let options = [];
                if(data[i].type == "radio" || data[i].type == "checkbox") {
                    for(let j = 0;j < data[i].options.length;j++) {
                        options.push(<p><input type = {data[i].type} disabled></input><label>{data[i].options[j]}</label></p>)
                    }
                    cards.push(<div id = {data[i].questionId}>
                                    <input type="checkbox" id = {data[i].questionId + "checkbox"} />
                                    <Card title={data[i].question} style={{ width: "100%", marginBottom:"10px" }}>
                                        {options}
                                    </Card>
                                </div>)
                } else if(data[i].type == "text") {
                    cards.push(<div id = {data[i].questionId}>
                                    <input type="checkbox" id = {data[i].questionId + "checkbox"} />
                                    <Card title={data[i].question} style={{ width: "100%", marginBottom:"10px" }}>
                                        <Input type = "text" disabled style = {{width:"10px"}}/>
                                    </Card>
                                </div>)
                }
            }
            this.setState({items:cards})
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let options = [];
        if(nextProps.render == false)
            return;
        if(!this.state.questions[nextProps.data.questionId])
            this.state.questions[nextProps.data.questionId] = {}
        this.state.questions[nextProps.data.questionId]["question"] = nextProps.data.question
        this.state.questions[nextProps.data.questionId]["questionId"] = nextProps.data.questionId
        this.state.questions[nextProps.data.questionId]["type"] = nextProps.data.type;
        this.state.questions[nextProps.data.questionId]["options"] = nextProps.data.options;

        for (let i = 1; i < nextProps.data.options.length; i++) {
            options.push(<p><input type = {nextProps.data.type} disabled></input><label>{nextProps.data.options[i]}</label></p>)
        }
        let card = (<div id = {nextProps.data.questionId}>
                        <input type="checkbox" id = {nextProps.data.questionId + "checkbox"} defaultChecked/>
                        <Card title={nextProps.data.question} extra={<a href="#">More</a>} style={{ width: "100%", marginBottom:"10px" }}>
                            {options}
                        </Card>
                    </div>)
        this.state.items.push(card)
    }

    previous = () => {
        console.log(this.props);
        this.props.props.dispatch({type:"RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type:"PREVIOUS" , payload:this.props.props.data})
    }

    next = () => {
        let items = this.state.items
        let keys = Object.keys(this.state.questions);
        for(let i = 0;i < items.length; i++) {
            if (document.getElementById(items[i].props.id + "checkbox").checked) {
                this.state.checkedQues.push(items[i].props.id);
            }
        }
        for(let j = 0;j < this.state.checkedQues.length;j++) {
            if(_(keys, this.state.checkedQues[j])) {
                this.state.finalData.push(this.state.questions[this.state.checkedQues[j]])
            }
        }
        this.state.finalData = unique(this.state.finalData, "questionId")
        let step = {
            step3: {
                questions:this.state.finalData
            }
        }
        this.props.props.dispatch({type:"RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type:"NEXT", payload:step})
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render = () => {
        return (<div>
                    <Button id = 'previous' type="primary" htmlType="submit" onClick = {this.previous} style = {{"marginLeft":"5px","marginBottom":"10px"}}>
                        Previous
                    </Button>
                    <Button id = 'next' type="primary" htmlType="submit" onClick = {this.next} style = {{"marginLeft":"5px"}}>
                        Next
                    </Button>
                    <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
                    <Button id = 'previous' type="primary" htmlType="submit" onClick = {this.previous} style = {{"marginLeft":"5px"}}>
                        <Icon type="left" />Previous
                    </Button>
                    <Button id = 'next' type="primary" htmlType="submit" onClick = {this.next} style = {{"marginLeft":"5px"}}>
                        Next<Icon type="right" />
                    </Button>
                </div>);

    }
}

export default DemographicQuestions;