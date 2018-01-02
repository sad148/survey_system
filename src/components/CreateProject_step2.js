import React, {Component} from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Table } from 'antd';
import '../../node_modules/antd/lib/checkbox/style/index.css'
var getTUQ = require('../actions/GetTUQ')
var getMUQ = require('../actions/GetMUQ')

const columns = [{
    title: 'Questions',
    dataIndex: 'question'
},{
    title:'Type',
    dataIndex:'type'
}];

class CreateProjectStep2 extends Component {
    componentWillMount = () => {
        this.setState({
            tableData:[],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            selectedRowData:[]
        })
    }

    componentDidMount = () => {
        if(this.props.props.data[0].template == 1) {    //TUQ
            getTUQ.gettuq((tuqData) => {
                for(let i = 0;i < tuqData.length; i++) {
                    tuqData[i].key = tuqData[i].id
                    let type = []
                    for (let j = 0;j < tuqData[i].limit; j++) {
                        type[j] = (<div><label style = {{marginLeft:"7px"}}>{j+1}</label><br /><input disabled style = {{cursor:"not-allowed"}}type='radio' /></div>)
                    }
                    tuqData[i].type = (<div style={{display:"inline-flex"}}>{type}</div>)
                }
                this.setState({
                    tableData:tuqData
                })
            })
        } else { //MUQ
            getMUQ.gettuq((muqData) => {
                for(let i = 0;i < muqData.length; i++) {
                    muqData[i].key = muqData[i].id
                    let type = []
                    for (let j = 0;j < muqData[i].limit; j++) {
                        type[j] = (<div><label style = {{marginLeft:"7px"}}>{j+1}</label><br /><input disabled style = {{cursor:"not-allowed"}}type='radio' /></div>)
                    }
                    muqData[i].type = (<div style={{display:"inline-flex"}}>{type}</div>)
                }
                this.setState({
                    tableData:muqData
                })
            })
        }
    }

    start = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    next = () => {
        let step = {
            step2: {
                tuqData:"tuqData"
            }
        }
        this.props.props.dispatch({type:"NEXT", payload:step})
    }

    previous = () => {
        this.props.props.dispatch({type:"PREVIOUS"})
    }

    render = () => {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div style={{marginTop:"10px"}}>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        Reset
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table size="small" bordered = {true} columns = {columns} dataSource = {this.state.tableData} rowSelection = {rowSelection} pagination = {{ pageSize: 9 }}/>
                <Button id = 'next' type="primary" htmlType="submit" onClick = {this.next}>
                    Next
                </Button>
                <Button id = 'next' type="primary" htmlType="submit" onClick = {this.previous} style = {{"marginLeft":"5px"}}>
                    Previous
                </Button>
            </div>
        );
    }
}

export default CreateProjectStep2;