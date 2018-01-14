import React from 'react';
import { Menu, Icon } from 'antd';
import {
    Route,
} from 'react-Router-dom';

export default class Index extends React.Component {
    constructor() {
        super()
    }
    
    render() {
        return (
            <div className="container">
                <div className="content">
                    <Route path={route.path} render={props => (
                        <route.component {...props} routes={route.routes} />
                    )} />
                </div>
            </div>
        )
    }
}