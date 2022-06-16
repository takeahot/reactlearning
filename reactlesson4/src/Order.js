import React, { useContext , useState } from 'react'

import Input from './Input'

import UserDataContext from './contexts/userData'

export default function({ onPrev , onNext }){
	let validationData = useContext(UserDataContext);
	
	let [ disabledInputState , setDisableInputState ] = useState( [false, ...Array(validationData.length - 1).fill(true)] )
	let [ isButtonDisabled , setButtonDisabled ] = useState(true);

	let onEnableNextElem = (i) => i + 1 < disabledInputState.length ? onEnableNextInput(i) : setButtonDisabled(false);
	let onEnableNextInput = (i) => setDisableInputState(disabledInputState.map((v,ind) => ind === i + 1 ? false : v));
	
	return <div>
		<h1>Form</h1>
		<hr/>
		<form>
			{validationData.map((inputData, i) => <Input 
				labelText={ inputData.labelText } 
				pattern={ inputData.pattern } 
				errorText={ inputData.errorText }
				disabled={disabledInputState[i]}
				onEnableNext={() => onEnableNextElem(i)}
				key={inputData.typeOfData}
				/>
			)}
			<button type="button" className="btn btn-warning" onClick={onPrev}>Back</button>
			|
			<button className="btn btn-warning" onClick={onNext} disabled={isButtonDisabled}>Send to delivery</button>
		</form>
	</div>;
}