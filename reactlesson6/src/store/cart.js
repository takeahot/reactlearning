import { makeAutoObservable } from 'mobx';

export default class Cart{
	items = [  
		{ id: 100, cnt: 3 },
		{ id: 101, cnt: 1 }
	];
	
	get total(){
		return this.items.reduce(
			(sum,it) => 
				sum + 
				this.rootStore.products.products.find(pr => pr.id === it.id).price
				* it.cnt,0
		);
	}

	get titleById() {
		return id => this.rootStore.products.products.find(pr => pr.id === id).title
	}
	
	get priceById() {
		return id => this.rootStore.products.products.find(pr => pr.id === id).price
	}

	get restById() {
		return id => this.rootStore.products.products.find(pr => pr.id === id).rest
	}
	
	get inCart() {
		return id => { 
			return { ...this.items.find(item => item.id == id) }.cnt
		}
	}

	change = (id, cnt) => {
 		let item = this.items.find(it => it.id == id);

		if(item !== undefined){
			item.cnt = Math.max(1, Math.min(this.restById(id), cnt));
		} 
	}

	remove = (id) => {
		this.items = this.items.filter(pr => pr.id !== id);
	}

	add = (id) => {
		console.log(id)
		let item = this.items.find( it => it.id === id ) || this.items[this.items.push({ id: id, cnt: 0}) - 1]
		item.cnt = Math.min(item.cnt + 1, this.rootStore.products.products.find(pr => pr.id === id).rest)
	}

	constructor(rootStore){
		makeAutoObservable(this);
		this.rootStore = rootStore;
	}
}

/*
	get inCart(){
		return id => this.items.some(item => item.id == id);
	}
*/

/* products
	id_product
	title
	...

carts
	id_cart
	id_user (null)
	token (null)

products_carts
	id_cart     
	id_product
	cnt

	1 2 3
	1 10 1
	2 2 1 */