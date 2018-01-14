import React from 'react';
import { Menu, Icon } from 'antd';

import { Link } from 'react-Router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Sider extends React.Component {
  constructor() {
    super();
    const menuInfo = [
      {
        icon: 'appstore-o',
        label: '导航',
        url: '',
        subMenu: [
          { label: '查看', url: 'overview' },
          { label: '管理', url: 'setting' }
        ]
      }, {
        icon: 'mail',
        label: '密码',
        url: 'password',
        subMenu: [
          { label: '查看', url: 'overview' },
          { label: '管理', url: 'setting' }
        ]
      }, {
        icon: 'setting',
        label: '设置',
        url: 'setting',
        subMenu: [
          { label: '用户管理', url: 'users' },
          { label: '系统设置', url: 'system' }
        ]
      }
    ];
    this.state = {
      theme: 'dark',
      menuInfo
    }
  }
  handleClick(e) {
    console.log('click ', e);
  }

  getSubmenu(index, subMenu) {
    return subMenu.map((v, i) => {
      return <Menu.Item key={index + '.' + i}>{v.label}</Menu.Item>
    });
  }
  
  render() {
    return (
      <div className="side">
        <Menu onClick={this.handleClick}
          style={{ width: 170 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          theme={this.state.theme}
          mode="inline"
        >
          {
            this.state.menuInfo.map((v, i) => {
              return <SubMenu key={i} title={
                <span>
                  <Icon type={v.icon} />
                  <Link to={v.url}>{v.label}</Link>
                </span>
              }>
                {this.getSubmenu(i, v.subMenu)}
              </SubMenu>
            })
          }
        </Menu>
      </div>
    );
  }
}