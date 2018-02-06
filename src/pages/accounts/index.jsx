import React from 'react';
import crypto from '$utils/crypto';
import AddAccountModal from './addAccount';
import AccountsModel from '$models/accounts';

import { Button, Modal, Form, Icon, Table, Row, Col } from 'antd';
import './index.less';

const FormItem = Form.Item;

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            AddAccountModalVisible: false,
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

    onAddAccountOk(values) {
        AccountsModel.save(values).then(xhr => {
            this.setState({ AddAccountModalVisible: false });
            this.getTablesData();
        });
    }

    accountDetail(value) {
        this.setState({
            accountDetail: value,
            AddAccountModalVisible: true,
        });
    }

    tableColumns() {
        return [{
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '网址',
            dataIndex: 'url',
            key: 'url',
        }, {
            title: '用户名',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '密文',
            dataIndex: 'password',
            key: 'password',
        }, {
            title: '备注',
            dataIndex: 'common',
            key: 'common',
        }, {
            title: '标签',
            dataIndex: 'labels',
            key: 'labels',
            render: labels => {
                return labels.map(v => {
                    return <span key={v} className="labels-item">{v}</span>;
                });
            },
        }, {
            title: '操作',
            dataIndex: '',
            key: 'actions',
            render: (labels, b) => {
                return <div>
                    <Button size="small" title="查看密码" type="primary" className="mr-5" onClick={() => { this.accountDetail(b) }}>
                        <Icon type="eye" />
                    </Button>
                    <Button size="small" title="编辑" className="mr-5" onClick={() => { this.accountDetail(b) }}>
                        <Icon type="edit" />
                    </Button>
                    <Button size="small" title="删除" type="danger" className="mr-5" >
                        <Icon type="user-delete" />
                    </Button>
                </div>;
            },
        }];
    }

    render() {
        return (
            <div className="account-password">
                <div className="text-right mb-10">
                    <Button type="primary" onClick={() => this.setState({ AddAccountModalVisible: true })}><Icon type="user-add" /></Button>
                </div>
                <AddAccountModal
                    data={this.state.accountDetail}
                    visible={this.state.AddAccountModalVisible}
                    onOk={this.onAddAccountOk.bind(this)}
                    onCancel={() => this.setState({ AddAccountModalVisible: false })} />
                <Table size="small" dataSource={this.state.dataSource} columns={this.tableColumns()} />
            </div>
        );
    }
}

export default Index;