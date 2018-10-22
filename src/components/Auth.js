import React, { Component } from 'react';


class Auth extends Component {

	componentWillMount() {
		let token = /access_token=([^&]+)/.exec(document.location.hash)[1]
		//console.log('token1:',token)
		document.cookie = 'token=' + token
		document.location.href = '/list/'
	}
  render() {
    return (

      <div />
    );
  }
}

export default Auth;
