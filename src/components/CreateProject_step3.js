import React, {Component} from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Table } from 'antd';
import '../../node_modules/antd/lib/checkbox/style/index.css'

const columns = [{
    title: 'Sr. No',
    dataIndex: 'id',
}, {
    title: 'Questions',
    dataIndex: 'question'
},{
    title:'Type',
    dataIndex:'type'
}];

class CreateProjectStep3 extends Component {
    componentWillMount = () => {
        console.log("hehe");
    }

    componentDidMount = () => {
        console.log("huhu");
    }

    previous = () => {
        this.props.props.dispatch({type:"RESET_CREATE_PROJECT_STEPS"})
        this.props.props.dispatch({type:"PREVIOUS" , payload:this.props.props.data})
    }

    render = () => {
        return (
            <div style={{marginTop:"10px"}}>
                <h1>Step 3</h1>
                <Button id = 'next' type="primary" htmlType="submit" onClick = {this.previous} style = {{"marginLeft":"5px"}}>
                    Previous
                </Button>
            </div>
        );
    }
}

export default CreateProjectStep3;