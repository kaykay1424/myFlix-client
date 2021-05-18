import React from 'react';
import PropTypes from 'prop-types';

import '../../utils/partials/_view.scss';

const MovieView = ({selectedMovie, onBackClick, onItemClick}) => {    
    return (
        <>
            <div 
                className="image-cover" 
                style={
                    {
                        backgroundImage: `url(${selectedMovie.image})`
                    }
                }
            >
                <div className="close-box">
                    <svg 
                        onClick={() => onBackClick('selectedMovie')} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-x"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>
            </div>
            <div className="main-content">
                <h1>{selectedMovie.name}</h1>
                <p className="label">Description</p>
                <p className="description">{selectedMovie.description}</p>
            </div>                      
            <div className="attributes">
                <div className="attribute">
                    <p className="label">Director</p>
                    <p onClick={() => 
                        onItemClick('selectedDirector', selectedMovie.director)}
                    >
                        {selectedMovie.director.name}
                    </p>
                </div>
                <div className="attribute">
                    <p className="label">Genre</p>
                    <p onClick={() => 
                        onItemClick('selectedGenre', selectedMovie.genre)}
                    >
                        {selectedMovie.genre.name}
                    </p>
                </div>
            </div> 
        </>              
    );
};

MovieView.propTypes = {
    selectedMovie: PropTypes.shape({
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default MovieView;