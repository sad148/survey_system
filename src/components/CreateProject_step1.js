import React, {Component} from 'react';
import {Select} from 'antd';

const Option = Select.Option;

class CreateProjectStep1 extends Component {
    componentWillMount = () => {
        this.setState({
            template: 1
        });
    }

    componentDidMount = () => {
        if (this.props.props.data.step1) {
            console.log("inside if");
            document.getElementById("project_name").value = this.props.props.data.step1.project_name || ""
            document.getElementById("project_description").value = this.props.props.data.step1.description || ""
        }
    }

    next = () => {
        let projectName = document.getElementById("project_name").value
        let projectDescription = document.getElementById("project_description").value
        if (projectName.trim().length <= 0) {
            alert("Please enter project name");
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


    onChange = (type) => {
        this.setState({
            template: type.key
        });
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
                    style={{color: "white", fontWeight: "bold", marginTop: "10px"}}>Please select default
                    questionnaire</label><br/>
                    <Select labelInValue style={{width: 120, backgroundColor: "white"}} onChange={this.onChange}>
                        <Option value="1">TUQ</Option>
                        <Option value="2">MAUQ Patient Interactive</Option>
                        <Option value="3">MAUQ Provider Interactive</Option>
                        <Option value="4">MAUQ Patient Standalone</Option>
                        <Option value="5">MAUQ Provider Interactive</Option>
                    </Select>
                </div>
                <input type={"submit"} style={{width: "42%", marginTop: "10px", padding: "10px"}} value={"Continue"}
                       onClick={this.next}/>
            </div>
        );
    }
}

export default CreateProjectStep1;