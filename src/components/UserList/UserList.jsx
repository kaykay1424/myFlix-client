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
    listTypeJS, 
    movies,
    token, 
    itemIdType, 
    setFavoritedMovies,
    user}) => {
    const [list, setList] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        
        if (listTypeJS.match(/movies/i)) {
            setList(user[listTypeJS].map((movieId) => {
                
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
        } else if (listTypeJS.match(/actors/i)) {
            
            setList(user[listTypeJS].map((actorId) => {
                
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

    const addItemsToListLink = () => {
        const listTypeString = listType.replace(/-/g, ' ');
        if (listTypeString.match(/movies/i)) {
            return <p>
                Add some <Link to="/">movies</Link> to 
                your <span className="list-type">
                    {listTypeString}
                </span> list!
            </p>;
        } else if (listTypeString.match(/actors/i)) {
            return <p>
                Add some <Link to="/actors">actors</Link> to 
                your <span className="list-type">
                    {listTypeString}</span> list!
            </p>;
        }
    };

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
            const newList = list.filter(listItem => {
                return listItem.id !== itemId;
            });
            setList(newList);
            if (listTypeJS === 'favoriteMovies') {
                removeUserFavoriteMovie(itemId);
                setFavoritedMovies(favoritedMovies.map(movie => {
                    if (movie.name === itemName) {
                        return {
                            ...movie,
                            usersFavorited: movie.usersFavorited--
                        };
                    }
                    return movie;
                }));
            }
            if (listTypeJS === 'favoriteActors')
                removeUserFavoriteActor(itemId);
            if (listTypeJS === 'toWatchMovies')
                removeUserToWatchMovie(itemId);
                
        }).catch(err => {
            setError(err);
        });
    };

    return (
        <div className="user-list">
            <h4 className="heading">{title}</h4>
            <ul>
                {list && (list.length > 0) ? list.map((item) => {
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
                            <svg 
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
                    : addItemsToListLink()
                }
            </ul>
            {error 
                ? 
                <p 
                    className="error"
                >There was an error removing that item from your 
                    {listType.replace(/-/g,' ')} list.</p>
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
    listTypeJS: PropTypes.string,
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