import React from 'react'

import useStore from '../hooks/useStore'
import { observer } from 'mobx-react-lite';
import {  useParams } from 'react-router-dom'

import E404 from './E404';

export default observer(Product);

function Product () {
	let [ products , cart ] = useStore( 'products', 'cart' );
	let { getProductById } = products; 
	let { inCart, add, remove } = cart;
	let params = useParams();
	// params.id -> store.products get by id
	let product = (getProductById(+params.id));

	return <>
		{!product.id ? <E404 /> : (
			<div>
				<h1>{ product.title }</h1>
				<hr/>
				<img width='200px' height='200px'/>
				<hr />
				{ `Цена: ${ product.price }` }
				<br />
				{ `Осталось: ${ product.rest }` }
				<br />
				{ inCart(product.id) && `В корзине: ${ inCart(product.id) }`}
				<hr />
				{ !inCart(product.id) ?
					<button type='button' className="btn btn-light" onClick={() => add(product.id) }>Add to cart</button> :
					<>
						<button type='button' className="btn btn-light" onClick={() => add(product.id) }>Add one more</button> 
						|
						<button type='button' className="btn btn-light" onClick={() => remove(product.id) }>Remove</button>
					</>
					
				}
			</div>
		)}
	</>
}