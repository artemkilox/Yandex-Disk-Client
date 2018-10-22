import React, { Component } from 'react';

class DiskHeader extends Component {
	
	render() {
		let total_space = Number(this.props.total_space/1073741824).toFixed(2);
		let used_space = Number(this.props.used_space/1073741824).toFixed(2);
		return (
			<div>
				<h3>Всего места: 
					<span className="badge badge-secondary">{total_space} ГБ.</span>
				</h3>
				<h3>Использовано: 
					<span className="badge badge-secondary">{used_space} ГБ.</span>
				</h3>
			</div>
		);
	}
}

export default DiskHeader;
