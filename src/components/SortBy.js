import React, { Component } from 'react';
import '../bootstrap/css/bootstrap.css';

class SortBy extends Component {	
	
	render() {
		return (
			<div className = "col-sm card">
				<label >отсортировать: </label> 
				<select 
					className="form-control-sm"
					onChange = {this.props.sortBy}
					value = {this.props.sortby}
				>
					<option value = "created">дата создание</option>
					<option value = "name">название</option>
					<option value = "path">путь</option>
					<option value = "modified">дата последнего редактирования</option>
					<option value = "size">размер</option>
				</select>
			</div>
		);
	}
}

export default SortBy;
