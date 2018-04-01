import React, {Component} from 'react';
import {connect} from 'react-redux'
import CreateProjectStep1 from '../components/CreateProject_step1'
import CreateProjectStep2 from '../components/CreateProject_step2'
import CreateProjectStep3 from '../components/CreateProject_step3'
import CreateProjectStep4 from '../components/CreateProject_step4'
import CreateProjectStep5 from '../components/CreateProject_step5'
import StepZilla from 'react-stepzilla';
import '../../node_modules/react-stepzilla/src/css/main.css'

class CreateProject extends Component {
    componentWillMount = () => {
        this.setState({
            confirmDirty: false,
            autoCompleteResult: [],
            current: 0
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.userRegistered == true) {
            alert('Registered successfully');
            this.props.dispatch({type: "RESET_REGISTER_USER"})
        }

        if (nextProps.next == true)
            this.next()
        else if (nextProps.next == false)
            this.prev()
    }

    next = () => {
        const current = this.state.current + 1;
        console.log("current -", current);
        this.setState({current});
    }

    prev = () => {
        const current = this.state.current - 1;
        console.log("current -", current);
        this.setState({current});
    }

    render = () => {
        let steps = [
            {
                name: 'Project Details',
                component: <CreateProjectStep1 props={this.props}/>
            }, {
                name: 'Default Questionnaire',
                component: <CreateProjectStep2 props={this.props}/>
            }, {
                name: 'Demographic Questions',
                component: <CreateProjectStep3 props={this.props}/>
            }, {
                name: 'Open Ended Questions',
                component: <CreateProjectStep4 props={this.props}/>
            },
            {
                name: 'Finish',
                component: <CreateProjectStep5 props={this.props}/>
            }];

        return (
            <div style={{height: "100%", paddingRight: "60px", paddingLeft: "60px", paddingBottom: "60px"}}>
                <div style={{width: "100%"}}>
                    <div style={{textAlign: "center"}}>
                        <h1 style={{color: "white"}}>New Project</h1>
                    </div>
                    <div style={{width: "100%"}}>
                        <StepZilla steps={steps}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        next: store.createProjectSteps.next,
        data: store.createProjectSteps.createProjectStepsData
    }
}

export default connect(mapStateToProps)(CreateProject);