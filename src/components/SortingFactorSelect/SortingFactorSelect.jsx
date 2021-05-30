import React from 'react';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';

import {setActorsSortingFactor, setMoviesSortingFactor} from '../../actions/actions';

const SortingFactorSelect = ({setActorsSortingFactor, setMoviesSortingFactor, options, type}) => {
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
                        return <option value={option.value} selected>{option.text}</option>;
                    } else {
                        return <option value={option.value}>{option.text}</option>
                    }
                    
                })}
            </Form.Control>
        </Form.Group>
    );
};

export default connect(null, {setActorsSortingFactor, setMoviesSortingFactor})(SortingFactorSelect);