import React, { useState } from 'react'
import  PropTypes  from 'prop-types';

const Count = ( { min, max } ) => {
	let [ current, setCurrent ] = useState(min);

	function inc(){
		if(current < max){
			setCurrent(current + 1);
		}
	}

	function dec(){
		if(current > min){
			setCurrent(current - 1);
		}
	}

	return <div>
		<button type="button" onClick={ dec }>-</button>
		<span>{ current }</span>
		<button type="button" onClick={ inc }>+</button>
	</div>
}

Count.propTypes = {
	min: PropTypes.number, 
	max: PropTypes.number
}

export default Count;
/* 
let [ current, setCurrent ] = useState(1);

let some = useState(0);
let current = some[0];
let setCurrent = some[1]; 
*/