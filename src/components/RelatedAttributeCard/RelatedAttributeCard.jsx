import React from 'react';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './related-attribute-card.scss';
const RelatedAttributeCard = ({image, description}) => {
    return (
        <Card className="related-attribute-card">
            <img src={image} />
            {description}
        </Card>
    );
};

RelatedAttributeCard.propTypes = {
    image: PropTypes.String.isRequired,
    description: PropTypes.String.isRequired
};

export default RelatedAttributeCard;