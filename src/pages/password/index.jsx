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
            visible: true
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
    }

    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log(values);

            let cryp = new crypto();
            let key = cryp.genKey(values.key);
            let encode = cryp.aesEncrypt(values.password, key);
            let desCode = cryp.aesDecrypt(encode, key)
            console.log(encode, desCode);

            this.setState({ visible: false });
        });
    }


    onPasswordChange(e) {
        let value = e.target.value;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Button type="primary" onClick={() => this.showModal()}>Open</Button>
                <Modal
                    title="添加账户信息"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    >
                    <div>
                        <Form>
                            <FormItem {...this.formItemLayout} label="账号类型">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择账号类型' }],
                                })(
                                    <Select defaultValue="lucy">
                                        <Option value="jack">she</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled">Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem {...this.formItemLayout} label="网址">
                                {getFieldDecorator('userName')(
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
                                    <Input onChange={this.onPasswordChange} placeholder="密码，仅用于加密而不保存在后端" />
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