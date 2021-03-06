import { makeAutoObservable, runInAction } from 'mobx';

// tmp
const BASEURL = 'http://faceprog.ru/reactcourseapi/cart/';

export default class Cart{
	items = [];
	#token = null;
	inProcess = [];
	
	get itemsDetailed(){
		return this.items.map(item => {
			let details = this.rootStore.products.item(item.id);
			return { ...details, ...item };
		})
	}

	get total(){
		return this.itemsDetailed.reduce((sum, pr) => sum + pr.price * pr.cnt, 0);
	}

	inProc (id) {
			return this.inProcess.some(el => el == id);
	}

	inCart(id){
		return this.items.some(item => item.id == id);
	}

	change = async (id, cnt) => {
		if (this.inCart(id)) {
			let response = await fetch(`${BASEURL}change.php?token=${this.#token}&id=${id}&cnt=${cnt}`);
			let res = await response.json();


			if (res) {
				let item = this.items.find(item => item.id == id);

				if(item !== undefined){
					let detailts = this.itemsDetailed.find(item => item.id == id);
					runInAction(() => {
						item.cnt = Math.max(1, Math.min(detailts.rest, cnt));
					})
				}
			} 
		}
	}

	add = async (id) => {
		if(!this.inCart(id)){
			this.inProcess.push(id);
			let response = await fetch(`${BASEURL}add.php?token=${this.#token}&id=${id}`);
			let res = await response.json();

			if(res){
				runInAction(() => {
					this.items.push({ id, cnt: 1 });
					this.inProcess.splice(this.inProcess.indexOf(id),1);
				})
			}
		}
	}

	remove = async (id) => {
		if(this.inCart(id)){
			let response = await fetch(`${BASEURL}remove.php?token=${this.#token}&id=${id}`);
			let res = await response.json();

			if(res){
				runInAction(() => {
					this.items = this.items.filter(item => item.id != id);
				})
			}
		}
	}

	load = async () => {
		let curToken = this.rootStore.storage.getItem('CART__TOKEN');
		let response = await fetch(`${BASEURL}load.php?token=${curToken}`);
		let { cart, token, needUpdate } = await response.json();

		if(needUpdate){
			this.rootStore.storage.setItem('CART__TOKEN', token);
		}

		runInAction(() => {
			this.items = cart; 
			this.#token = token;
		});
	}

	new = async () => {
		let response = await fetch(`${BASEURL}load.php`);
		let { cart, token, needUpdate } = await response.json();

		this.rootStore.storage.setItem('CART__TOKEN', token);

		runInAction(() => {
			this.items = cart; 
			this.#token = token;
		});
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