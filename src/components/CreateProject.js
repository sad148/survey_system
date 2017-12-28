import React, {Component} from 'react';
import { Form, Input, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
//import Popup from './popup.js';

class CreateProject extends Component {
    componentWillMount = () => {
        console.log("inside componentwillmount");
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
                values.user_id = this.props.user_id;
                //createProject.createProject
                //this.props.dispatch({});
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
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
                    label="Project Name"
                >
                    {getFieldDecorator('project_name', {
                        rules: [{
                            required: true, message: 'Please enter you project name',
                        }],
                    })(
                        <Input type="text" onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                >
                    {getFieldDecorator('description')(
                        <Input type="text" onBlur={this.handleConfirmBlur} autosize={{ minRows: 2, maxRows: 6 }}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(CreateProject);
export default WrappedRegistrationForm;