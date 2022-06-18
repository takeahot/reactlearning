import React from 'react'
import MinMax from './../MinMax'

import useStore from './../hooks/useStore'
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom'

export default observer(Cart);

function Cart(){
	let [ cart ] = useStore('cart');
	let { items , total, remove, change, titleById, priceById, restById } = cart;
	
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
				{ items.map((item, i) => (
					<tr key={item.id}>
						<td>{ i + 1 }</td>
						<td>{ titleById(item.id) }</td>
						<td>{ priceById(item.id) }</td>
						<td>
							<MinMax min={1} max={restById(item.id)} current={item.cnt} onChange={cnt => change(item.id, cnt)} />
						</td>
						<td>{ priceById(item.id) * item.cnt }</td>
						<td>
							<button type="button" onClick={() => remove(item.id)}>X</button>
							<button type="button" onClick={() => change(item.id, restById(item.id))}>MAX</button>
						</td>
					</tr>
				)) }
			</tbody>
		</table>
		<hr/>
		<strong>Total: { total }</strong>
		<hr/>
		<Link className="btn btn-primary" to="/order">Move to order</Link>
	</div>;
}