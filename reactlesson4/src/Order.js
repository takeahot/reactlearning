import React from 'react'

export default function({ onPrev }){
	
	return <div>
		<h1>Input data</h1>
		<hr/>
		<button type="button" className="btn btn-warning" onClick={onPrev}>Back to cart</button>
	</div>;
}