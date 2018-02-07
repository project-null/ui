import React from 'react';
import { Button } from 'antd';

class Inndex extends React.Component {
    constructor() {
        super();
    }

    onClick() {
        this.props.history.replace("/accounts");
    }
    onClick1() {
        this.props.history.replace("/");
    }
    render() {
        return (
            <div>
                <Button onClick={() => this.onClick()}>logout</Button>
                <Button onClick={() => this.onClick1()}>logout</Button>
            </div>
        );
    }
}

export default Inndex