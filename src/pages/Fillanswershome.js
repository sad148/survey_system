import React, {Component} from 'react'
import Welcomescreen from '../components/Fillanswerswelcomescreen'
import Fillanswers from './Fillanswers'

const getprojectquestions = require('../actions/GetProjectQuestions')

class Fillanswershome extends Component {
    state = {
        questions: [],
        title: "",
        description: "",
        display: 0
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
        this.setState({display: 1})
    }

    render = () => {
        return (
            <div id="homepage" style={{padding: "0px"}}>
                <div id="heading" style={{display: "flex", backgroundColor: "#18519d"}}>
                    <div id={"projectTitleDiv"} style={{
                        width: "30%",
                        textAlign: "right",
                        marginRight: "20px"
                    }}>
                        <label style={{color: "white", fontSize: "30px"}}>{this.state.title}</label><br/>
                        <label style={{color: "white", fontSize: "30px"}}>Participant Id</label><br/>
                    </div>
                    <div style={{borderRight: "1px solid #ffffff"}}></div>
                    <div id={"projectDescriptionDiv"} style={{width: "70%", marginLeft: "20px", color: "white"}}>
                        {this.state.description}
                    </div>
                </div>
                <div className={"content"} style={{backgroundColor: "white"}}>
                    {this.state.display === 0 ? <Welcomescreen changeDisplay={this.changeDisplay}/> :
                        <Fillanswers data={this.state.questions}/>}
                </div>
            </div>
        )
    }
}

export default Fillanswershome;