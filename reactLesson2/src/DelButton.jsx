import React from "react";
import PropTypes from "prop-types";

DelButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function DelButton({ onClick }) {

    return <>
        <button type= "button" onClick={onClick}>Delete </button>
    </>
}

export default DelButton;