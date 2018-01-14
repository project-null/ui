
import React from 'react';
import { Menu, Icon } from 'antd';
import {
  Route,
} from 'react-router-dom'
export default class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div>
      <Route path="/page1/bus" render={() => <h3>Two</h3>} />
      <Route path="/page1/bus11" render={() => <h3>One</h3>} />
    </div>
  }
}