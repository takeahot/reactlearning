import React from 'react'

import useStore from '../hooks/useStore'
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom'

export default observer(Home);

function Home(){
	let [ productsStore, cartStore ] = useStore('products', 'cart');
	let { products } = productsStore;

	return <div>
		<h1>Catalog</h1>
		<hr/>
		<div className="row">
		{ products.map((pr) => (
			<div className="col col-4 mb-3 mt-3" key={pr.id}>
				<div className="card">
					<div className="card-body">
						<h3>{ pr.title }</h3>
						<div>{ pr.price }</div>
						<Link to={`/product/${pr.id}`}>Read more</Link>
						<hr/>
						<hr />
						{ cartStore.inCart(pr.id) ? 
							<button 
								onClick={() => cartStore.remove(pr.id)} 
								type="button" 
								className="btn btn-danger"
							>
								Remove item
							</button> 
							:
							<button 
								onClick={() => cartStore.add(pr.id)} 
								type="button" 
								className="btn btn-success" 
								disabled={cartStore.inProc(pr.id)}
							>
								Add to cart
							</button> 
						}
					</div>
				</div>
			</div>
		)) }
		</div>
	</div>;
}