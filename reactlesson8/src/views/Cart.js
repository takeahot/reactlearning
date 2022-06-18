import React from 'react'
import CartRow from './../components/cart-row';

import useStore from './../hooks/useStore'
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom'

export default observer(Cart);

function Cart(){
	let [ cartStore ] = useStore('cart');
	let { itemsDetailed: products, total, remove, change } = cartStore;
	
	return <div>
		<h1>Cart</h1>
		<hr/>
		<table>
			<tbody>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Price</th>
					<th>Cnt</th>
					<th>Total</th>
					<th>Action</th>
				</tr>
				{ products.map((pr, i) => <CartRow 
						key={pr.id}
						num={i + 1}
						{ ...pr }
						onChange={change}
						onRemove={remove}
					/>
				)}
			</tbody>
		</table>
		<hr/>
		<strong>Total: { total }</strong>
		<hr/>
		<Link className="btn btn-primary" to="/order">Move to order</Link>
	</div>;
}