import React, {Component} from 'react';
import {Select} from 'antd';
import {Radio} from 'antd';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class CreateProjectStep1 extends Component {
    componentWillMount = () => {
        this.setState({
            template: 1,
            options1: false,
            options2: false
        });
    }

    componentDidMount = () => {
        if (this.props.props.data.step1) {
            console.log("inside if");
            document.getElementById("project_name").value = this.props.props.data.step1.project_name || ""
            this.setState({template: 1})
            document.getElementById("project_description").value = this.props.props.data.step1.description || ""
        }
    }

    next = () => {
        console.log(this.state.template)
        let projectName = document.getElementById("project_name").value
        let projectDescription = document.getElementById("project_description").value
        if (projectName.trim().length <= 0) {
            alert("Please enter project name");
        } else if (this.state.template == 0 || this.state.template == 2 || this.state.template == 3) {
            alert("Please select type of questionnaire")
        } else {
            let step = {
                step1: {
                    template: this.state.template,
                    project_name: projectName,
                    description: projectDescription
                }
            }
            this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
            this.props.props.dispatch({type: "NEXT", payload: step})
            this.props.jumpToStep(1);
        }
    }


    onChange = (e) => {
        let value = e.target.value
        //1 = TUQ
        if (value === 1) {
            this.setState({
                template: value,
                options1: false,
                options2: false
            });
        } else if (value === 0) {   //0 = MUQ
            this.setState({
                template: value,
                options1: true, //Provider or patient
                options2: false //interactive or standalone
            });
        } else if (value === 2 || value === 3) {    //provider or patient values
            if (this.state.template > value) {
                this.setState({
                    options1: true,
                    options2: true
                });
            } else {
                this.setState({
                    template: value,
                    options1: true,
                    options2: true
                });
            }
        } else {        //interactive or standalone
            this.setState({
                template: value
            })
        }
    }

    render = () => {
        return (
            <div style={{paddingLeft: "20%", paddingRight: "25%", marginTop: "10px"}}>
                <div style={{padding: "10px"}}>
                    <label style={{color: "red"}}>*</label>&nbsp;<label
                    style={{color: "white", fontWeight: "bold"}}>Project Name</label><br/>
                    <input id={"project_name"}
                           style={{backgroundColor: "white", width: "100%", height: "30px", marginTop: "10px"}}
                           type="text"
                    />
                </div>
                <div style={{padding: "10px"}}>
                    <label style={{color: "white", fontWeight: "bold", marginTop: "10px"}}>Description</label><br/>
                    <textarea id={"project_description"} type="text"
                              style={{borderRadius: "0px", width: "100%", backgroundColor: "white", marginTop: "10px"}}
                              rows="6" columns="50"/>
                </div>
                <div style={{padding: "10px"}}>
                    <label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label
                    style={{color: "white", marginTop: "10px"}}>Please select the type of your system</label><br/>
                    <RadioGroup onChange={this.onChange} value={this.state.template}>
                        <Radio value={1} style={{color: "white"}}>Telehealth System(TUQ)</Radio>
                        <Radio value={0} style={{color: "white"}}>Mobile Health App(MAUQ)</Radio>
                    </RadioGroup>
                    {
                        (this.state.options1) ? <div style={{"marginTop": "10px"}}>
                            <label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label
                            style={{color: "white", marginTop: "10px"}}>Please select the primary user of the mobile
                            health app</label><br/>
                            <RadioGroup onChange={this.onChange}>
                                <Radio value={2} style={{color: "white"}}>Patient</Radio>
                                <Radio value={3} style={{color: "white"}}>Provider</Radio>
                            </RadioGroup>
                        </div> : ""
                    }
                    {
                        (this.state.options2) ? <div style={{"marginTop": "10px"}}>
                            <label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label
                            style={{color: "white", marginTop: "10px"}}>Please select the type of the mobile health
                            app</label><br/>
                            <RadioGroup onChange={this.onChange}>
                                <Radio value={4} style={{color: "white"}}>Standalone</Radio>
                                <Radio value={5} style={{color: "white"}}>Interactive</Radio>
                            </RadioGroup>
                        </div> : ""
                    }
                </div>
                <input type={"submit"} style={{width: "42%", marginTop: "10px", padding: "10px"}} value={"Continue"}
                       onClick={this.next}/>
            </div>
        );
    }
}

export default CreateProjectStep1;