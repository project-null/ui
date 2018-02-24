import { Layout, Menu, Dropdown, Icon } from 'antd';
import React, { Component } from 'react';

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;
import history from '../history';

import {
    Router,
    Route,
    Link
} from 'react-router-dom'

import './index.less';

import Login from '../system/login';
import Favorites from '../favorites';
import FavoritesManager from '../favorites/manager';
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
            path: '/pages/dashboard',
            component: P1
        }, {
            path: '/pages/favorites',
            component: Favorites
        }, {
            path: '/pages/accounts',
            component: accounts
        }, {
            path: '/pages/settings/users',
            component: Users
        }, {
            path: '/pages/favorites/manager',
            component: FavoritesManager
        }]

        const RouteWithSubRoutes = (route) => (
            <Route exact path={route.path} render={props => (
                <route.component {...props} routes={route.routes} />
            )} />
        )

        const menu = (
            <Menu>
                <Menu.Item>
                    <a>个人设置</a>
                </Menu.Item>
                <Menu.Item>
                    <a>登出</a>
                </Menu.Item>
            </Menu>
        );


        return (
            <Router history={history}>
                <div>
                    <Layout className="layout">
                        <Sider>
                            <div className="logo" />
                            <Menu theme="dark" style={{ width: 180 }} mode="inline" defaultSelectedKeys={['4']}>
                                <SubMenu title={<span><Icon type="area-chart" />概览页</span>}>
                                    <Menu.Item ><Link to="/pages/dashboard">概览1</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu title={<span><Icon type="appstore-o" />收藏夹</span>}>
                                    <Menu.Item ><Link to="/pages/favorites">我的收藏</Link></Menu.Item>
                                    <Menu.Item ><Link to="/pages/favorites/manager">管理</Link></Menu.Item>
                                </SubMenu>

                                <SubMenu title={<span><Icon type="book" />密码本</span>}>
                                    <Menu.Item ><Link to="/pages/accounts">概览</Link></Menu.Item>
                                </SubMenu>

                                <SubMenu title={<span><Icon type="setting" />系统管理</span>}>
                                    <Menu.Item ><Link to="/pages/settings/users">用户管理</Link></Menu.Item>
                                    <Menu.Item ><Link to="/pages/favorites/manager">管理</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <ul className="header-ul">
                                    <li>
                                        <Dropdown overlay={menu}>
                                            <a className="ant-dropdown-link" href="#">
                                                <Icon type="user" />张三<Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </li>
                                </ul>
                            </Header>
                            <Content style={{ margin: '24px 16px 0' }}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360}}>
                                    {routes.map((route, i) => (
                                        <RouteWithSubRoutes key={i} {...route} />
                                    ))}
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </Router >)
    }
}
