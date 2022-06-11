import React , { useEffect, useState, useRef }  from 'react';

import style from './style.module.css';

import useWindowSize from '../hooks/useWindowSize';
import ModalWindow from '../ModalWindow';

export default function(){
	let [ isButtonOn , setButtonState ] = useState(false)
	let modalWindow = null;
	let { width } = useWindowSize();
	let buttonEl = useRef(null);

	let setModalWindowRef = (el) => {
		modalWindow = el;
	}	

	let onButton = () => {
		setButtonState (true);
	}

	let offButton =() => {
		setButtonState (false)
	}

	let closeModal = (e) => {
       
        let isClassNameModalInPath = e.path.filter(el => el.className === modalWindow.className).length;

        if (!isClassNameModalInPath) {
            offButton();
        } 

	}

	let paddingSize = Math.min(parseInt(width / 200), 5);
	let classNames = `card p-${paddingSize}`;

	return <div className={classNames}>
		<h2>Product card</h2>
		<input type="text" className={style.inp} />
		<br />
		<h3>Some product</h3>
		<hr />
		<button ref={buttonEl} type='button' className={isButtonOn ? 'btn btn-light w-25' : 'btn btn-dark w-25'} onClick= {onButton}>
			Detail...
		</button>
		{isButtonOn && <ModalWindow setModalRef={setModalWindowRef} closeModal={closeModal} /> }
	</div>
}