import React from 'react';
import ReactDOM from 'react-dom';

 import {
    BrowserRouter ,
    Route} from 'react-router-dom';
	
import './index.css';
import App from './App';
import Auth from './components/Auth';
import List from './components/List';
//import * as serviceWorker from './serviceWorker';

const supportsHistory = 'pushState' in window.history
ReactDOM.render(
	
		<BrowserRouter forceRefresh={!supportsHistory}>
			<div>
				<Route path="/" component={App} />
				<Route path="/auth" component={Auth} />
				<Route path="/list/" component={List} />

			</div>
		</BrowserRouter  >
	,
	document.getElementById('root')
)