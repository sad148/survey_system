import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Card, Input, Checkbox } from 'antd';
import '../../node_modules/antd/lib/card/style/index.css'
var getDemographic = require('../actions/GetDemographic');

const SortableItem = SortableElement(({value}) =>
    <div>
    {value}
    </div>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <div>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
    );
});
class DefaultDemographicQuestions extends Component {
    state = {
        items: [],
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.render == false)
            return;
    }

    componentDidMount = () => {
        this.formData();
    }

    formData = () => {
        getDemographic.getdemographic((data) => {
            let cards = []
            for (let i = 0; i < data.length; i++) {
                let options = [];
                if(data[i].type == "radio" || data[i].type == "checkbox") {
                    for(let j = 0;j < data[i].options.length;j++) {
                        options.push(<p><input type = {data[i].type} disabled></input><label>{data[i].options[j]}</label></p>)
                    }
                    cards.push(<div style={{display:"inline-flex", width:"100%"}}>
                                    <Checkbox style={{width:"10px", marginRight:"10px"}} disabled defaultChecked/>
                                    <Card title={data[i].question} id = {data[i].questionId} style={{ width: "100%", marginBottom:"10px" }}>
                                        {options}
                                    </Card>
                               </div>)
                } else if(data[i].type == "text") {
                    cards.push(<div style={{display:"inline-flex", width:"100%"}}>
                                    <Checkbox style={{width:"10px", marginRight:"10px"}} disabled defaultChecked/>
                                    <Card title={data[i].question} id = {data[i].questionId} style={{ width: "100%", marginBottom:"10px" }}>
                                        <Input type = "text" disabled style = {{width:"10px"}}/>
                                    </Card>
                               </div>)
                }
            }
            this.setState({items:cards})
        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render = () => {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;

    }
}

export default DefaultDemographicQuestions;