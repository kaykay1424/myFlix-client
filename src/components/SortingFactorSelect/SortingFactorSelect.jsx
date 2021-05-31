import React from 'react';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
    setActorsSortingFactor, 
    setMoviesSortingFactor
} from '../../actions/actions';

const SortingFactorSelect = ({
    setActorsSortingFactor, 
    setMoviesSortingFactor, 
    options, 
    type
}) => {
    return (
        <Form.Group controlId="list-type-select">
            <Form.Label>Sort by:</Form.Label>
            <Form.Control 
                as="select"
                onChange={(e) => {
                    type === 'movies' 
                    ? setMoviesSortingFactor(e.target.value) 
                    : setActorsSortingFactor(e.target.value);
                }}
            >
                {options.map(option => {
                    const selected = option.selected ? true : false;
                    if (selected) {
                        return (<option 
                            value={option.value} 
                            selected
                        >
                            {option.text}
                        </option>);
                    } else {
                        return (<option 
                            value={option.value}
                        >
                            {option.text}
                        </option>);
                    }
                    
                })}
            </Form.Control>
        </Form.Group>
    );
};

SortingFactorSelect.propTypes = {
    options: PropTypes.array.isRequired,
    setActorsSortingFactor: PropTypes.func.isRequired,
    setMoviesSortingFactor: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

export default connect(null, {
    setActorsSortingFactor, 
    setMoviesSortingFactor
})(SortingFactorSelect);