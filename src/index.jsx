import React from 'react';
import { render } from 'react-dom';

import Layout from './pages/layout';

import './styles/index.less';
if (module.hot) {
  module.hot.accept();
}

render(
  <div>
    <Layout />
  </div>,
  document.getElementById('root')
);

