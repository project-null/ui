import React from 'react';
import { Menu, Icon } from 'antd';
import {
  BrowserRouter as Router,
} from 'react-Router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Side from './side';
import TopBar from './topbar';
import Container from './container';

import './index.less';

export default class Index extends React.Component {
  render() {
    return (
      <Router>
        <TopBar className="top-bar" />
        <Side />
        <Container />
      </Router>
    )
  }
}