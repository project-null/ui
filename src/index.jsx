import React from 'react';
import { render } from 'react-dom';

import P1 from './pages/p1.jsx';
import Router from './router/index.jsx';

import './styles/index.less';
if (module.hot) {
  module.hot.accept();
}

render(
  <div>
    <P1 />
    <Router />
  </div>,
  document.getElementById('root')
);

