import React, {Component} from 'react'
import {Form, Input, Select, InputNumber, Radio, Checkbox, Modal} from 'antd';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const uuidv1 = require('uuid/v1');

class AddQuestionPopup extends Component {
    componentWillMount = () => {
        this.setState({
            restrictions: "", options: "", visible: true, questionId: uuidv1().split('-').join("")
        })
    }

    componentDidMount = () => {
        this.setState({questionAnsMap: {}});
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        //open modal when add question button is clicked from parent component (DemographicQuestions.js)
        //since visible flag was set to false on close, the state has false stored in it
        if (!this.state.visible) {
            this.setState({visible: true})
        }
    }

    handleChange = (value) => {
        let restrictions;
        if (document.getElementById("optionNumber"))
            document.getElementById("optionNumber").value = ""
        if (value == 'radio' || value == 'checkbox') {
            restrictions = (
                <FormItem
                    label='Enter number of options'
                >
                    <InputNumber id='optionNumber' min={1} max={7} onChange={() => this.createOptions(value)}/>
                </FormItem>
            )
        }
        this.setState({restrictions: restrictions, options: ""})
    }

    createOptions = (type) => {
        let noOfOptions = document.getElementById('optionNumber').value
        if (noOfOptions > 0 && noOfOptions < 8) {
            let options = []
            for (let i = 0; i < noOfOptions; i++) {
                if (type == "radio")
                    options.push(<div style={{marginBottom: "5px"}}>
                        <Radio value={i} disabled>
                            <Input id={i + 1}
                                   placeholder={"Enter option " + i + 1}
                                   onBlur={() => this.updateQuestionObject(i + 1, type)}
                                   autoComplete="off"
                                   style={{width: "50%"}}/>
                        </Radio>
                    </div>)
                else
                    options.push(<div style={{marginBottom: "5px"}}>
                        <Checkbox value={i + 1} disabled>
                            <Input id={i + 1}
                                   placeholder={"Enter option " + i + 1}
                                   onBlur={() => this.updateQuestionObject(i + 1, type)}
                                   autoComplete="off"
                                   style={{width: "50%"}}/>
                        </Checkbox>
                    </div>)
            }
            type == "radio" ? this.setState({options: (<RadioGroup>{options}</RadioGroup>)}) : this.setState({
                options: (<CheckboxGroup>{options}</CheckboxGroup>)
            })
        }
    }

    updateQuestionObject = (id, type) => {
        this.state.questionAnsMap.questionId = this.state.questionId
        this.state.questionAnsMap.type = type
        if (!this.state.questionAnsMap.options)
            this.state.questionAnsMap.options = []
        this.state.questionAnsMap.options[id - 1] = document.getElementById(id).value
    }

    updateQuestionName = () => {
        this.state.questionAnsMap.question = document.getElementById("question").value;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.props.dispatch({type: "ADD_NEW_DEMOGRAPHIC_QUESTION", payload: [this.state.questionAnsMap]})
                this.props.form.resetFields();
                this.setState({
                    restrictions: "",
                    options: "",
                    questionAnsMap: {},
                    visible: false,
                    questionId: uuidv1().split('-').join("")
                })
                this.props.togglePopup()
            }
        });
    }

    handleCancel = (e) => {
        if (this.state.visible) {
            this.setState({
                visible: false
            });
        } else {
            this.setState({
                visible: true
            });
        }
    }

    render = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Modal
                    title={"Add new questions"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem
                            label="Enter question"
                        >
                            {getFieldDecorator('question', {
                                rules: [{required: true, message: 'Please write the question'}],
                            })(
                                <Input id='question' autoComplete="off" onChange={this.updateQuestionName}/>
                            )}
                        </FormItem>
                        <FormItem
                            label="Select answer type"
                        >
                            {getFieldDecorator('answerType', {
                                rules: [{required: true, message: 'Please select answer type'}],
                            })(
                                <Select style={{width: 200}} onChange={this.handleChange}>
                                    <Option value="radio"><input type="radio" disabled/>Select single option</Option>
                                    <Option value="checkbox"><input type="checkbox" disabled/>Select multiple
                                        options</Option>
                                </Select>
                            )}
                        </FormItem>
                        {this.state.restrictions}
                        <br/>
                        {this.state.options}
                        <br/>
                        <input type={"submit"} value={"Add"} style={{
                            paddingBottom: "5px",
                            paddingTop: "5px"
                        }}/>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(AddQuestionPopup);
export default WrappedNormalLoginForm;