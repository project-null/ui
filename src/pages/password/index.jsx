import React from 'react';
import crypto from '$utils/crypto';

import { Input, Button, Modal, Form, Icon, Select, Row, Col } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option


class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            showPassword: false,
        }

        this.formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
    }
    onClick() {

    }

    handleCancle() {
        this.setState({ visible: false });
        this.props.form.resetFields();
    }

    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let cryp = new crypto();
            let key = cryp.genKey(values.key);
            let encode = cryp.aesEncrypt(values.password, key);
            let desCode = cryp.aesDecrypt(encode, key)
            values.password = encode;
            console.log(values, desCode);

            this.setState({ visible: false });
        });
    }

    onPasswordChange(e) {
        let value = e.target.value;
    }
    onShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Button type="primary" onClick={() => this.setState({ visible: true })}>Open</Button>
                <Modal
                    title="添加账户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancle.bind(this)}
                >
                    <div>
                        <Form>
                            <FormItem {...this.formItemLayout} label="账号类型">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择账号类型' }],
                                })(
                                    <Select>
                                        <Option value="jack">she</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled">Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="网址">
                                {getFieldDecorator('url')(
                                    <Input placeholder="请输入网址" />
                                )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="用户名">
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input placeholder="用户名" />
                                    )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="密码">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Row>
                                        <Col span={18}>
                                            <Input onChange={this.onPasswordChange} type={this.state.showPassword ? 'text' : 'password'} placeholder="密码，仅用于加密而不保存在后端" />
                                        </Col>
                                        <Col span={6}>
                                            <Button onClick={this.onShowPassword.bind(this)}>show</Button>
                                        </Col>
                                    </Row>
                                    )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="秘钥">
                                {getFieldDecorator('key', {
                                    rules: [{ required: true, message: '请输入秘钥' }],
                                })(
                                    <Input placeholder="秘钥请牢记，若遗忘则无法找回" />
                                    )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="标签">
                                {getFieldDecorator('tags')(
                                    <Select
                                        mode="tags"
                                        placeholder="请输入标签，方便查找"
                                    />
                                )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="备注">
                                {getFieldDecorator('common')(
                                    <TextArea autosize={{ minRows: 3, maxRows: 6 }} />
                                )}
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
            </div >
        );
    }
}

const form = Form.create()(Index);
export default form;