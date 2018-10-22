import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';

class File extends Component {	

	constructor(props){
		super(props);
		this.dateToString = this.dateToString.bind(this);
	}
	
	dateToString(dt) {
		/*
			метод выводит дату в формате ДД.М.ГГГГ ЧЧ:МИ
		*/
		let newdate = new Date(dt);
		
		return  newdate.getDate() + '.' + (newdate.getMonth() + 1) + '.' + 
				newdate.getFullYear().toString() + ' ' + newdate.getHours() + ':' + newdate.getMinutes();		
	}
	
	render() {
		let size = Number(this.props.item.size/1024).toFixed(2);
		let created = this.dateToString(this.props.item.created);
		let modified = this.dateToString(this.props.item.modified);
		
		return (
			<div className="row list-group-flush">
				<div className = "col-sm-11">
					<img 
						alt = "document" 
						src="/pic/doc.png" 
						width = "30" 
						height = "30" />
					<label style = {{margin:5}}>{this.props.item.name}</label>
					<br />
					<label style = {{margin:5, color:"grey", fontSize:10}}>{size} Kb</label>
					<label style = {{margin:5, color:"grey", fontSize:10}}>created: {created}</label>
					<label style = {{margin:5, color:"grey", fontSize:10}}>modified: {modified}</label>
				</div>	
				<div className = "col-sm">
					<a 
						style = {{margin:5}} 
						href = {this.props.item.file}>
						<img 
							alt = "download" 
							width = "30" 
							height = "30" 
							src="/pic/download.png" />
					</a>
				</div>
			</div>
		);
	}
}

export default File;
