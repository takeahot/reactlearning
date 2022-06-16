import React, { useContext } from 'react'

import ProductsDataContext from './contexts/productsData'

export default function({ onPrev}){
	let products = useContext(ProductsDataContext);	
	let total = products.reduce((sum, pr) => sum + pr.price * pr.cnt, 0);
	let cntItem = products.reduce((sum, pr) => sum + pr.cnt, 0);

	return <div>
		<h1>Result screen</h1>
		<hr/>
		InCart: {cntItem}
		<br />
		Total: {total}
		<hr />
		<button type='button' className='btn btn-warning' onClick={onPrev}>Back</button> 
	</div>;
}