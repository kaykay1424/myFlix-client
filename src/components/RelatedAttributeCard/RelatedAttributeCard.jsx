/************ Modules *************/

import React from 'react';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './related-attribute-card.scss';

const RelatedAttributeCard = ({description, image}) => {
    return (
        <Card className="related-attribute-card">
            <img src={image} />
            <Card.Body>{description}</Card.Body>
        </Card>
    );
};

RelatedAttributeCard.propTypes = {
    image: PropTypes.string.isRequired,
    description: PropTypes.object.isRequired
};

export default RelatedAttributeCard;