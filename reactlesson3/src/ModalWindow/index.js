import React, { useEffect , useRef } from "react";

import style from './style.module.css';

export default function (prop) {
    let isHidden = prop.hidden;
	let classNames = style['modal-window'] + ' ' + (isHidden ? style['modal-window--hidden'] : '');

	useEffect (() => {
		window.addEventListener('click',prop.closeModal);
		return () => window.removeEventListener('click',prop.closeModal);
	})
    
    return  <div ref={prop.setModalRef} className={classNames} >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        lorem ispum
                        ispum lerem
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
}