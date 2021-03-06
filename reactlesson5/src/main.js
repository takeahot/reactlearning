/* import './tests/store-cart'*/

import React from 'react'
import ReactDom from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import StoreContext from './contexts/store'
import rootStore from './store/rootStore';
// import cartStore from './store/cart'
// import orderStore from './store/order'

const store = {
	cart: rootStore.cart,
	order: rootStore.order 
};

ReactDom.render(
	<StoreContext.Provider value={store}>
		<App/>
	</StoreContext.Provider>
	,
	document.querySelector('.app')
) 

/* 
import React from 'react'
import ReactDom from 'react-dom';
import Result from './Result'
import StoreContext from './contexts/store'

let orderData = { name: 'Test' };
let store = { 
	cart: { total: 100000 }
};

ReactDom.render(
	<StoreContext.Provider value={store}>
		<Result orderData={orderData} />
	</StoreContext.Provider>,
	document.querySelector('.app')
);  */

/* let obj = { 
	some(){
		console.log(this);
	}
}

obj.some(); // obj

let some = obj.some;
some(); // window */