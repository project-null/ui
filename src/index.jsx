import React from 'react';
import { render } from 'react-dom';

import P1 from './pages/p1.jsx';


if (module.hot) {
  module.hot.accept();
}

render(
  <div>
    <P1/>
  </div>,
  document.getElementById('root')
);

