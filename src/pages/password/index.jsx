import React from 'react';
import crypto from '$utils/crypto';
import AddAccountModal from './addAccount';

import { Button, Modal, Form, Icon, Select, Row, Col } from 'antd';
import './index.less';

class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            AddAccountModalVisible: false,
        }
    }

    onAddAccountOk(values) {
        console.log(values);
    }

    render() {
        return (
            <div className="account-password">
                <Button type="primary" onClick={() => this.setState({ AddAccountModalVisible: true })}>Open</Button>
                <AddAccountModal
                    visible={this.state.AddAccountModalVisible}
                    onOk={this.onAddAccountOk.bind(this)}
                    onCancel={() => this.setState({ AddAccountModalVisible: false })} />
            </div>
        );
    }
}

export default Index;