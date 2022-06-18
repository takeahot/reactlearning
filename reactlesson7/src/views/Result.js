import React from 'react'

import { observer } from 'mobx-react-lite';
import useStore from './../hooks/useStore'

export default observer(function(){
	let [ order ] = useStore('order');

	return <div>
		<h1>{ order.lastSentOrder.order.name }, yout order is done!</h1>
		<hr/>
		<strong>Total: { order.lastSentOrder.cart.total }</strong>
	</div>;
});