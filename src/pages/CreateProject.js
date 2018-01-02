import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Form, Input, Select, Button } from 'antd';
import { Layout } from 'antd';
import { Radio } from 'antd';
import { Steps, message } from 'antd';
import '../../node_modules/antd/lib/steps/style/index.css'
import CreateProjectStep1 from '../components/CreateProject_step1'
import CreateProjectStep2 from '../components/CreateProject_step2'
import CreateProjectStep3 from '../components/CreateProject_step3'
const Step = Steps.Step;
const { Content } = Layout;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class CreateProject extends Component {
    componentWillMount = () => {
        this.setState({
            confirmDirty: false,
            autoCompleteResult: [],
            current:0
        });
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("inside componentWillReceiveProps", nextProps);
        if(nextProps.userRegistered == true) {
            alert('Registered successfully');
            this.props.dispatch({type:"RESET_REGISTER_USER"})
        }

        if(nextProps.next == true)
            this.next()
        else
            this.prev()
    }

    next = () => {
        const current = this.state.current + 1;
        console.log("current -",current);
        this.setState({ current });
    }

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render = () => {
        let steps = [{
            title: 'Project Details',
            content: <CreateProjectStep1 props = {this.props}/>
        }, {
            title: 'Default Questionnaire',
            content: <CreateProjectStep2 props = {this.props}/>
        }, {
            title: 'Demographic Questions',
            content: <CreateProjectStep3 props = {this.props}/>
        }];

        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, height:"100%"}}>
                <Steps current={this.state.current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
            </Content>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        next: store.createProjectSteps.next,
        data:store.createProjectSteps.createProjectStepsData
    }
}

export default connect(mapStateToProps)(CreateProject);