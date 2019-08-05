import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import store, { history } from './store';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import App from '@/components/App';


import 'bootstrap';
import 'reset-css/reset.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.scss';

WebFont.load({
	google: {
		families: [
			'Poppins:200,300,400,500,600,700,800,900',
		]
	}
});

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<App />
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
