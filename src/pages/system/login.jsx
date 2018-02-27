import { Form, Icon, Input, Button, Checkbox, Col, Row } from 'antd';
const FormItem = Form.Item;

import React from 'react';
import './index.less';

import UsersModel from '$models/users';


class NormalLoginForm extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                UsersModel.login(values).then(xhr => {
                    UsersModel.setToken(xhr.data);
                    this.props.history.push('/pages');
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="page-login">
                <Row>
                    <Col offset={13} lg={4}>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                            <FormItem hasFeedback>
                                {getFieldDecorator('loginName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">login in </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;