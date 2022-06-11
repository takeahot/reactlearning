import React, { useState } from 'react'
import PropTypes from 'prop-types';

MinMax.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number.isRequired,
	current: PropTypes.number.isRequired,
	onBlur: PropTypes.func.isRequired
}

function MinMax({ min = 1, max, current, onBlur }){
	function applyCurrent(num){
		let validNum = Math.max(min, Math.min(max, num));
		onBlur(validNum);
	}

	function parseCurrentStr(e){
		console.log(e.target.value);
		let num = parseInt(e.target.value);
		applyCurrent(isNaN(num) ? min : num);
	}

	let inc = () => applyCurrent(current + 1);
	let dec = () => applyCurrent(current - 1);

	return <div>
		<button type="button" onClick={ dec }>-</button>
		<input type="text" value={ current } onBlur={()=>{console.log.current}} onChange={parseCurrentStr} />
		<button type="button" onClick={ inc }>+</button>
	</div>
}

export default MinMax;