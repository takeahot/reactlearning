import React, { useState } from 'react'

import Cart from './Cart';
import Order from './Order';
import Result from './Result';

import SettingContext from './contexts/settings'
import UserDataContext from './contexts/userData'
import ProductsDataContext from './contexts/productsData'

export default function(){
	/* settings */
	let [ settings, setSettings ] = useState({ lang: 'ru', theme: 'light' });

	/* router parody */
	let [ page, setPage ] = useState('order');
	let moveToCart = () => setPage('cart');
	let moveToOrder= () => setPage('order');
	let moveToResult = () => setPage('result');

	/* products */
	let [ products, setProducts ] = useState(productsStub());

	let setProductCnt = (id, cnt) => {
		setProducts(products.map(pr => pr.id != id ? pr : ({ ...pr, cnt })));
	}

	let removeProduct = (id) => {
		setProducts(products.filter(el => el.id !== id));
	}

	return <SettingContext.Provider value={settings}>
		<UserDataContext.Provider value={userData()}>
		<ProductsDataContext.Provider value={products}>
			<div className='container mt-1'>
				{ page === 'cart' && 
					<Cart 
						onNext={moveToOrder} 
						products={products}
						onChange={setProductCnt}
						onRemove={removeProduct}
					/> 
				}
				{ page === 'order' && <Order onNext={moveToResult} onPrev={moveToCart}  /> }
				{ page === 'result' && <Result onPrev={moveToOrder} /> }
				<hr/>
				<footer>
					{settings.lang + ' |'}
					<button type="button" onClick={() => setSettings({ ...settings, lang: 'ru' })}>ru</button>
					<button type="button" onClick={() => setSettings({ ...settings, lang: 'en' })}>en</button>
				</footer>
			</div>
		</ProductsDataContext.Provider>
		</UserDataContext.Provider>
	</SettingContext.Provider>;
}

function userData () {
	return [
		{
			typeOfData: 'name', 
			labelText: 'First Name',
			pattern: /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/,
			errorText: 'Type correct name',
			required: true
		},
		{
			typeOfData: 'email',
			labelText: 'Email',
			pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
			errorText: 'Type e-mail example boxname@hosting.dmn',
			required: true
		},
		{
			typeOfData: 'phone', 
			labelText: 'Phone',
			pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
			errorText: 'Type number correctly',
			required: true
		}
	]
}

function productsStub(){
	return [
		{
			id: 100,
			title: 'Ipnone 200',
			price: 12000,
			rest: 10,
			cnt: 1
		},
		{
			id: 101,
			title: 'Samsung AAZ8',
			price: 22000,
			rest: 5,
			cnt: 1
		},
		{
			id: 103,
			title: 'Nokia 3310',
			price: 5000,
			rest: 2,
			cnt: 1
		},
		{
			id: 105,
			title: 'Huawei ZZ',
			price: 15000,
			rest: 8,
			cnt: 1
		}
	];
}