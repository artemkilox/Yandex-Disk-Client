import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';

class Folder extends Component {	

	constructor(props){
		super(props);
		this.delFolder = this.props.delFolder.bind(this);
	}
	
	render() {
		return (
			<div className="row list-group-flush">
				<div className = "col-sm-11 list-group-item">
					<a href =  {'/list/' + this.props.path +  this.props.item.name + '/'}>
						<img 
							alt = "folder" 
							src="/pic/folder.png" 
							width = "30" 
							height = "30" />
						<label style = {{margin:5, cursor:"pointer"}}>{this.props.item.name}</label>
					</a>
				</div>
				<div className = "col-sm">
					<img 
						alt = "delete" 
						style = {{cursor:"pointer", marginLeft:5}} 
						width = "20" height = "20" 
						src="/pic/recbin.png" 
						onClick = {()=>this.delFolder(this.props.item.path)}  /> 
				</div>
			</div>
		);
	}
}

export default Folder;
