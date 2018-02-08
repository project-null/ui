import React from 'react';
import crypto from '$utils/crypto';
import AddAccountModal from './addAccount';
import AccountsModel from '$models/accounts';
import accountType from '$utils/accountType';

import { Button, message, Modal, Form, Icon, Table, Row, Col } from 'antd';
import './index.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;

class Index extends React.Component {
    constructor() {
        super();
        this.typeList = accountType;
        this.state = {
            dataSource: [],
            accountDetail: {
                visible: false,
            }
        }
    }

    componentDidMount() {
        this.getTablesData();
    }

    getTablesData() {
        AccountsModel.getAllAccount().then(response => {
            let dataSource = response.data.map(r => {
                r.key = r._id;
                return r;
            });
            this.setState({ dataSource });
        });
    }

    onAddAccountOk(values, mode) {
        if (mode === 'add') {
            AccountsModel.save(values).then(xhr => {
                this.setState({ accountDetail: { visible: false } });
                this.getTablesData();
                message.success('账号保存成功');
            }, err => message.error(`新增账号失败${err}`));
        } else if (mode === 'edit') {
            AccountsModel.update(values).then(xhr => {
                this.setState({ accountDetail: { visible: false } });
                this.getTablesData();
                message.success('账号保存成功');
            }, err => message.error(`更新账号失败${err}`));
        }
    }

    accountDetail(data, mode) {
        this.setState({
            accountDetail: {
                data,
                mode,
                visible: true,
            },
        });
    }

    deleteAccount(account) {
        let then = this;
        confirm({
            title: `是否删除账号名称${account.name}`,
            content: `是否删除账号名称${account.name},删除后将不在存储相关数据，无法恢复`,
            onOk() {
                AccountsModel.delete(account._id).then(xhr => {
                    then.getTablesData();
                });
            },
            onCancel() { },
        });
    }

    tableColumns() {
        return [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (typeID) => {
                if (isFinite(typeID) && typeID >= 0) {
                    return this.typeList[typeID].text;
                } else {
                    return typeID;
                }
            },
        }, {
            title: '网址',
            dataIndex: 'url',
            key: 'url',
            render: (url, account) => {
                return <a target="_blank" href={url}>{url}</a>;
            },
        }, {
            title: '用户名',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '备注',
            dataIndex: 'common',
            key: 'common',
        }, {
            title: '标签',
            dataIndex: 'labels',
            key: 'labels',
            render: labels => {
                return labels && labels.map(v => {
                    return <span key={v} className="labels-item">{v}</span>;
                });
            },
        }, {
            title: '操作',
            dataIndex: '',
            key: 'actions',
            render: (labels, account) => {
                return [
                    <Button key="edit" size="small" title="编辑" className="mr-5" onClick={() => { this.accountDetail(account, 'edit') }}>
                        <Icon type="edit" />
                    </Button>,
                    <Button key="delete" size="small" title="删除" type="danger" className="mr-5" onClick={() => { this.deleteAccount(account) }} >
                        <Icon type="user-delete" />
                    </Button>
                ];
            },
        }];
    }


    render() {
        return (
            <div className="account-password">
                <div className="text-right mb-10">
                    <Button type="primary" onClick={() => this.setState({ accountDetail: { visible: true, mode: 'add' } })}>
                        <Icon type="user-add" />
                    </Button>
                </div>
                <AddAccountModal
                    mode={this.state.accountDetail.mode}
                    data={this.state.accountDetail.data}
                    visible={this.state.accountDetail.visible}
                    onOk={this.onAddAccountOk.bind(this)}
                    onCancel={() => this.setState({ accountDetail: { visible: false } })} />
                <Table size="small" dataSource={this.state.dataSource} columns={this.tableColumns()} />
            </div>
        );
    }
}

export default Index;