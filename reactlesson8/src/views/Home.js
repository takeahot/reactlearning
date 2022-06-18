import React from 'react'

import useStore from '../hooks/useStore'
import { observer } from 'mobx-react-lite';

//import ProductCard from './../components/products/card'
import ProductCard from './../components/products/cardalt'

export default observer(Home);

function Home(){
	let [ productsStore ] = useStore('products');
	let { products } = productsStore;

	return <div>
		<h1>Catalog</h1>
		<hr/>
		<div className="row">
		{ products.map((pr) => (
			<div className="col col-4 mb-3 mt-3" key={pr.id}>
				{/* <ProductCard 
					product={pr} 
					inCart={inCart(pr.id)} 
					pending={inProccess(pr.id)} 
					onAdd={add}
					onRemove={remove}
				/> */}
				<ProductCard id={pr.id} />
			</div>
		)) }
		</div>
	</div>;
}