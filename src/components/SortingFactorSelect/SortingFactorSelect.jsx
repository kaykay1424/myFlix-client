/************ Modules *************/

import React, {useState} from 'react';
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
    // Find option that should be the default selected option
    // to later set the value attribute of select element
    const defaultSelectedOption = options.find(option => {
        return option.selected;
        
    }).value;

    const [selectedOption, setSelectedOption] = useState(defaultSelectedOption);
    
    return (
        <Form.Group controlId="list-type-select">
            <Form.Label>Sort by:</Form.Label>
            <Form.Control 
                as="select"
                onChange={(e) => {
                    setSelectedOption(e.target.value);
                    type === 'movies' 
                        ? setMoviesSortingFactor(e.target.value) 
                        : setActorsSortingFactor(e.target.value);
                }}
                value={selectedOption}
            >
                {/* Add options for select element */}
                {options.map((option, i) => {
                    return (<option 
                        key={i}
                        value={option.value}
                    >
                        {option.text}
                    </option>);                    
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