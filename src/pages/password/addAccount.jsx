import React from 'react';
import crypto from '$utils/crypto';

import { Input, Button, Modal, Form, Icon, Select } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option


class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false
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
    componentWillReceiveProps(nextProps) {

    }

    handleCancle() {
        this.setState({ visible: false });
        this.props.form.resetFields();
        this.props.onCancel();
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
            this.props.onOk(values)
        });
    }

    onPasswordChange(e) {
        let value = e.target.value;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="添加账户信息"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancle.bind(this)}>
                    <div className="account-password">
                        <Form>

                            <FormItem {...this.formItemLayout} label="账号类型">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择账号类型' }],
                                })(
                                    <Select placeholder="请选择账号类型">
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
                                    <Input width="100" type="password" onChange={this.onPasswordChange} placeholder="密码，仅用于加密而不保存在后端" />
                                    )}
                            </FormItem>

                            <FormItem {...this.formItemLayout} label="秘钥">
                                {getFieldDecorator('key', {
                                    rules: [{ required: true, message: '请输入秘钥' }],
                                })(
                                    <Input type="password" placeholder="秘钥请牢记，若遗忘则无法找回" />
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
                                    <TextArea placeholder="请输入备注,可选" autosize={{ minRows: 3, maxRows: 6 }} />
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