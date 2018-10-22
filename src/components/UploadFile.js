import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';
import {apishka} from './Api';

class UploadFile extends Component {
	
	constructor(props){
		super(props);
		this.uploadFile = this.uploadFile.bind(this);

		this.state = {
			file:null
		}
	}
		
	uploadFile(){
		/*
			метод загрузки файла
			на вход требуется:
				path (this.state.path) - путь папки в которой необходимо загрузить
			
		*/

		let filedata = new FormData(this.state.file);
		
		apishka('GET',null,{ path: (('/' + this.props.path) || '/') + this.state.file.name },
			'https://cloud-api.yandex.net/v1/disk/resources/upload',
			(data) => {
				apishka('PUT', filedata, null, data.href, (data) => {
						this.getList();
					},(err)=>{
						alert( err );
					}, false
				)
			},
			(err) => {
				alert( err );
			}
		)
	}		
	
	render() {
		
		return (
			<div className = "col-sm card">
				<label>Загрузить файл:  </label> 
				<input type = 'file' 
			  	   onChange={(e) => this.setState({ file: e.target.files[0] }) } />
				<button 
					className = "btn btn-outline-success" 
					onClick = {this.uploadFile} >Загрузить</button>
			</div>	
		);
	}
}

export default UploadFile;
