import React from 'react';
import crypto from '$utils/crypto';

import { Input, Button, Modal, Form, Icon, Select, Row, Col, Checkbox } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option


class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            showPassword: false
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
        const { data } = nextProps;
        if (data !== this.props.data) {
            if (nextProps.visible) {
                delete data.key;
                console.log(data);
                this.props.form.setFieldsValue(data);
            }
        }
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

            delete values.key;
            delete values.password;

            values.secretText = encode

            if (this.props.data) {
                const { uuid } = this.props.data;
                values.uuid = uuid;
            }
            this.props.onOk(values, this.props.mode);
            this.props.form.resetFields();
        });
    }

    onPasswordChange(e) {
        let value = e.target.value;
    }

    onShowPassword(e) {
        let checked = e.target.checked;
        this.setState({
            showPassword: checked,
        })
    }

    deCode() {
        let { key } = this.props.form.getFieldsValue();
        let { secretText } = this.props.data;

        if (!key) {
            alert('请输入key');
        }
        let cryp = new crypto();
        let decodeKey = cryp.genKey(key);
        let password = cryp.aesDecrypt(secretText, decodeKey)

        this.props.form.setFieldsValue({
            password
        });

        this.setState({
            showPassword: true,
        })
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
                            <FormItem {...this.formItemLayout} label="账号名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '账号名称' }],
                                })(
                                    <Input placeholder="请输入账号名称" />
                                    )}
                            </FormItem>
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
                                {getFieldDecorator('accountName', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input placeholder="用户名" />
                                    )}
                            </FormItem>

                            <FormItem {...this.formItemLayout} label="标签">
                                {getFieldDecorator('labels')(
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

                            <FormItem {...this.formItemLayout} label="秘钥">
                                {getFieldDecorator('key', {
                                    rules: [{ required: true, message: '请输入秘钥' }],
                                })(
                                    <Input type="password" placeholder="秘钥请牢记，若遗忘则无法找回" />
                                    )}
                            </FormItem>

                            <FormItem {...this.formItemLayout} label="密码" className="mb-5">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input type={this.state.showPassword ? 'text' : 'password'} onChange={this.onPasswordChange} placeholder="密码，仅用于加密而不保存在后端" />
                                    )}
                            </FormItem>

                            <Row className="mb-10" key="view">
                                <Col offset={5} lg={19}>
                                    <Checkbox onChange={this.onShowPassword.bind(this)}>显示密码</Checkbox>
                                </Col>
                            </Row>

                            {this.props.mode === 'edit' ?
                                [
                                    ,
                                    <Row className="mb-10" key="decode">
                                        <Col offset={5} lg={19}>
                                            <Button type="primary" onClick={this.deCode.bind(this)}>解密</Button>
                                        </Col>
                                    </Row>
                                ] : ''
                            }
                        </Form>
                    </div>
                </Modal>
            </div >
        );
    }
}

const form = Form.create()(Index);
export default form;