import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Button } from 'antd';
import '../../node_modules/antd/lib/checkbox/style/index.css'
import AddQuestionPopup from './AddQuestionPopup.js'
import DemographicQuestions from "./DemographicQuestions";

class CreateProjectStep3 extends Component {
    componentWillMount = () => {
        this.setState({addNewQuestion:false, newQuestion:"", renderDefaultQuestions:true})
    }

    componentWillReceiveProps = (nextProps) => {
         if(nextProps.renderDemographicQuestion == true) {
            this.setState({newQuestion: nextProps.data})
        }
    }

    addQuestionPopup = () => {
        this.props.props.dispatch({type: "RESET_DEMOGRAPHIC_QUESTION"})
        this.setState({addNewQuestion:true})
    }

    render = () => {
        return (
            <div style={{marginTop:"10px"}}>
                <Button id = 'next' type="primary" onClick = {this.addQuestionPopup} style = {{"marginLeft":"5px"}}>
                    Add new question
                </Button> <br /><br />
                {(this.props.renderDemographicQuestion == true) ? <DemographicQuestions data = {this.state.newQuestion} render = {true} props = {this.props} /> : <DemographicQuestions render = {false} props = {this.props}/>}
                {(this.state.addNewQuestion == true) ? <AddQuestionPopup props = {this.props} />:""}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        data:store.demographicQuestion.data,
        renderDemographicQuestion:store.demographicQuestion.renderFlag
    }
}

export default connect(mapStateToProps)(CreateProjectStep3);