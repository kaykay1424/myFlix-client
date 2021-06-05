/************ Modules *************/

import React from 'react';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {setMoviesListType} from '../../actions/actions';

const ListTypeSelect = ({setMoviesListType}) => {
    return (
        <Form.Group controlId="list-type-select">
            <Form.Label>Select type of movies</Form.Label>
            <Form.Control 
                as="select"
                onChange={(e) => setMoviesListType(e.target.value)}
            >
                <option value="all">All movies</option>
                <option value="featured">Featured movies</option>
                <option value="favorited">Favorited movies</option>
            </Form.Control>
        </Form.Group>
    );
};

ListTypeSelect.propTypes = {
    setMoviesListType: PropTypes.func.isRequired
};

export default connect(null, {setMoviesListType})(ListTypeSelect);