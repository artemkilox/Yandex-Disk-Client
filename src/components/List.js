import React, { Component } from 'react';
import PreLoader, {apishka} from './Api';
import '../bootstrap/css/bootstrap.css';
import DiskHeader from './DiskHeader'; 
import UploadFile from './UploadFile'; 
import NewFolder from './NewFolder'; 
import SortBy from './SortBy'; 
import Folder from './Folder'; 
import File from './File'; 

class List extends Component {
	
	constructor(props){
		super(props);
		this.getList = this.getList.bind(this);
		this.sortBy = this.sortBy.bind(this);
		this.goBack = this.goBack.bind(this);
		this.state = {
			data:[],	
			limit:10,
			used_space:0,
			name:"",
			path:decodeURI(document.location.pathname.replace('/list/','')), 
			sortby:"created",
			total_space:0,
			foldertitle:"",
			file:null,
			total:0,
			loading:true	
		}
	}	
	
	getList(){
		/*
			метод получения списка файлов и папок из Яндекс диска
			на вход требуется: 
				path - путь (this.state.path)
				sortby - признак сортировки (this.state.sortby)
				limit - кол-во записей (default 10) (this.state.limit)
			полученные данные записываются в this.state.data	
		*/
		this.setState({ loading:true },()=>{
			apishka( 'GET', null, { path:this.state.path || '/', sort:this.state.sortby, limit:this.state.limit }, 'https://cloud-api.yandex.net/v1/disk/resources', 
				(data) => {
					this.setState({data:data._embedded.items, total:data._embedded.total, name:data.name, loading:false})
				}, (err) => {
					console.log('err:', err);
				}
			);
		})
	
	}
	
	showMore(){
		/*
			метод "показать больще" - прибавляет к this.state.limit 10 и запрашивает список по новой
			обновляет this.state.limit
		*/
		this.setState({ limit:this.state.limit + 10 }, () => {
			this.getList();
		})
	}
		
	delFolder(path){
		/*
			метод удаление папки - заправшивает разрешение и при удачном исходе удаляет папку с диска
			на вход требуется:
				path (this.state.path) - путь папки которую надо удалить
			после выполнения запрашивает список
		*/
		
		if (window.confirm('Подтвердите удаление!')){ 
		
			path = path.replace('disk:','');
			
			apishka('DELETE',null,{ path:path },'https://cloud-api.yandex.net/v1/disk/resources',
				(data) => {
					this.props.getList();
				},(err) => {
					alert( err );
				}
			)
			
		}
	}
	
	componentDidMount() {
		this.getList();
		apishka('GET',null,{},'https://cloud-api.yandex.net/v1/disk/', 
			(data) => {
				this.setState({
					total_space:data.total_space, 
					used_space:data.used_space
				});
			}, (err) => {
				console.log('err:', err);
			}
		)	
	}
	
	sortBy(e) {
		/*
			Смена признака сортировки
		*/
		this.setState( { sortby: e.target.value }, () => {
			this.getList();
		})		
	}
	
	goBack() {
		/*
			Метод возвращает на католог уровнем выше
		*/
		let path = this.state.path;
		path = '/list/' + path.replace( this.state.name ,'');
		document.location.href = path.replace('//','/');
	}

	render() {
		return (
			<div className = "container-fluid">
				<PreLoader on = {this.state.loading} />
				<div>
					<div>
						<DiskHeader 
							total_space = {this.state.total_space}
							used_space = {this.state.used_space} />
						<div className = "row">
							<SortBy
								path = {this.state.path}
								sortBy = {this.sortBy} />
							<NewFolder
								path = {this.state.path}
								getList = {this.getList} />
							<UploadFile 
								uploadFile = {this.uploadFile}
								getList = {this.getList}
								path = {this.state.path} />
						</div>
					</div>
					{(this.state.path !== '')?
						<img 
							alt = "back" 
							onClick = {this.goBack}
							style = {{cursor:"pointer", marginLeft:5}} 
							width = "80" height = "80" 
							src = "/pic/back.png"	/>
						:
						null	
					}
					<p>Всего {this.state.total}</p>
					{this.state.data.map((item)=>{
						return (<div style = {{margin:15}} 
							key = {item.resource_id}>	
							{(item.type === "dir")?
								<Folder 
									path = {this.state.path}
									item = {item}
									delFolder = {this.delFolder}
									getList = {this.getList}	/>
								:
								<File item = {item} />
							} 
						</div>)
					})}
				{(this.state.total>this.state.data.length)?
					<button 
						onClick = {this.showMore.bind(this)}
						className = "btn btn-outline-primary" >Показать ещё</button>	
					:
					null
				}	
		  
			</div> 
	</div>)
	
	}
}

export default List;
