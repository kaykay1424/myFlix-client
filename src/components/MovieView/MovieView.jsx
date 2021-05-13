import React from 'react';

const MovieView = ({selectedMovie, showAllMovies}) => {
    return (
        <div className="movie-view">
            <div className="image-cover" style={{backgroundImage: `url(${selectedMovie.image})`}}>
                <div className="close-box">
                    <svg 
                        onClick={() => showAllMovies()} 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-x">
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
                    <p>{selectedMovie.director.name}</p>
                </div>
                <div className="attribute">
                    <p className="label">Genre</p>
                    <p>{selectedMovie.genre.name}</p>
                </div>
            </div>
        </div>                 
    );
};

export default MovieView;