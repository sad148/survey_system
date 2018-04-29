import React, {Component} from 'react';
import {Form, Input, Select, Modal} from 'antd';
import {connect} from 'react-redux';
import Error from '../components/Error.js'
import registerUser from '../actions/RegisterUser'

var validateemail = require('../actions/ValidateEmail');
var getregistermetadata = require('../actions/GetRegisterMetadata')
const FormItem = Form.Item;
const Option = Select.Option;

var securityQuestions1 = [],
    securityQuestions2 = [],
    securityQuestions3 = []
const questions = {
    1: "What was your childhood nickname?",
    2: "What is the name of your favorite childhood friend?",
    3: "In what city or town did your mother and father meet?",
    4: "What is the middle name of your oldest child?",
    5: "What is your favorite team?",
    6: "What is your favorite movie?",
    7: "What was your favorite sport in high school?",
    8: "What was your favorite food as a child?",
    9: "What was the make of your first car?",
    10: "What was the name of the hospital where you were born?",
    11: "In what town was your first job?",
    12: "What was the name of the company where you had your first job?",
    13: "What primary school did you attend?",
    14: "In what town or city did you meet your spouse/partner?",
    15: "What is the middle name of your oldest child?"
}

for (let i in questions) {
    if (i < 6)
        securityQuestions1.push(<Option value={i}>{questions[i]}</Option>)
    else if (i > 6 && i < 12)
        securityQuestions2.push(<Option value={i}>{questions[i]}</Option>)
    else
        securityQuestions3.push(<Option value={i}>{questions[i]}</Option>)
}

class RegisterUser extends Component {
    state = {
        autoCompleteResult: [],
        countries: [],
        role: [],
        visibleSuccessModal: false,
        position: []
    }

    componentDidMount = () => {
        let countries = []
        let role = []
        let position = []
        getregistermetadata.getregistermetadata((metadata) => {
            for (let i = 0; i < metadata.countries.length; i++) {
                countries.push(<Option value={metadata.countries[i].id}>{metadata.countries[i].value}</Option>)
            }
            for (let i = 0; i < metadata.roles.length; i++) {
                role.push(<Option value={metadata.roles[i].id}>{metadata.roles[i].value}</Option>)
            }
            for (let i = 0; i < metadata.positions.length; i++) {
                position.push(<Option value={metadata.positions[i].id}>{metadata.positions[i].value}</Option>)
            }

            this.setState({
                countries: countries,
                role: role,
                position: position
            })
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.userRegistered == true) {
            this.props.dispatch({type: "RESET_REGISTER_USER"})
            this.setState({visibleSuccessModal: true});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values["securityQuestion1"] = questions[values["securityQuestion1"]]
                values["securityQuestion2"] = questions[values["securityQuestion2"]]
                values["securityQuestion3"] = questions[values["securityQuestion3"]]
                this.props.dispatch(registerUser(values));
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

    checkEmail = (rule, value, callback) => {
        validateemail.validateemail((value), response => {
            if (!response.validate) {
                callback();
            } else {
                callback("Email is already used");
            }
        })
    }

    handleCancel = (e) => {
        this.setState({
            visibleSuccessModal: false
        });
        this.props.removeMainModal();
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
                        <label style={{fontSize: "40px"}} className={"fontColor"}>Register</label>
                    </div>
                    <FormItem
                        {...formItemLayout}
                        label="First Name"
                    >
                        {getFieldDecorator('first_name', {
                            rules: [{
                                required: true, message: 'Please enter your first name',
                            }],
                        })(
                            <Input autoComplete={"off"} type="text" className="form-input loginTextBox"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Last Name"
                    >
                        {getFieldDecorator('last_name', {
                            rules: [{
                                required: true, message: 'Please enter your last name',
                            }],
                        })(
                            <Input autoComplete={"off"} type="text"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }, {
                                validator: this.checkEmail
                            }],
                        })(
                            <Input autoComplete={"off"}/>
                        )}
                    </FormItem>
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
                    <FormItem
                        {...formItemLayout}
                        label="Address"
                    >
                        {getFieldDecorator('address')(
                            <Input autoComplete={"off"} type="text"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Country and Region"
                    >
                        {getFieldDecorator('country', {
                            rules: [{
                                required: true, message: 'Please select your country',
                            }],
                        })(
                            <Select placeholder="Please select a country">
                                {this.state.countries}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Role"
                    >
                        {getFieldDecorator('role')(
                            <Input autoComplete={"off"} type="text"
                                   placeholder="Please enter your role"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Organization"
                    >
                        {getFieldDecorator('organization', {
                            rules: [{
                                required: true, message: 'Please enter your organization',
                            }],
                        })(
                            <Input autoComplete={"off"} type="text"
                                   placeholder="Please enter your organization"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Position"
                    >
                        {getFieldDecorator('position')(
                            <Input autoComplete={"off"} type="text"
                                   placeholder="Please enter your position"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: 'Please input your phone number!'}
                            ],
                        })(
                            <Input autoComplete={"off"} type="text" style={{width: '100%'}}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Security Question 1"
                    >
                        {getFieldDecorator('securityQuestion1', {
                            rules: [{
                                required: true, message: 'Please select a security question',
                            }],
                        })(
                            <Select placeholder="Please select a security question">
                                {securityQuestions1}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Answer 1"
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
                        label="Security Question 2"
                    >
                        {getFieldDecorator('securityQuestion2', {
                            rules: [{
                                required: true, message: 'Please select a security question',
                            }],
                        })(
                            <Select placeholder="Please select a security question">
                                {securityQuestions2}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Answer 2"
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
                        label="Security Question 3"
                    >
                        {getFieldDecorator('securityQuestion3', {
                            rules: [{
                                required: true, message: 'Please select a security question',
                            }],
                        })(
                            <Select placeholder="Please select a security question">
                                {securityQuestions3}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Answer 3"
                    >
                        {getFieldDecorator('securityAnswer3', {
                            rules: [{required: true, message: 'Please answer the security question!'}
                            ],
                        })(
                            <Input autoComplete={"off"} type="text" style={{width: '100%'}}/>
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <input type="button" id='register' onClick={this.handleSubmit} value="Register"/>
                    </FormItem>
                </Form>
                <Error/>
                <Modal visible={this.state.visibleSuccessModal} footer={null}
                       bodyStyle={{backgroundColor: "#356fb7"}}
                       onCancel={this.handleCancel}>
                    <div style={{
                        display: "flex",
                        textAlign: "center",
                        flexDirection: "column",
                        paddingTop: 100,
                        paddingBottom: 100
                    }}>
                        <label style={{fontSize: "50px"}}>Thank you!</label>
                        <label style={{fontSize: "30px"}}>Registration Complete</label>
                        <br/>
                        <input type="button" value="Continue to login"
                               style={{width: "100%", height: "15%", marginBottom: 10}}
                               onClick={this.handleCancel}></input>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userRegistered: store.registerUser.userRegistered,
        data: store.registerUser.data,
        message: store.registerUser.message
    }
}

const WrappedRegistrationForm = Form.create()(RegisterUser);
export default connect(mapStateToProps)(WrappedRegistrationForm);