import React from 'react';
import { Menu, Icon } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-Router-dom'
import Page1 from '../pages/page1';

export default class Index extends React.Component {
    constructor() {
        super()

        const Bus = () => <h3>Bus</h3>
        const Cart = () => <h3>Cart</h3>

        this.routes = [
            {
                path: '/cart',
                label: 'cart',
                component: Cart
            },
            {
                path: '/page1',
                label: 'page1',
                component: Page1,
                routes: [
                    {
                        path: '/page1/bus',
                        label: 'page1 bus',
                        component: Bus
                    },
                    {
                        path: '/page1/bus11',
                        label: 'bus.2',
                        component: Cart
                    }
                ]
            }
        ]
    }
    render() {
        const RouteWithSubRoutes = (route) => (
            <Route path={route.path} render={props => (
                <route.component {...props} routes={route.routes} />
            )} />
        );
        const LinkSubRouter = (data) => {
            let routes = data.routes;
            if (!!routes && routes.length > 0) {
                return routes.map((link, i) => {
                    return <li key={i}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                });
            }
            return null;

        }
        return (
            <Router>
                <div>
                    <ul>
                        {this.routes.map((v, i) => {
                            return <div key={i}><Link to={v.path}>{v.label}</Link>
                                <LinkSubRouter key={i} routes={v.routes} />
                            </div>
                        })}
                    </ul>
                    <div>
                        {this.routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </div>
                </div>
            </Router>
        )
    }
}