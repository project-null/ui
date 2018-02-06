import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react';

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import './index.less';

import Favorites from '../favorites';
import Users from '../users';
import accounts from '../accounts';

import P1 from '../p1';
import P2 from '../p2';
import P3 from '../p3';

export default class Index extends Component {
    constructor() {
        super()
        this.state = {
            collapsed: false
        };
    };

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const routes = [{
            path: '/p1',
            title: '概览页',
            component: P1
        }, {
            path: '/favorites',
            title: '网页收藏夹',
            component: Favorites
        }, {
            path: '/accounts',
            title: '密码保险箱',
            component: accounts
        }, {
            path: '/settings/users',
            title: '用户',
            component: Users
        }]

        const RouteWithSubRoutes = (route) => (
            <Route path={route.path} render={props => (
                <route.component {...props} routes={route.routes} />
            )} />
        )

        return (<Router>
            <Layout className="layout">
                <Sider
                    // breakpoint="lg"
                    // collapsedWidth="0"
                    >
                    <div className="logo" />
                    <Menu theme="dark" style={{ width: 180 }} mode="inline" defaultSelectedKeys={['4']}>
                        <SubMenu title={<span><Icon type="area-chart" />概览页</span>}>
                            <Menu.Item ><Link to="/p1">概览1</Link></Menu.Item>
                            <Menu.Item ><Link to="">概览2</Link></Menu.Item>
                            <Menu.Item ><Link to="">概览3</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="appstore-o" />收藏夹</span>}>
                            <Menu.Item ><Link to="/favorites">概览</Link></Menu.Item>
                            <Menu.Item ><Link to="/favorites/manager">管理</Link></Menu.Item>
                        </SubMenu>

                        <SubMenu title={<span><Icon type="book" />密码本</span>}>
                            <Menu.Item ><Link to="/accounts">概览</Link></Menu.Item>
                            <Menu.Item ><Link to="/accounts/manager">管理</Link></Menu.Item>
                        </SubMenu>

                        <SubMenu title={<span><Icon type="setting" />系统管理</span>}>
                            <Menu.Item ><Link to="/settings/users">用户管理</Link></Menu.Item>
                            <Menu.Item ><Link to="/favorites/manager">管理</Link></Menu.Item>
                        </SubMenu>
                    </Menu>

                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    </Header>

                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route} />
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Router >)
    }
}