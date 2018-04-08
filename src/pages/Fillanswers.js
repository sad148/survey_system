import React, {Component} from 'react'
import StepZilla from 'react-stepzilla';
import {Steps} from 'antd';
import AnswerDefaultQuestions from '../components/AnswerDefaultQuestions'
import AnswerDemographicQuestions from '../components/AnswerDemographicQuestions'
import AnswerOpenEndedQuestions from '../components/AnswerOpenEndedQuestions'
import {connect} from 'react-redux'

const Step = Steps.Step;

class Fillanswers extends Component {
    state = {
        step1: [],
        value: 1,
        otherSteps: [],
        answers: [],
        data: "",
        userId: "",
        questionIdSet: new Set(),
        checkedAnswers: new Set(),
        questions: {},
        current: 0
    }

    componentWillMount = () => {
        let questions = [];
        this.props.data.map((item) => {
            if (!questions[item.stepNum])
                questions[item.stepNum] = [];
            questions[item.stepNum].push(item)
        })
        this.setState({
            questions: questions
        })
    }

    next = (stepNum) => {
        const current = this.state.current + 1;
        this.setState({current});
    }

    render = () => {
        let steps = [
            {
                name: 'Default Questions',
                component: <AnswerDefaultQuestions questions={this.state.questions.step2} props={this.props}
                                                   next={this.next}/>
            },
            {
                name: "Demographic Questions",
                component: <AnswerDemographicQuestions questions={this.state.questions.step3} props={this.props}
                                                       next={this.next}/>
            },

            {
                name: "Open Ended Questions",
                component: <AnswerOpenEndedQuestions questions={this.state.questions.step4} props={this.props}/>
            }
        ]
        return (
            <div style={{marginTop: "30px"}}>
                <Steps progressDot current={this.state.current} style={{width: "75%", marginLeft: "15%"}}>
                    {steps.map(item => <Step key={item.name} title={item.name}/>)}
                </Steps>
                <div style={{marginTop: "30px"}} className="steps-content">{steps[this.state.current].component}</div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {}
}
export default connect(mapStateToProps)(Fillanswers)