import React, {Component} from 'react';
import {Select} from 'antd';
import {Radio} from 'antd';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class CreateProjectStep1 extends Component {
    componentWillMount = () => {
        this.setState({
            template: "tuq",
            showOptions: "",
            showTypes: false
        });
    }

    componentDidMount = () => {
        if (this.props.props.data.step1) {
            document.getElementById("project_name").value = this.props.props.data.step1.project_name || ""
            this.setState({template: "tuq"})
            document.getElementById("project_description").value = this.props.props.data.step1.description || ""
        }
    }

    next = () => {
        let projectName = document.getElementById("project_name").value
        let projectDescription = document.getElementById("project_description").value
        if (projectName.trim().length <= 0) {
            alert("Please enter project name");
        } else if (this.state.template == "mauq") {
            alert("Please select type of questionnaire")
        } else {
            let step = {
                step1: {
                    template: this.state.template === "tuq" ? 1 : this.state.template,
                    project_name: projectName,
                    description: projectDescription
                }
            }
            this.props.props.dispatch({type: "RESET_CREATE_PROJECT_STEPS"})
            this.props.props.dispatch({type: "NEXT", payload: step})
            this.props.jumpToStep(1);
        }
    }


    selectOptionsSet = (e) => {
        let value = e.target.value
        this.setState({
            template: value
        })
    }

    changeOptions = (e) => {
        let value = e.target.value
        if (value === "tuq") {
            this.setState({
                template: value,
                showTypes: false,
                showOptions: ""
            });
        }
        else if (value === "mauq") {
            this.setState({
                template: value,
                showTypes: true
            });
        } else if (value === "patients") {
            this.setState({showOptions: "patients", template: 4})
        } else {
            this.setState({showOptions: "provider", template: 5})
        }
    }
    render = () => {
        let patientOptions = (
            <RadioGroup onChange={this.selectOptionsSet} value={this.state.template}>
                <Radio value={4} style={{color: "white"}}>Standalone</Radio>
                <Radio value={2} style={{color: "white"}}>Interactive</Radio>
            </RadioGroup>
        )

        let providerOptions = (
            <RadioGroup onChange={this.selectOptionsSet} value={this.state.template}>
                <Radio value={5} style={{color: "white"}}>Standalone</Radio>
                <Radio value={3} style={{color: "white"}}>Interactive</Radio>
            </RadioGroup>
        )


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
                    <RadioGroup onChange={this.changeOptions} value={this.state.template}>
                        <Radio value={"tuq"} style={{color: "white"}}>Telehealth System(TUQ)</Radio>
                        <Radio value={"mauq"} style={{color: "white"}}>Mobile Health App(MAUQ)</Radio>
                    </RadioGroup>
                    {
                        (this.state.showTypes) ? <div style={{"marginTop": "10px"}}>
                            <label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label
                            style={{color: "white", marginTop: "10px"}}>Please select the primary user of the
                            mobile</label><br/>
                            <RadioGroup onChange={this.changeOptions}>
                                <Radio value={"patients"} style={{color: "white"}}>Patient</Radio>
                                <Radio value={"provider"} style={{color: "white"}}>Provider</Radio>
                            </RadioGroup>
                        </div> : ""
                    }
                    {
                        (this.state.showOptions == "patients") ?
                            <div style={{"marginTop": "10px"}}>
                                <label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label
                                style={{color: "white", marginTop: "10px"}}>Please select the type of the mobile
                                health</label><br/>
                                {patientOptions}

                            </div>
                            : (this.state.showOptions == "provider") ?
                            <div style={{"marginTop": "10px"}}>
                                <label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label
                                style={{color: "white", marginTop: "10px"}}>Please select the type of the mobile
                                health</label><br/>
                                {providerOptions}
                            </div> : ""
                    }
                    {/*{*/}
                    {/*(this.state.optionsq) ? <div style={{"marginTop": "10px"}}>*/}
                    {/*<label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label*/}
                    {/*style={{color: "white", marginTop: "10px"}}>Please select the primary user of the mobile*/}
                    {/*health app</label><br/>*/}
                    {/*<RadioGroup onChange={this.onChange}>*/}
                    {/*<Radio value={2} style={{color: "white"}}>Patient</Radio>*/}
                    {/*<Radio value={3} style={{color: "white"}}>Provider</Radio>*/}
                    {/*</RadioGroup>*/}
                    {/*</div> : ""*/}
                    {/*}*/}
                    {/*{*/}
                    {/*(this.state.options2) ? <div style={{"marginTop": "10px"}}>*/}
                    {/*<label style={{color: "red", marginTop: "10px"}}>*</label>&nbsp;<label*/}
                    {/*style={{color: "white", marginTop: "10px"}}>Please select the type of the mobile health*/}
                    {/*app</label><br/>*/}

                    {/*</div> : ""*/}
                    {/*}*/}
                </div>
                <input type={"submit"} style={{width: "42%", marginTop: "10px", padding: "10px"}} value={"Continue"}
                       onClick={this.next}/>
            </div>
        );
    }
}

export default CreateProjectStep1;