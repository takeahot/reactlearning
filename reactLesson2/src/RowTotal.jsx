import React from 'react'
import PropTypes from 'prop-types';

RowTotal.propTypes = {
	price: PropTypes.number.isRequired,
	current: PropTypes.number.isRequired,
}

function RowTotal({ price, current }){
	return <>
		{current * price}
		{/* <button type="button" onClick={ dec }>-</button>
		<input type="text" value={ current } onChange={parseCurrentStr} />
		<button type="button" onClick={ inc }>+</button> */}
	</>
}

export default RowTotal;