import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import useStore from './hooks/useStore'

import { observer } from 'mobx-react-lite';

export default observer(Order);

function Order ({ fields, onChange, onPrev, onNext }){
	let [ order ] = useStore( 'order' );
	let { data , update } = order;
	let isValid = data.every(f => f.valid);

	let [ showModal, setShowModal ] = useState(false);
	let [ confirmed, setConfirmed ] = useState(false);
	let openModal = () => setShowModal(true);
	let closeModal = () => setShowModal(false);
	let sendForm = () => {
		setConfirmed(true);
		closeModal();
	}

	let onExited = () => {
		if(confirmed){
			onNext();
		}
	};

	return <div>
		<h1>Input data</h1>
		<hr/>
		<form>
		{ data.map(field => (
			<div className="form-group" key={field.name}>
				<label>{field.label}</label>
				<input
					type="text" 
					className={`form-control ${field.value.length && !field.valid ? 'border border-danger' : ''}`}
					name={field.name}
					value={field.value}
					onChange={e => update(field.name, e.target.value.trim())}
				/>
			</div>
		)) }
		</form>
		<hr/>
		<button type="button" className="btn btn-warning" onClick={onPrev}>Back to cart</button>
		<button type="button" className="btn btn-success" onClick={openModal} disabled={!isValid}>
			Send
		</button>
		<Modal show={showModal} onHide={closeModal} onExited={onExited}>
			<Modal.Header closeButton>
				<Modal.Title>Check data</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<p>...</p>
				<p>...</p>
				<p>...</p>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>Close</Button>
				<Button variant="primary" onClick={sendForm}>Ok, send</Button>
			</Modal.Footer>
		</Modal>
	</div>;
}