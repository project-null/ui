import React from 'react';
import { render } from 'react-dom';

import Layout from './pages/layout';
import P1 from './router';
import Router from './router/index.jsx';

import './styles/index.less';
if (module.hot) {
  module.hot.accept();
}

render(
  <div>
    {/* <Layout /> */}
    <P1/>
  </div>,
  document.getElementById('root')
);

