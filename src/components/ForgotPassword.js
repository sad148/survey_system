import React, {Component} from 'react'
import {Form, Input, Select, Modal} from 'antd';
import {connect} from 'react-redux';
import registerUser from "../actions/RegisterUser";
import md5 from 'md5'

var updatePassword = require('../actions/UpdatePassword')
var getUserDetails = require('../actions/GetUserDetails')
var validateemail = require('../actions/ValidateEmail');
const FormItem = Form.Item;

class ForgotPassword extends Component {
    state = {
        showQuestions: false,
        showButton: true,
        securityQuestion1: "",
        securityQuestion2: "",
        securityQuestion3: "",
        securityAnswer1: "",
        securityAnswer2: "",
        securityAnswer3: "",
        disableEmail: false,
        showNewPassword: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.state.securityAnswer1 != md5(values.securityAnswer1))
                    alert("Answer of 1st question is wrong")
                else if (this.state.securityAnswer2 != md5(values.securityAnswer2))
                    alert("Answer of 2nd question is wrong")
                else if (this.state.securityAnswer3 != md5(values.securityAnswer3))
                    alert("Answer of 3rd question is wrong")
                else
                    this.setState({
                        showNewPassword: true,
                        showQuestions: false
                    })
            }
        });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    getUserDetails = () => {
        let email = this.props.form.getFieldValue("email");
        validateemail.validateemail((email), response => {
            if (response.validate) {
                getUserDetails.getuserdetails(email, (data) => {
                    data = data.data
                    console.log(data, data.securityQuestion1);
                    this.setState({
                        securityQuestion1: data.securityQuestion1,
                        securityQuestion2: data.securityQuestion2,
                        securityQuestion3: data.securityQuestion3,
                        securityAnswer1: data.securityAnswer1,
                        securityAnswer2: data.securityAnswer2,
                        securityAnswer3: data.securityAnswer3,
                        showQuestions: true,
                        showButton: false,
                        disableEmail: true
                    })
                })
            } else {
                this.setState({
                    showQuestions: false
                })
                alert("Incorrect email");
            }
        })
    }

    updatePassword = () => {
        let email = this.props.form.getFieldValue("email");
        let password = this.props.form.getFieldValue("password");
        updatePassword.updatePassword(email, password, (response) => {
            alert(response.message)
            this.props.removeMainModal()
        })
    }

    render = () => {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            colon: false,
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div>
                <Form style={{paddingRight: "30px"}}>
                    <div id="registerTitleDiv" style={{textAlign: "center", marginBottom: "10px"}}>
                        <label style={{fontSize: "30px"}} className={"fontColor"}>Create New Password</label>
                    </div>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input autoComplete={"off"} disabled={this.state.disableEmail}/>
                        )}
                    </FormItem>
                    {
                        (this.state.showButton) ?
                            <input type="button" value="Continue"
                                   style={{width: "100%", height: "15%", marginBottom: 10}}
                                   onClick={this.getUserDetails}></input> : ""
                    }
                    {
                        (this.state.showQuestions) ?
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="Question : "
                                >
                                    <label type="text" className={"fontColor"}
                                           style={{width: '100%'}}>{this.state.securityQuestion1}</label>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Answer"
                                >
                                    {getFieldDecorator('securityAnswer1', {
                                        rules: [{required: true, message: 'Please answer the security question!'}
                                        ],
                                    })(
                                        <Input autoComplete={"off"} type="text" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Question : "
                                >
                                    <label type="text" className={"fontColor"}
                                           style={{width: '100%'}}>{this.state.securityQuestion2}</label>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Answer"
                                >
                                    {getFieldDecorator('securityAnswer2', {
                                        rules: [{required: true, message: 'Please answer the security question!'}
                                        ],
                                    })(
                                        <Input autoComplete={"off"} type="text" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Question : "
                                >
                                    <label type="text" className={"fontColor"}
                                           style={{width: '100%'}}>{this.state.securityQuestion3}</label>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Answer"
                                >
                                    {getFieldDecorator('securityAnswer3', {
                                        rules: [{required: true, message: 'Please answer the security question!'}
                                        ],
                                    })(
                                        <Input autoComplete={"off"} type="text" style={{width: '100%'}}/>
                                    )}
                                </FormItem>
                                <input type="button" value="Continue"
                                       style={{width: "100%", height: "15%", marginBottom: 10}}
                                       onClick={this.handleSubmit}></input>
                            </div>
                            : (this.state.showNewPassword) ?
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    label="Password"
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input your password!',
                                        }],
                                    })(
                                        <Input autoComplete={"off"} type="password"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Confirm Password"
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: 'Please confirm your password!',
                                        }, {
                                            validator: this.checkPassword,
                                        }],
                                    })(
                                        <Input autoComplete={"off"} type="password"/>
                                    )}
                                </FormItem>
                                <input type="button" value="Create"
                                       style={{width: "100%", height: "15%", marginBottom: 10}}
                                       onClick={this.updatePassword}></input>
                            </div>
                            : ""
                    }

                </Form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {}
}
const WrappedNormalLoginForm = Form.create()(ForgotPassword);
export default connect(mapStateToProps)(WrappedNormalLoginForm);