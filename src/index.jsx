import React from 'react';
import { render } from 'react-dom';

import P1 from './pages/p1.jsx';
import Router from './router/index.jsx';


if (module.hot) {
  module.hot.accept();
}

render(
  <div>
    <Router />
  </div>,
  document.getElementById('root')
);

