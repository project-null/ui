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
        const routes = [
            {
                path: '/p1',
                title: '概览页',
                subRoutes: [
                    {
                        path: '/p1',
                        title: '概览1',
                        component: P1,
                    },
                    {
                        path: '/p2',
                        title: '概览1',
                        component: P2,
                    }
                ]
            }, {
                path: '/favorites',
                title: '网页收藏夹',
                component: Favorites
            }, {
                path: '/p2',
                title: '密码保险箱',
                component: P2
            }, {
                path: '/p3',
                title: '系统设置',
                component: P3
            }
        ]

        const RouteWithSubRoutes = (route) => (
            <Route path={route.path} render={props => (
                <route.component {...props} routes={route.routes} />                                
            )}/>
        )

        return (<Router>
            <Layout className="layout">
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0">
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        {routes.map((v, i) => {
                            if (v.subRoutes) {
                                return <SubMenu key={i} title={<span><Icon type="mail" /><span>{v.title}</span></span>}>
                                    {
                                        v.subRoutes.map((sv, si) => {
                                            return <Menu.Item key={`${i}_${si}`}><Link to={`${v.path}${sv.path}`}>{v.title}</Link></Menu.Item>
                                        })
                                    }
                                </SubMenu>
                            } else {
                                return <Menu.Item key={i}>
                                    <Icon type="user" />
                                    <Link to={v.path}>{v.title}</Link>
                                </Menu.Item>
                            }
                        })}
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