import { makeAutoObservable, runInAction } from 'mobx';

export default class Cart{
	items = [];
	#token = null;
	idInProccess = [];
	
	get itemsDetailed(){
		return this.items.map(item => {
			let details = this.rootStore.products.item(item.id);
			return { ...details, ...item };
		})
	}

	get total(){
		return this.itemsDetailed.reduce((sum, pr) => sum + pr.price * pr.cnt, 0);
	}

	inCart = (id) => {
		return this.items.some(item => item.id == id);
	}

	inProccess = (id) => {
		return this.idInProccess.some(el => el == id);
	}

	change = async (id, cnt) => {
		let item = this.items.find(item => item.id == id);

		if(item !== undefined){
			let detailts = this.itemsDetailed.find(item => item.id == id);
			cnt = Math.max(1, Math.min(detailts.rest, cnt));
			let res = await this.api.change(this.#token, id, cnt);

			if(res){
				runInAction(() => {
					item.cnt = cnt;
				});
			}
		}
	}

	add = async (id) => {
		if(!this.inCart(id) && !this.inProccess(id)){
			this.idInProccess.push(id);
			let res = await this.api.add(this.#token, id);

			runInAction(() => {
				if(res){
					this.items.push({ id, cnt: 1 });
				}

				this.idInProccess = this.idInProccess.filter(el => el != id);
			});
		}
	}

	remove = async (id) => {
		if(this.inCart(id) && !this.inProccess(id)){
			this.idInProccess.push(id);
			let res = await this.api.remove(this.#token, id);

			runInAction(() => {
				if(res){
					this.items = this.items.filter(item => item.id != id);
				}

				this.idInProccess = this.idInProccess.filter(el => el != id);
			});
		}
	}

	load = async () => {
		let curToken = this.rootStore.storage.getItem('CART__TOKEN');
		let { cart, token, needUpdate } = await this.api.load(curToken);

		if(needUpdate){
			this.rootStore.storage.setItem('CART__TOKEN', token);
		}

		runInAction(() => {
			this.items = cart; 
			this.#token = token;
		});
	}

	constructor(rootStore){
		makeAutoObservable(this);
		this.rootStore = rootStore;
		this.api = this.rootStore.api.cart;
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