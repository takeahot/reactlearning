import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import useStore from '../../hooks/useStore'
import { observer } from 'mobx-react-lite';

Card.propTypes = {
	id: PropTypes.number.isRequired
};

function Card({ id }){
	console.log('rerender');
	let [ productsStore, cartStore ] = useStore('products', 'cart');
	let product = productsStore.item(id); // check 404

	let inCart = cartStore.inCart(id);
	let inProccess = cartStore.inProccess(id);
	let add = () => cartStore.add(id);
	let remove = () => cartStore.remove(id);

	return (
		<div className="card">
			<div className="card-body">
				<h3>{ product.title }</h3>
				<div>{ product.price }</div>
				<Link to={`/product/${product.id}`}>Read more</Link>
				<hr/>
				{ inCart ? 
					<button 
						onClick={remove} 
						type="button" 
						className="btn btn-danger" 
						disabled={inProccess}
					>Remove item
					</button> :
					<button 
						onClick={add} 
						type="button" 
						className="btn btn-success" 
						disabled={inProccess}>
							Add to cart
					</button> 
				}
			</div>
		</div>
	);
}

export default observer(Card);