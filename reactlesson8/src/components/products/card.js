import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

Card.propTypes = {
	product: PropTypes.object.isRequired,
	inCart: PropTypes.bool.isRequired,
	pending: PropTypes.bool.isRequired,
	onRemove: PropTypes.func.isRequired,
	onAdd: PropTypes.func.isRequired
};

function Card({ product, onRemove, inCart, onAdd, pending }){
	let add = () => onAdd(product.id);
	let remove = () => onRemove(product.id);

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
						disabled={pending}
					>Remove item
					</button> :
					<button 
						onClick={add} 
						type="button" 
						className="btn btn-success" 
						disabled={pending}>
							Add to cart
					</button> 
				}
			</div>
		</div>
	);
}

export default Card;