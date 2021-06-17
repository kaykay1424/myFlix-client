import {combineReducers} from 'redux';

import {
    SET_ACTORS_SORTING_FACTOR,
    SET_ACTORS,
    SET_ACTORS_FILTER,
    ADD_FAVORITED_MOVIE,
    SET_SELECTED_MOVIE,
    SET_FAVORITED_MOVIES,
    SET_FEATURED_MOVIES,
    SET_MOVIES,
    SET_MOVIES_LIST_TYPE,
    SET_MOVIES_FILTER,
    SET_MOVIES_SORTING_FACTOR,
    ADD_USER_FAVORITE_ACTOR,
    ADD_USER_FAVORITE_MOVIE,
    ADD_USER_TO_WATCH_MOVIE,
    LOGOUT_USER,
    SET_USER_INFO,
    REMOVE_USER_FAVORITE_ACTOR,
    REMOVE_USER_FAVORITE_MOVIE,
    REMOVE_USER_TO_WATCH_MOVIE,
} from '../actions/actions';

/************* Reducers ************/

/************* -Actor Reducers *************/

function actors(state = [], action) {
    switch(action.type) {
        case SET_ACTORS:
            return action.actors;                        
        default:
            return state;
    }
}

function actorsFilter(state = '', action) {
    switch(action.type) {
        case SET_ACTORS_FILTER:
            return action.filter;
        default:
            return state;
    }    
}

function actorsSortingFactor(state = '', action) {
    switch(action.type) {
        case SET_ACTORS_SORTING_FACTOR:
            return action.sortingFactor;
        default:
            return state;
    }    
}

/************* -Movie Reducers ************/

function favoritedMovies(state = [], action) {
    switch(action.type) {
        case ADD_FAVORITED_MOVIE:
            return [...state, action.movieName];
        case SET_FAVORITED_MOVIES: {
            const newFavoritedMovies = action.movies.sort((movie1, movie2) => {
                return movie2.usersFavorited - movie1.usersFavorited;
            });

            return newFavoritedMovies;
        }
        default:
            return state;
    }    
}

function featuredMovies(state = [], action) {
    switch(action.type) {
        case SET_FEATURED_MOVIES:
            return action.movies;
        default:
            return state;
    }    
}

function movies(state = [], action) {
    switch(action.type) {
        case SET_MOVIES:
            return action.movies;                        
        default:
            return state;
    }
}

function moviesFilter(state = '', action) {    
    switch(action.type) {
        case SET_MOVIES_FILTER:
            return action.filter;
        default:
            return state;
    }    
}

function moviesListType(state = 'all', action) {
    switch(action.type) {
        case SET_MOVIES_LIST_TYPE:
            return action.listType;
        default:
            return state;
    }    
}

function moviesSortingFactor(state = 'none', action) {
    switch(action.type) {
        case SET_MOVIES_SORTING_FACTOR:
            return action.sortingFactor;
        default:
            return state;
    }    
}

function selectedMovie(state = {}, action) {
    switch(action.type) {
        case SET_SELECTED_MOVIE:
            return action.movie;
        default:
            return state;
    }    
}

/************* -User Reducers ************/

function user(state = null, action) {
    switch(action.type) {
        case ADD_USER_FAVORITE_ACTOR:
            return {
                ...state,
                favoriteActors: [...state.favoriteActors, action.actorId]
            };
        case ADD_USER_FAVORITE_MOVIE:
            return {
                ...state,
                favoriteMovies: [...state.favoriteMovies, action.movieId]
            };
        case ADD_USER_TO_WATCH_MOVIE:
            return {
                ...state,
                toWatchMovies: [...state.toWatchMovies, action.movieId]
            };
        case LOGOUT_USER:
            return null;    
        case SET_USER_INFO: {
            
            const newState = {...state};
            Object.keys(action.info).forEach(property =>
                (newState[property] = action.info[property]));
            
            return newState;
        }
        case REMOVE_USER_FAVORITE_ACTOR: {
            const favoriteActors = [...state.favoriteActors]; 

            for (let i = 0;i < favoriteActors.length;i++) {
                if (favoriteActors[i] === action.actorId)
                    favoriteActors.splice(i,1);
            }

            return {
                ...state,
                favoriteActors
            };
        }
        case REMOVE_USER_FAVORITE_MOVIE: {
            const favoriteMovies = [...state.favoriteMovies];
            for (let i = 0;i < favoriteMovies.length;i++) {
                if (favoriteMovies[i] === action.movieId)
                    favoriteMovies.splice(i,1);
            }

            return {
                ...state,
                favoriteMovies
            };
        }
        case REMOVE_USER_TO_WATCH_MOVIE: {
            const toWatchMovies = [...state.toWatchMovies];
            for (let i = 0;i < toWatchMovies.length;i++) {
                if (toWatchMovies[i] === action.movieId)
                    toWatchMovies.splice(i,1);
            }
            return {
                ...state,
                toWatchMovies
            };
        }
        default:
            return state;
    }
}

const myFlixApp = combineReducers({
    actors,
    actorsFilter,
    actorsSortingFactor,
    favoritedMovies,
    featuredMovies,
    movies,
    moviesFilter,
    moviesListType,
    moviesSortingFactor,
    selectedMovie,
    user
});

export default myFlixApp;
