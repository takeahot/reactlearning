import React from 'react'

import { observer } from 'mobx-react-lite';
import useStore from './hooks/useStore'

export default observer(function({ orderData }){
	let [ cart , order ] = useStore( 'cart' , 'order' );

	return <div>
		<h1>{ order.getData.name }, yout order is done!</h1>
		<hr/>
		<strong>Total: { cart.total }</strong>
	</div>;
});