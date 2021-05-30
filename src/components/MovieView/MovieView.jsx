import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    addUserToWatchMovie, 
    addUserFavoriteMovie,
    setFavoritedMovies, 
    setSelectedMovie
} from '../../actions/actions';
import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';
import {addToList} from '../../utils/helpers';
import '../../utils/partials/_view.scss';
import './movie-view.scss';

const MovieView = ({
    addUserFavoriteMovie,
    addUserToWatchMovie,
    favoritedMovies,
    movieActors, 
    movie, 
    setSelectedMovie, 
    onBackClick, 
    user}) => {   
    const [favorited, setFavorited] = useState(false);
    const [willWatch, setWillWatch] = useState(false);

    useEffect(() => {
        setSelectedMovie(movie); 
    },[]);
    
    const addToFavoritesList = () => {
        addToList(
            user.id, 
            'favorite-movies', 
            movie._id, 
            'movie_id').then(() => {
            setFavorited(true);
            addUserFavoriteMovie(movie._id);
            setFavoritedMovies(favoritedMovies.map(favoritedMovie => {
                if (favoritedMovie.name === movie.name) {
                    return {
                        ...movie,
                        usersFavorited: favoritedMovie.usersFavorited++
                    };
                }
                return movie;
            }));
        });
    };

    const addToWatchList = () => {
        addToList(
            user.id, 
            'to-watch-movies', 
            movie._id, 
            'movie_id').then(() => {
            setWillWatch(true);
            addUserToWatchMovie(movie._id);
        });
    };

    return (
        <>
            <div 
                className="image-cover" 
                style={
                    {
                        backgroundImage: `url(${movie.image})`
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
                    {movie.name}
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
                            ${favorited 
                                || (user.favoriteMovies && user.favoriteMovies.indexOf(movie._id) > -1) 
                                ? 'added-to-list': ''}`
                            }
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
                            ${willWatch 
                                || (user.toWatchMovies 
                                    && 
                                    user.toWatchMovies.indexOf(movie._id) > -1) 
                                ? 'added-to-list': ''}`
                            }
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
                <p className="description">{movie.description}</p>
                <p className="label">Release Year</p>
                <p className="description">{movie.releaseYear}</p>
                <p className="label">Rating</p>
                <p className="description">{movie.rating}</p>
            </div>                      
            <div className="attributes">
                <div className="attribute">
                    <p className="label">Director</p>
                    <Link 
                        to={`/directors/${movie.director.name}`}>
                        {movie.director.name}
                    </Link>
                </div>
                <div className="attribute">
                    <p className="label">Genre</p>
                    <Link to={`/genres/${movie.genre.name}`}>
                        {movie.genre.name}
                    </Link>
                </div>
            </div> 
            {movie.stars.length > 0
                ? (<>
                    <div className="related-attributes">
                        <h3>Stars of <i>{movie.name}</i> </h3>
                        <div className="related-attributes-card-container">

                        
                            {
                                movieActors.map((actor, i) => 
                                    
                                {
                                    return <RelatedAttributeCard 
                                        key={i}
                                        image={actor.image} 
                                        description={
                                            <>
                                                <p className="label">
                                                    <b>Actor: </b> <br/>
                                                    <span 
                                                        className="description"
                                                    >
                                                        <Link 
                                                            to={`/actors/
                                                            ${actor._id}`}
                                                        > 
                                                            {actor.actor}
                                                        </Link>
                                                    </span>
                                                </p>
                                                <p className="label">
                                                    <b>Character: </b> <br/>
                                                    <span 
                                                        className="description"
                                                    >
                                                        {actor.character}
                                                    </span>
                                                </p>
                                            </>
                                        } 
                                    />;})  
                            }
                        </div>
                    </div>
                </>)
                : null
            }
        </>              
    );
};

MovieView.propTypes = {
    addUserFavoriteMovie: PropTypes.func.isRequired,
    addUserToWatchMovie: PropTypes.func.isRequired,
    favoritedMovies: PropTypes.array.isRequired,
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number,
        releaseYear: PropTypes.number,
        stars: PropTypes.array
    }).isRequired,
    movieActors: PropTypes.array.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    setSelectedMovie: PropTypes.func.isRequired,
    setFavoritedMovies: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        favoriteMovies: PropTypes.array.isRequired,
        toWatchMovies: PropTypes.array.isRequired
    })
};

const mapStateToProps = state => ({
    favoritedMovies: state.favoritedMovies,
    user: state.user
});

export default connect(mapStateToProps, {
    addUserFavoriteMovie, 
    addUserToWatchMovie,
    setFavoritedMovies,
    setSelectedMovie})(MovieView);

