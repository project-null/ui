import React from 'react';
import { render } from 'react-dom';

import Login from './pages/system/login';
import Layout from './pages/layout';

import history from './pages/history';


import './styles/reset.css';
import './styles/index.less';

if (module.hot) {
	module.hot.accept();
}

import {
	Router,
	Route
} from 'react-router-dom'

render(
	<Router history={history}>
		<div>
			<Route exact path="/" component={Login} />
			<Route path="/pages" component={Layout} />
		</div>
	</Router>
	,
	document.getElementById('root')
);

