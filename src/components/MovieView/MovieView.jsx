import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {addToList} from '../../utils/helpers';
import '../../utils/partials/_view.scss';
import './movie-view.scss';

const MovieView = ({selectedMovie, onBackClick, onItemClick, userId}) => {   
    const [favorited, setFavorited] = useState(false);
    const [willWatch, setWillWatch] = useState(false);

    const addToFavoritesList = () => {
        addToList(
            userId, 
            'favorite-movies', 
            selectedMovie._id, 
            'movie_id').then(() => {
            setFavorited(true);
        });
    };

    const addToWatchList = () => {
        addToList(
            userId, 
            'to-watch-movies', 
            selectedMovie._id, 
            'movie_id').then(() => {
            setWillWatch(true);
        });
    };

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
                        onClick={
                            () => onBackClick()
                        }                            
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
                <h1>
                    {selectedMovie.name}
                    <div className="user-list-icons">
                        <svg 
                            onClick={() => addToFavoritesList()}
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className={`feather feather-heart 
                            ${favorited ? 'added-to-list': ''}`}
                            title="Add this movie to your Favorite Movies list"
                        >
                            <path 
                                d="M20.84 4.61a5.5
                                5.5 0 0 0-7.78 
                                0L12 5.67l-1.06-1.06a5.5 
                                5.5 0 0 0-7.78 7.78l1.06 
                                1.06L12 21.23l7.78-7.78 
                                1.06-1.06a5.5 5.5 0 0 0 
                                0-7.78z"
                            >
                            </path>
                        </svg>
                        <svg 
                            onClick={() => addToWatchList()}
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className={`feather feather-bookmark 
                            ${willWatch ? 'added-to-list': ''}`}
                            title="Add this movie to your To Watch Movies list"
                        >
                            <path 
                                d="M19 21l-7-5-7 
                                    5V5a2 2 0 0 
                                    1 2-2h10a2 2 
                                    0 0 1 2 2z">
                            </path>
                        </svg>
                    </div>
                </h1>
                <p className="label">Description</p>
                <p className="description">{selectedMovie.description}</p>
            </div>                      
            <div className="attributes">
                <div className="attribute">
                    <p className="label">Director</p>
                    <Link 
                        to={`/directors/${selectedMovie.director.name}`} 
                        onClick={
                            () => onItemClick(
                                'selectedDirector', selectedMovie.director
                            )}
                    >
                        {selectedMovie.director.name}
                    </Link>
                </div>
                <div className="attribute">
                    <p className="label">Genre</p>
                    <Link to={`/genres/${selectedMovie.genre.name}`} 
                        onClick={
                            () => onItemClick(
                                'selectedGenre', selectedMovie.genre
                            )}
                    >
                        {selectedMovie.genre.name}
                    </Link>
                </div>
            </div> 
        </>              
    );
};

MovieView.propTypes = {
    selectedMovie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
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
    onItemClick: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default MovieView;