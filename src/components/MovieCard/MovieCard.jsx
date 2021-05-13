import React from 'react';

const MovieCard = ({movie, showMovieDetails}) => {
    const createExcerpt = (description) => {
        return description.slice(0, 45);
    };

    return (
        <div className="movie-card">
            <h3 className="header">{movie.name}</h3>
            <img src={movie.image} />
            <p className="description">
                {createExcerpt(movie.description)} &hellip;
            </p>
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
                    onClick={() => showMovieDetails(movie)}>Read More
                </span>
            </div> 
        </div>
    );       
};

export default MovieCard;