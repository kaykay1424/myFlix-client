/************ Modules *************/

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    removeUserFavoriteActor,
    removeUserFavoriteMovie,
    removeUserToWatchMovie,
    setFavoritedMovies
} from '../../actions/actions';

import {createExcerpt} from '../../utils/helpers';

import './user-list.scss';

const UserList = ({
    actors,
    favoritedMovies,
    title, 
    listType, 
    listTypeCamelCase, 
    movies,
    token, 
    itemIdType, 
    removeUserFavoriteActor,
    removeUserFavoriteMovie,
    removeUserToWatchMovie,
    setFavoritedMovies,
    user
}) => {
    // If the list of actors/movies is empty or user hasn't been set
    // stop execution of function
    // as is is needed for component to function properly 
    if (Object.keys(user).length === 0 
        || movies.length === 0 
        || actors.length === 0)
        return null;
    
    const [list, setList] = useState(null);
    const [error, setError] = useState(false);
    // User's lists contain only ids 
    // so it is necessary to loop through list of all movies
    // to get details of the movies 
    useEffect(() => {
        // If list type is movies
        if (listTypeCamelCase.match(/movies/i)) {
            setList(user[listTypeCamelCase].map((movieId) => {
                const matchingMovie = movies.find((movie) => {
                    return movie._id === movieId;
                });
 
                return {
                    
                    id: matchingMovie._id,
                    description: matchingMovie.description,
                    image: matchingMovie.image,
                    name: matchingMovie.name
                };
            }));
            // If list type is actors  
        } else if (listTypeCamelCase.match(/actors/i)) {
            setList(user[listTypeCamelCase].map((actorId) => {
                const matchingActor = actors.find((actor) => {
                    return actor._id === actorId;
                });
                           
                return {
                    id: matchingActor._id,
                    bio: matchingActor.bio,
                    image: matchingActor.image,
                    name: matchingActor.name
                };
            }));
        }        
    },[]);
    
    // Remove item from user's list
    const removeListItem = (itemId, itemName) => {
        const data = {};
        data[itemIdType] = itemId;
        axios({
            method: 'delete',
            // eslint-disable-next-line max-len
            url: `https://my-flix-2021.herokuapp.com/users/${user.id}/${listType}/${itemId}`,
            data,
            headers:  {Authorization: `Bearer ${token}`}
        }).then(() => {
            // Filter out movie that was removed from user's list
            const newList = list.filter(listItem => {
                return listItem.id !== itemId;
            });
            setList(newList);
            
            // If list is user's favorite movies list
            // the list of favorited movies will need to be updated as well
            if (listTypeCamelCase === 'favoriteMovies') {
                removeUserFavoriteMovie(itemId);
                let newFavoritedMovies = [...favoritedMovies];
                const isMovieFavoritedOnce = 
                favoritedMovies.find(favoritedMovie => {
                    return favoritedMovie.name === itemName;
                }).usersFavorited === 1;

                // If movie only has 1 favorite,
                // remove that movie from the favorited movies list
                // as it will no longer have any favorites 
                // after it is removed from user's favorite movies list
                if (isMovieFavoritedOnce) {
                    for (let i = 0; i < newFavoritedMovies.length;i++) {
                        if (newFavoritedMovies[i].name === itemName) {
                            newFavoritedMovies.splice(i,1);
                            break;
                        }
                    }
                // Otherwise get list of favoritedMovies 
                // with movie's usersFavorited property
                // decreased by 1
                } else {
                    newFavoritedMovies = favoritedMovies.map(movie => {
                        let usersFavorited = movie.usersFavorited;
                        if (movie.name === itemName) {
                            usersFavorited--;
                        }
                        return {
                            ...movie,
                            usersFavorited: usersFavorited
                        };
                    });
                }

                setFavoritedMovies(newFavoritedMovies);
            }

            if (listTypeCamelCase === 'favoriteActors')
                removeUserFavoriteActor(itemId);
            if (listTypeCamelCase === 'toWatchMovies')
                removeUserToWatchMovie(itemId);
                
        }).catch(err => {
            setError(err);
        });
    };

    return (
        <div className="user-list">
            <h4 className="heading">{title}</h4>
            <ul>
                {/* Show user's list of items */}
                {list && list.length > 0 ? list.map((item) => {
                    return (
                        <li className="user-list-item" key={item.id}>
                            <div className="details">
                                <p>
                                    <Link to={`${
                                        listType.match(/movies/i) 
                                            ? `/movies/${item.id}` 
                                            : `/actors/${item.id}`}`}
                                    >
                                        {item.name}
                                    </Link>
                                </p>
                                <p 
                                    className="description"
                                >
                                    {
                                        createExcerpt(item.description 
                                            ? item.description: item.bio)
                                    } &hellip;
                                </p>
                            </div>
                            <svg /* Trash icon */
                                onClick={() => removeListItem(
                                    item.id, item.name)}
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="feather feather-trash"
                            >
                                <polyline points="3 6 5 6 21 6">
                                </polyline>
                                <path 
                                    d="M19 6v14a2 2 0 0 
                                    1-2 2H7a2 2 0 0 1-2-2V6m3
                                    0V4a2 2 0 0 1 2-2h4a2 
                                    2 0 0 1 2 2v2"
                                >
                                </path>
                            </svg>
                        </li>
                    );
                })
                    : <p>
                    Add some <Link to={`${
                            listType === 'movies' 
                                ? '/'
                                : '/actors'}`}
                        >
                            {listType.match('movies') ? 'movies': 'actors'}
                        </Link> to 
                    your <span className="list-type">
                            {title}
                        </span> list!
                    </p>
                }
            </ul>
            {error 
                ? 
                <p 
                    className="error"
                >There was an error removing that item from your 
                    {title} list.</p>
                : null
            }
        </div>
    );
};

UserList.propTypes = {
    actors: PropTypes.array.isRequired,
    favoritedMovies: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired, 
    listType: PropTypes.string.isRequired, 
    listTypeCamelCase: PropTypes.string,
    removeUserFavoriteActor: PropTypes.func.isRequired,
    removeUserFavoriteMovie: PropTypes.func.isRequired,
    removeUserToWatchMovie: PropTypes.func.isRequired,
    setFavoritedMovies: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),
    token: PropTypes.string.isRequired, 
    itemIdType: PropTypes.string.isRequired
};

const mapToStateProps = state => ({
    actors: state.actors,
    favoritedMovies: state.favoritedMovies,
    movies: state.movies,
    user: state.user
});

export default connect(mapToStateProps, {
    removeUserFavoriteActor,
    removeUserFavoriteMovie,
    removeUserToWatchMovie,
    setFavoritedMovies
})(UserList);