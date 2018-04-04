import React, {Component} from 'react'
import StepZilla from 'react-stepzilla';
import AnswerDefaultQuestions from '../components/AnswerDefaultQuestions'
import AnswerDemographicQuestions from '../components/AnswerDemographicQuestions'
import AnswerOpenEndedQuestions from '../components/AnswerOpenEndedQuestions'

import {connect} from 'react-redux'

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
        questions: {}
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

    render = () => {
        let steps = [
            {
                name: 'Default Questions',
                component: <AnswerDefaultQuestions questions={this.state.questions.step2} props={this.props}/>
            },
            {
                name: "Demographic Questions",
                component: <AnswerDemographicQuestions questions={this.state.questions.step3} props={this.props}/>
            },

            {
                name: "Open Ended Questions",
                component: <AnswerOpenEndedQuestions questions={this.state.questions.step4} props={this.props}/>
            }
        ];

        return (
            <StepZilla steps={steps}/>
        )
    }
}

const mapStateToProps = (store) => {
    return {}
}
export default connect(mapStateToProps)(Fillanswers)