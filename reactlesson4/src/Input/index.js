import React , { useState } from "react";

export default function ({ labelText , pattern , errorText , disabled , onEnableNext }) {
    let [ validState , setValidState ] = useState('');
    let [ value, setValue ] = useState('');

    let changeValue = (e) => {
        setValue(e.target.value);
        checkValidate(e.target.value);
    }

    let checkValidate = (v) => {
        if ( pattern.test(v) ) {
            setValidState('is-valid');
            onEnableNext();
        } else {
            setValidState('is-invalid')
        }
    }

    return <label className='w-100' > 
            { labelText }
			<br />
			<input type="text" value={ value } onChange={ changeValue } className={ 'form-control ' + validState } disabled={ disabled } />
            <span>
                { validState === 'is-invalid' && errorText }
            </span>
            <br />
		</label>
}