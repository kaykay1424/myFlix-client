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
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default ErrorMessage;