import React, {Component} from 'react'

export default class AnswersSubmitConfirmation extends Component {
    render = () => {
        return (
            <div style={{height: "100%", width: "100%", textAlign: "center"}}>
                <div style={{top: "50%", position: "absolute", width: "100%"}}>
                    <label className={"fontColor"}>Thank you for your time!</label><br/>
                    <label className={"fontColor"}>Your survey was successfully submitted.</label>
                </div>
            </div>
        )
    }
}