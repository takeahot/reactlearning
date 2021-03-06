import React, { useEffect, useState, useMemo } from 'react'

import useWindowSize from './hooks/useWindowSize';

import MinMax from './MinMax';
import ProductCard from './ProductCard';

export default function(){
	let { width } = useWindowSize();
	let [ products, setProducts ] = useState(productsStub());
	let total = products.reduce((sum, pr) => sum + pr.price * pr.cnt, 0);

	// let total = useMemo(() => products.reduce((sum, pr) => sum + pr.price * pr.cnt, 0), [products]);

	let setCnt = (id, cnt) => {
		setProducts(products.map(pr => pr.id != id ? pr : ({ ...pr, cnt })));
	}

	let removeProduct = (id) => {
		setProducts(products.filter(el => el.id !== id));
	}

	return <div className="container mt-1">
		<h1>Products list</h1>
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
				{ products.map((pr, i) => (
					<tr key={pr.id}>
						<td>{ i + 1 }</td>
						<td>{ pr.title }</td>
						<td>{ pr.price }</td>
						<td>
							<MinMax min={1} max={pr.rest} current={pr.cnt} onChange={cnt => setCnt(pr.id, cnt)} />
						</td>
						<td>{ pr.price * pr.cnt }</td>
						<td>
							<button type="button" onClick={() => removeProduct(pr.id)}>X</button>
							<button type="button" onClick={() => setCnt(pr.id, pr.rest)}>MAX</button>
						</td>
					</tr>
				)) }
			</tbody>
		</table>
		<hr/>
		<strong>Total: { total }</strong>
		<hr/>
		<ProductCard/>
		<hr/>
		<footer>
			{ width }
		</footer>
	</div>;
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

/* 
let setCnt = (id, cnt) => {
	let newProducts = [ ...products ];
	let productInd = products.findIndex(pr => pr.id == id);
	let newProduct = { ...products[productInd] };
	newProduct.cnt = cnt;
	newProducts[productInd] = newProduct;
	setProducts(newProducts);
} */

/*

function fn(i, ev){

}

let elems = document.querySeelctorAll('some');

elems.forEach((el, i) => {
	el.addEventListener('click', e => fn(i, e))

});


*/