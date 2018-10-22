import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import {apishka} from './Api';

class NewFolder extends Component {
	
	constructor(props){
		super(props);
		this.newFolder = this.newFolder.bind(this);

		this.state = {
			foldertitle:''
		}
	}
	
	newFolder() {
		/*
			метод создания новой папки
			на вход требуется:
				path (this.state.path) - путь папки в которой находимся + название новой папки (this.state.foldertitle)
			после выполнения запрашивает список
		*/
		apishka('PUT',null,{ path:(('/' + this.props.path) || '/') + this.state.foldertitle },
			'https://cloud-api.yandex.net/v1/disk/resources',
			(data) => {
				this.setState({ foldertitle: "" } , () => {
					this.props.getList();
				})
			},
			(err) => {
				alert( err );
			}
		)	
	}
	
	render() {
		return (
			<div className = "col-sm card">
				<label>Создать новую папку:  </label> 
				<label style = {{backgroundColor:"#d4cfcf"}}> {this.props.path || '/'} </label> 
				<input type = 'text' 
				   value = {this.state.foldertitle}	
				   placeholder = 'введите название папки' 
				   onChange={(e)=>this.setState({foldertitle: e.target.value})} />
				<button className = "btn btn-outline-success" 
					onClick = {this.newFolder}>Создать папку</button>
			</div>
		);
	}
}

export default NewFolder;
