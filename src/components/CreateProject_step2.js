import React, {Component} from 'react';
import {Button, Icon, Table} from 'antd';

var _ = require('lodash/remove')
var getTUQ = require('../actions/GetTUQ');
var getMUQ = require('../actions/GetMUQ');

const columns = [{
    title: 'Questions',
    dataIndex: 'question'
}, {
    title: 'Type',
    dataIndex: 'type'
}, {
    title: 'Select',
    dataIndex: 'select'
}];

class CreateProjectStep2 extends Component {
    componentWillMount = () => {
        this.setState({
            tableData: [],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            checked: true
        })
    }

    componentDidMount = () => {
        if (this.props.props.data["step1"].template == 1) {    //TUQ
            //api call to get tuq questions
            getTUQ.gettuq((tuqData) => {
                for (let i = 0; i < tuqData.length; i++) {
                    tuqData[i].questionId = tuqData[i].id
                    this.state.selectedRowKeys.push(tuqData[i]);
                    tuqData[i].key = tuqData[i].id
                    tuqData[i].required = true
                    let type = [];
                    for (let j = 0; j < tuqData[i].limit; j++) {
                        type[j] = (<div style={{marginRight: "10px"}}><label>{j + 1}</label><br/><input disabled
                                                                                                        style={{cursor: "not-allowed"}}
                                                                                                        type='radio'/>
                        </div>)
                    }
                    tuqData[i].type = (<div style={{display: "inline-flex"}}>{type}</div>)
                    tuqData[i].select = (<input type="checkbox" onChange={() => this.toggleCheckbox(tuqData[i])}
                                                id={tuqData[i].id + "checkbox"} defaultChecked={true}/>)
                }
                this.setState({
                    tableData: tuqData
                })
            })
        } else { //MUQ
            //api call to get muq questions
            getMUQ.gettuq((muqData) => {
                console.log(muqData);
                for (let i = 0; i < muqData.length; i++) {
                    muqData[i].questionId = muqData[i].id
                    this.state.selectedRowKeys.push(muqData[i]);
                    muqData[i].key = muqData[i].id
                    muqData[i].required = true
                    let type = []
                    for (let j = 0; j < muqData[i].limit; j++) {
                        type[j] = (<div><label>{j + 1}</label><br/><input disabled style={{cursor: "not-allowed"}}
                                                                          type='radio'/></div>)
                    }
                    muqData[i].type = (<div style={{display: "inline-flex"}}>{type}</div>)
                    muqData[i].select = (<input type="checkbox" onChange={() => this.toggleCheckbox(muqData[i])}
                                                id={muqData[i].id + "checkbox"} defaultChecked={true}/>)
                }
                this.setState({
                    tableData: muqData
                })
            })
        }
    }

    //check/uncheck a question from tuq/muq question set
    toggleCheckbox = (data) => {
        let doc = document.getElementById(data.id + "checkbox");
        if (doc.checked) {
            //push if question is checked
            this.state.selectedRowKeys.push(data)
        } else {
            //remove if previously checked and then unchecked
            this.state.selectedRowKeys = _(this.state.selectedRowKeys, (item) => {
                return item.id != data.id;
            })
        }
        this.setState({selectedRowKeys: this.state.selectedRowKeys})
    }

    next = () => {
        //this.props.props.dispatch({type: "DISPLAY_ERROR", message: "Select at least one question"})
        if (this.state.selectedRowKeys.length == 0) {
            alert('Please select at least one question')
            //this.props.props.dispatch({type: "DISPLAY_ERROR", message: "Select at least one question"})
        } else {
            let step = {
                step2: {
                    questions: this.state.selectedRowKeys
                }
            }
            this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
            this.props.props.dispatch({type: "NEXT", payload: step})
        }
    }

    previous = () => {
        this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type: "PREVIOUS"})
    }

    render = () => {
        const {selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div style={{marginTop: "10px"}}>
                <label style={{color: "red"}}>*These questions will be mandatory to answer</label>
                <div style={{marginBottom: 16}}>
                    <span>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table size="small" bordered={true} columns={columns} dataSource={this.state.tableData}
                       pagination={{pageSize: 9}}/>
                <Button id='next' type="primary" htmlType="submit" onClick={this.previous}>
                    <Icon type="left"/>Previous
                </Button>
                <Button id='next' type="primary" htmlType="submit" onClick={this.next} style={{"marginLeft": "5px"}}>
                    Next<Icon type="right"/>
                </Button>
            </div>
        );
    }
}

export default CreateProjectStep2;