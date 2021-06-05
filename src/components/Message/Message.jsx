/************ Modules *************/

import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';

const ErrorMessage = ({message, type}) => {
    return (
        <Row className="justify-content-center">
            <Col md="5"> 
                <div 
                    className={`text-${type}`}
                >
                    {message} 
                </div>                   
            </Col>
        </Row>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
};

export default ErrorMessage;