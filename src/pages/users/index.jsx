import React from 'react';
import users from '$models/users';
import { Table, Button } from 'antd';

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
        };
    }

    componentDidMount() {
        users.getUser().then(r => {
            r.data.map(r => r.key = r._id);
            this.setState({
                dataSource: r.data
            })
        });
    }
    
    tableColumns() {
        return [{
            title: '登录名',
            dataIndex: 'loginName',
            key: 'loginName',
        }, {
            title: '昵称',
            dataIndex: 'nikeName',
            key: 'nikeName',
        }, {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        }];
    }

    render() {
        return (
            <div>
                <h3>用户管理</h3>
                <Table dataSource={this.state.dataSource} columns={this.tableColumns()} />
            </div >
        );
    }
}