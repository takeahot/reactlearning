import { makeAutoObservable, runInAction } from 'mobx';

export default class Products{
	products = [];
	some = 1;
	
	item(id){
		return this.products.find(pr => pr.id == id);
	}

	async load(){
		let products = await this.api.all();

		runInAction(() => {
			this.products = products;
			this.some = 2;
		});
	}	

	constructor(rootStore){
		makeAutoObservable(this);
		this.rootStore = rootStore;
		this.api = this.rootStore.api.products;
	}
}


/*
	proxy 
		action(){
			block render
			
			obj.a = 1
			obj.b = 2
			
			unblock render
		}
*/