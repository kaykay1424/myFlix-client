import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'react-bootstrap';
import './movie-card.scss';

const MovieCard = ({movie, onItemClick}) => {
    const createExcerpt = (description) => {
        return description.slice(0, 45);
    };

    return (
        <Card className="movie-card">
            <Card.Body>            
                <Card.Title className="header">{movie.name}</Card.Title>
                <Card.Img src={movie.image} />
                <Card.Text className="description">
                    {createExcerpt(movie.description)} &hellip;
                </Card.Text>
                <div className="read-more-link-container">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-arrow-right"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <span 
                        className="read-more-link" 
                        onClick={() => 
                            onItemClick('selectedMovie', movie)}
                    >
                        Read More
                    </span>
                </div> 
            </Card.Body>
        </Card>
    );       
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default MovieCard;