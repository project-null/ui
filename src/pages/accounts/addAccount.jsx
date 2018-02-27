import React from 'react';
import crypto from '$utils/crypto';
import accountType from '$utils/accountType';

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
        };

        this.typeList = accountType;
    }
    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        if (data !== this.props.data) {
            if (nextProps.visible) {
                delete data.key;
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
            let encode = cryp.encrypt(values.password, values.key);

            delete values.key;
            delete values.password;

            values.secretText = encode

            if (this.props.data) {
                const { _id } = this.props.data;
                values._id = _id;
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

    genPassword() {        
        let ranStr = Math.random().toString(36).substr(7);
        let time = new Date().getTime() % 10000;
        let symbols = ['_', '-', '@', '#', '!']

        let symbolsIndex = Math.floor(Math.random() * symbols.length)
        let symbol = symbols[symbolsIndex];
        let password = `${ranStr}${symbol}${time}`;
        
        
        this.setState({
            showPassword: true,
        });

        this.props.form.setFieldsValue({
            password
        });
    }

    deCode() {
        let { key } = this.props.form.getFieldsValue();
        let { secretText } = this.props.data;

        if (!key) {
            alert('请输入key');
        }
        let cryp = new crypto();
        let password = cryp.decrypt(secretText, key)

        this.props.form.setFieldsValue({
            password
        });

        this.setState({
            showPassword: true,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        };
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };
        return (
            <div>
                <Modal
                    title="添加账户信息"
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancle.bind(this)}>
                    <div className="account-password">
                        <Form>
                            <FormItem {...formItemLayout} label="账号名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '账号名称' }],
                                })(
                                    <Input placeholder="请输入账号名称" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="账号类型">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择账号类型' }],
                                })(
                                    <Select placeholder="请选择账号类型">
                                        {
                                            this.typeList.map(v => <Option key={v.id} value={v.id}>{v.text}</Option>)
                                        }
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="网址">
                                {getFieldDecorator('url', { initialValue: 'http://' })(
                                    <Input placeholder="请输入网址" />
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="用户名">
                                {getFieldDecorator('accountName', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input placeholder="用户名" />
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="标签">
                                {getFieldDecorator('labels')(
                                    <Select
                                        mode="tags"
                                        placeholder="请输入标签，方便查找"
                                    />
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="备注">
                                {getFieldDecorator('common')(
                                    <TextArea placeholder="请输入备注,可选" autosize={{ minRows: 3, maxRows: 6 }} />
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="秘钥">
                                {getFieldDecorator('key', {
                                    rules: [{ required: true, message: '请输入秘钥' }],
                                })(
                                    <Input type="password" placeholder="秘钥请牢记，若遗忘则无法找回" />
                                )}
                            </FormItem>

                            <Row>
                                <FormItem {...formItemLayout1} label="密码" className="mb-5">
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入密码' }],
                                    })(
                                        <Input type={this.state.showPassword ? 'text' : 'password'} onChange={this.onPasswordChange} placeholder="密码，仅用于加密而不保存在后端" />
                                    )}
                                </FormItem>
                                <Button className="right-part" onClick={this.genPassword.bind(this)}>生成</Button>
                            </Row>


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