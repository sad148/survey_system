import React, {Component} from 'react'

const Welcomescreen = (props) => {
    return (
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
                <label className={"fontColor"}>When ready to start questionnaire please click continue.</label>
            </div>
            <div style={{textAlign: "center"}}>
                <input type={"submit"}
                       id='next'
                       onClick={props.changeDisplay}
                       value={"Continue"}
                       style={{
                           "marginTop": "10px",
                           width: "25%",
                           "marginBottom": "10px",
                           paddingBottom: "10px",
                           paddingTop: "10px"
                       }}
                />
            </div>
        </div>
    )
}

export default Welcomescreen;