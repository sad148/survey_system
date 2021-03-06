import React, {Component} from 'react';
import RegisterUser from '../components/RegisterUser.js';
import login from '../actions/Login.js';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Error from '../components/Error.js'
import {Form, Icon, Input, Modal} from 'antd';
import ForgotPassword from '../components/ForgotPassword'

const FormItem = Form.Item;

class Login extends Component {
    componentWillMount = () => {
        sessionStorage.setItem("apiurl", "http://localhost:3009/")
        this.setState({
            showRegister: false,
            visible: false,
            forgotPasswordModal: false
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.loginSuccess == true) {
            this.props.dispatch({type: "RESET_LOGIN"})
            browserHistory.replace('/survey_system/list_projects');
            //projects reducer
            this.props.dispatch({type: "PROJECT_DATA", payload: nextProps.data});
        }
    }

    shouldComponentUpdate = (nextProps) => {
        if (nextProps.loginSuccess == false && this.props.loginSuccess == true)
            return false;
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch(login(values));
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

    forgotPasswordModalCancel = (e) => {
        if (this.state.forgotPasswordModal) {
            this.setState({
                forgotPasswordModal: false
            });
        } else {
            this.setState({
                forgotPasswordModal: true
            });
        }
    }

    forgotPassword = () => {

    }

    render = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id='loginContainer'>
                <div id="loginFormContainer">
                    <Form className="login-form">
                        <div id="loginTextContainer">
                            <label style={{fontSize: "50px"}} id="loginText" className={"fontColor"}>Login</label>
                        </div>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your email'}],
                            })(
                                <div>
                                    <label style={{color: "red"}}>*</label>&nbsp;<label
                                    className={"fontColor"}>E-mail</label>
                                    <Input id='username' className="form-input loginTextBox" autoComplete="off"
                                           prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                </div>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <div>
                                    <label style={{color: "red"}}>*</label>&nbsp;<label
                                    className={"fontColor"}>Password</label>
                                    <Input id='password' className="form-input loginTextBox"
                                           prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"/>
                                </div>
                            )}
                        </FormItem>
                        <FormItem>
                            <div id={"loginPageButtons"}>
                                <input type="button" id='forgotPwd' onClick={this.forgotPasswordModalCancel}
                                       value="Forgot Password"/>
                                <input type="button" id='signin' onClick={this.handleSubmit} value="Continue"/>
                                <br/>
                            </div>
                        </FormItem>
                        <div id="registerLinkDiv">
                            <label id="registerLink" className={"fontColor"}>Not registered,
                                <a
                                    onClick={this.handleCancel}
                                >
                                    CLICK HERE
                                </a></label>
                        </div>
                    </Form>
                    <Modal visible={this.state.visible} footer={null}
                           style={{top: 20}}
                           bodyStyle={{backgroundColor: "white"}}
                           onCancel={this.handleCancel}><RegisterUser removeMainModal={this.handleCancel}/></Modal>
                    <Error/>
                    <Modal visible={this.state.forgotPasswordModal} footer={null}
                           style={{top: 20}}
                           bodyStyle={{backgroundColor: "white"}}
                           onCancel={this.forgotPasswordModalCancel}><ForgotPassword
                        removeMainModal={this.forgotPasswordModalCancel}/></Modal>
                    <Error/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (store) => {
    return {
        loginSuccess: store.login.loginSuccess,
        data: store.login.data,
        message: store.login.message
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default connect(mapStateToProps)(WrappedNormalLoginForm);