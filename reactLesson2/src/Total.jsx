import React from "react";
import PropTypes from "prop-types";

Total.propTypes = {
    total: PropTypes.number.isRequired,
}

function Total({ total }) {

    return <>
        {total}
    </>
}

export default Total;