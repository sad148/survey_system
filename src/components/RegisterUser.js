import React, {Component} from 'react';
import { Form, Input, Select, Button } from 'antd';
import {connect} from 'react-redux';
import registerUser from '../actions/RegisterUser.js'
const FormItem = Form.Item;
const Option = Select.Option;
//import Popup from './popup.js';

class RegisterUser extends Component {
    componentWillMount = () => {
        this.setState({
            confirmDirty: false,
            autoCompleteResult: [],
        });
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("inside componentWillRec", nextProps);
        if(nextProps.userRegistered == true) {
            alert('Registered successfully');
            this.props.dispatch({type:"RESET_REGISTER_USER"})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch(registerUser(values));
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render = () => {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
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
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="First Name"
                >
                    {getFieldDecorator('first_name', {
                        rules: [{
                            required: true, message: 'Please enter you first name',
                        }],
                    })(
                        <Input type="text" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Last Name"
                >
                    {getFieldDecorator('last_name', {
                        rules: [{
                            required: true, message: 'Please enter you last name',
                        }],
                    })(
                        <Input type="text" onBlur={this.handleConfirmBlur}/>
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
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password"/>
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
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Country"
                >
                    {getFieldDecorator('country', {
                        rules: [{
                            required: true, message: 'Please enter your country',
                        }],
                    })(
                        <Input type="text" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Role"
                >
                    {getFieldDecorator('role', {
                        rules: [{
                            required: true, message: 'Please enter your role',
                        }],
                    })(
                        <Input type="text" onBlur={this.handleConfirmBlur}/>
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
                        <Input type="text" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                >
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        userRegistered:store.registerUser.userRegistered,
        data:store.registerUser.data,
        message:store.registerUser.message
    }
}

const WrappedRegistrationForm = Form.create()(RegisterUser);
export default connect(mapStateToProps)(WrappedRegistrationForm);