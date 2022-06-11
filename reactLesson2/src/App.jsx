import React, { useState } from 'react'
import MinMax from './MinMax';
import RowTotal from './RowTotal';
import Total from './Total';
import DelButton from './DelButton';

export default function(){
	let [ products, setProducts ] = useState(productsStub());

	let setCnt = (id, cnt) => {
		setProducts(products.map(pr => pr.id != id ? pr : ({ ...pr, cnt })));
	}

	let total = () => {
		return products.map(pr => pr.price * pr.cnt).reduce((acc,cur) => acc + cur,0)
	}

	let delProduct = (id) => {
		setProducts(products.filter( pr => pr.id != id ))
	}

	return <div className="some">
		<h1>Products list</h1>
		<table>
			<tbody>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Price</th>
					<th>Cnt</th>
					<th>Total</th>
					<th>Delete</th>
				</tr>
				{ products.map((pr, i) => (
					<tr key={pr.id}>
						<td>{ i + 1 }</td>
						<td>{ pr.title }</td>
						<td>{ pr.price }</td>
						<td>
							<MinMax max={pr.rest} current={pr.cnt} onBlur={cnt => setCnt(pr.id, cnt)} />
						</td>
						<td>
							<RowTotal price={pr.price} current={pr.cnt}/>
						</td>	
						<td>
							<DelButton onClick={() => delProduct(pr.id)}/>	
						</td>
					</tr>
				)) }
				<tr>
					<td colSpan="5">
						<Total total = {total()}/>
					</td>
				</tr>
			</tbody>
		</table>
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