import React, {Component} from 'react'
import Fillanswers from './Fillanswers'
import {Icon} from 'antd'
import uuid from 'uuid/v4'

const getprojectquestions = require('../actions/GetProjectQuestions')

class Fillanswershome extends Component {
    state = {
        questions: [],
        title: "",
        description: "",
        display: 0,
        participantButton: false,
        participantInput: false,
        userId: ""
    }

    componentDidMount = () => {
        const projectId = this.props.params.projectId;
        getprojectquestions.getProjectQuestions(projectId, (data) => {
            this.setState({
                questions: data.data,
                title: data.title,
                description: data.description
            })
        })
    }

    changeDisplay = () => {
        let participantId = document.getElementById("participantId").value
        if (participantId.trim().length > 0)
            this.setState({display: 1, participantInput: true, participantButton: true})
        else
            alert("Please enter participant id")
    }

    updateIdText = (e) => {
        this.setState({
            userId: e.target.value
        })
    }

    generateID = () => {
        this.setState({
            userId: uuid().split("-").join("")
        })
    }

    render = () => {
        let participantId = (<div style={{"marginTop": "20px", width: "100%", textAlign: "center"}}>
                <label className={"fontColor"}>Please enter or generate participant id:</label>&nbsp;&nbsp;
                <input id='participantId' style={{width: "300px"}}
                       placeholder={"Please enter your participant id"}
                       disabled={this.state.participantInput}
                       value={this.state.userId} onChange={this.updateIdText}></input>
                <button
                    style={{backgroundColor: "#18519d", color: "white", border: "0px", cursor: "pointer"}}
                    disabled={this.state.participantButton}
                    title="Generate new participant id"
                    onClick={this.generateID}><Icon
                    type="reload"/></button>
            </div>
        )
        return (

            <div id="homepage" style={{padding: "0px"}}>
                <div id="heading" style={{display: "flex", backgroundColor: "#18519d"}}>
                    <div id={"projectTitleDiv"} style={{
                        width: "30%",
                        textAlign: "right",
                        marginRight: "20px"
                    }}>
                        <label style={{color: "white", fontSize: "30px"}}>{this.state.title}</label><br/>
                    </div>
                    <div style={{borderRight: "1px solid #ffffff"}}></div>
                    <div id={"projectDescriptionDiv"} style={{width: "70%", marginLeft: "20px", color: "white"}}>
                        {this.state.description}
                    </div>
                </div>
                <div className={"content"} style={{backgroundColor: "white"}}>
                    {this.state.display === 0 ?
                        <div style={{
                            height: "50%",
                            backgroundColor: "rgba(23, 80, 157, 0.1)",
                            width: "50%",
                            position: "absolute",
                            top: "20%",
                            left: "25%"
                        }}>
                            <div style={{paddingTop: "20%", textAlign: "center"}}>
                                <label className={"fontColor"}>Welcome!</label><br/>
                                <label className={"fontColor"}>When ready to start questionnaire please click
                                    continue.</label>
                            </div>
                            {participantId}
                            <div style={{textAlign: "center"}}>
                                <input type={"submit"}
                                       id='next'
                                       onClick={this.changeDisplay}
                                       value={"Continue"}
                                       style={{
                                           "marginTop": "40px",
                                           width: "25%",
                                           "marginBottom": "10px",
                                           paddingBottom: "10px",
                                           paddingTop: "10px"
                                       }}
                                />
                            </div>
                        </div> :
                        <Fillanswers data={this.state.questions} userId={this.state.userId}/>}
                </div>
            </div>
        )
    }
}

export default Fillanswershome;