import React, {Component} from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Radio } from 'antd';
var project_name, description, template;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const FormItem = Form.Item;
const Option = Select.Option;
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
class CreateProjectStep1 extends Component {
    componentWillMount = () => {
        console.log("inside componentwillmount", this.props.form.getFieldsValue());
        this.setState({
            confirmDirty: false,
            autoCompleteResult: [],
            current:0
        });
    }

    componentDidMount = () => {
        if (this.props.props.data[0] && this.props.props.data[0].template){
            this.props.form.setFieldsValue({"project_name": this.props.props.data[0].project_name || ""})
            this.props.form.setFieldsValue({"description": this.props.props.data[0].description || ""})
            this.props.form.setFieldsValue({"template": this.props.props.data[0].template || 1})
        }
    }

    next = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let step = {
                    step1: {
                        template: this.props.form.getFieldValue("defaultQues"),
                        project_name: this.props.form.getFieldValue("project_name"),
                        description: this.props.form.getFieldValue("description")
                    }
                }
                this.props.props.dispatch({type:"NEXT", payload:step})
                } else {
                console.log(err);
            }
        });
    }

    onChange = (e) => {
        this.setState({
            template: e.target.value
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    render = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form>
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
                <FormItem
                    {...formItemLayout}
                    label="Select default questionnaire"
                >
                    {getFieldDecorator('defaultQues', {
                        rules:[{
                            required:true, message:"Please select default questionnaire"
                        }]
                    })(
                        <RadioGroup onChange={this.onChange} value={this.state.template}>
                            <RadioButton value={1}>TUQ</RadioButton>
                            <RadioButton value={2}>MUQ</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem>
                    <Button id = 'next' type="primary" htmlType="submit" onClick = {this.next}>
                        Next
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(CreateProjectStep1);
export default WrappedRegistrationForm;