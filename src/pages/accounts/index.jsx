import React from 'react';
import crypto from '$utils/crypto';
import AddAccountModal from './addAccount';
import AccountsModel from '$models/accounts';

import { Button, Modal, Form, Icon, Table, Row, Col } from 'antd';
import './index.less';

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
        console.log(value);
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
                    <Button size="small" onClick={() => { this.accountDetail(b) }}>查看/编辑</Button>
                    <Button size="small">删除</Button>
                </div>;
            },
        }];
    }

    render() {
        return (
            <div className="account-password">
                <Button type="primary" onClick={() => this.setState({ AddAccountModalVisible: true })}>添加账号</Button>
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