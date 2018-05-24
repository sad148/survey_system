import React, {Component} from 'react'
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
        console.log("inside steps render", this.state.questions);
        let steps = [
            {
                stepNum: "step2",
                name: 'Default Questions',
                component: <AnswerDefaultQuestions questions={this.state.questions.step2} props={this.props}
                                                   next={this.next}/>
            },
            {
                stepNum: "step3",
                name: "Demographic Questions",
                component: <AnswerDemographicQuestions questions={this.state.questions.step3} props={this.props}
                                                       next={this.next}/>
            },
            {
                stepNum: "step4",
                name: "Open Ended Questions",
                component: <AnswerOpenEndedQuestions questions={this.state.questions.step4}
                                                     props={this.props}/>
            }
        ]
        let finalSteps = [];
        for (let i = 0; i < steps.length; i++) {
            if (this.state.questions[steps[i].stepNum])
                finalSteps.push(steps[i])
        }

        console.log(steps)
        console.log(finalSteps)

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