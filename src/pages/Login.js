import React, {Component} from 'react';
import RegisterUser from '../components/RegisterUser.js';
import login from '../actions/Login.js';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import { history } from '../store';
import '../../node_modules/antd/lib/input/style/index.css';
import '../../node_modules/antd/lib/button/style/index.css';
import '../../node_modules/antd/lib/form/style/index.css';
import '../../node_modules/antd/lib/modal/style/index.css';
import { Form, Icon, Input, Button, Modal} from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    componentWillUnmount = () => {
        console.log("inside unmount");
    }
    componentWillMount = () => {
        this.setState({
            showRegister:false,
            visible:false
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.loginSuccess == true) {
            this.props.dispatch({type:"RESET_LOGIN"})
            this.props.history.replace('/survey_system/home');
            this.props.dispatch({type:"PROJECT_DATA", payload:nextProps.data});
        }
    }

    shouldComponentUpdate = (nextProps) => {
        if(nextProps.loginSuccess == false && this.props.loginSuccess == true)
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id = 'login'>
                <Form className="login-form">
                    <FormItem
                        label="Username"
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input id = 'username' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input id ='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button id = 'signin' onClick = {this.handleSubmit} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <br />
                        <Button id = 'register' type="primary" onClick = {this.showModal} htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                    </FormItem>
                </Form>
                <Modal title = 'Register' visible = {this.state.visible} footer = {null} onCancel = {this.handleCancel}><RegisterUser/></Modal>
            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        loginSuccess:store.login.loginSuccess,
        data:store.login.data,
        message:store.login.message
    }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default connect (mapStateToProps)(WrappedNormalLoginForm);