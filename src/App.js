import React, { Component } from 'react';
import './App.css';
import Cookies from 'js-cookie';

class App extends Component {

	componentDidMount() {
		let token = Cookies.get( 'token' );
		
		if (token == null) {
			document.location.href = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=4b6a3fd8223445e3853290a2d812cfc8';
		} 
	}
	
	render() {
		return (
		  <div className="App">
			<a href = {"/list/"} >мои файлы</a>	
		  </div>
		);
	}
}

export default App;
