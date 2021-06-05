/*********** Action Types *************/

/*********** -Actor Action Types **************/

export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_ACTORS_SORTING_FACTOR = 'SET_ACTORS_SORTING_FACTOR';
export const SET_ACTORS = 'SET_ACTORS';
export const SET_ACTORS_FILTER = 'SET_ACTORS_FILTER';

/*********** -Movie Action Types ************/

export const ADD_FAVORITED_MOVIE = 'ADD_FAVORITED_MOVIE';
export const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE';
export const SET_FAVORITED_MOVIES = 'SET_FAVORITED_MOVIES';
export const SET_FEATURED_MOVIES = 'SET_FEATURED_MOVIES';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_MOVIES_LIST_TYPE = 'SET_MOVIES_LIST_TYPE';
export const SET_MOVIES_FILTER = 'SET_MOVIES_FILTER';
export const SET_MOVIES_SORTING_FACTOR = 'SET_MOVIES_SORTING_FACTOR';

/************** -User Action Types ************/

export const ADD_USER_FAVORITE_ACTOR = 'ADD_USER_FAVORITE_ACTOR';
export const ADD_USER_FAVORITE_MOVIE = 'ADD_USER_FAVORITE_MOVIE';
export const ADD_USER_TO_WATCH_MOVIE = 'ADD_USER_TO_WATCH_MOVIE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const REMOVE_USER_FAVORITE_ACTOR = 'REMOVE_USER_FAVORITE_ACTOR';
export const REMOVE_USER_FAVORITE_MOVIE = 'REMOVE_USER_FAVORITE_MOVIE';
export const REMOVE_USER_TO_WATCH_MOVIE = 'REMOVE_USER_TO_WATCH_MOVIE';

/*************** Actions **************/

/************** -Actor Actions **************/

export const setActors = actors => ({
    type: SET_ACTORS,
    actors
});

export const setActorsFilter = filter => ({
    type: SET_ACTORS_FILTER,
    filter
});

export const setActorsSortingFactor = sortingFactor => ({
    type: SET_ACTORS_SORTING_FACTOR,
    sortingFactor
});

/*************** -Movie Actions ************/

export const addFavoritedMovie = movieName => ({
    type: ADD_FAVORITED_MOVIE,
    movieName
});

export const setMovies = movies => ({
    type: SET_MOVIES,
    movies
});

export const setFavoritedMovies = movies => ({
    type: SET_FAVORITED_MOVIES,
    movies
});

export const setFeaturedMovies = movies => ({
    type: SET_FEATURED_MOVIES,
    movies
});

export const setMoviesListType = listType => ({
    type: SET_MOVIES_LIST_TYPE,
    listType
});

export const setMoviesFilter = filter => ({
    type: SET_MOVIES_FILTER,
    filter
});

export const setMoviesSortingFactor = sortingFactor => ({
    type: SET_MOVIES_SORTING_FACTOR,
    sortingFactor
});

export const setSelectedMovie = movie => ({
    type:  SET_SELECTED_MOVIE,
    movie
});

/************ -User Actions **********/

export const addUserFavoriteActor = actorId => ({
    type: ADD_USER_FAVORITE_ACTOR,
    actorId
});

export const addUserFavoriteMovie = movieId => ({
    type: ADD_USER_FAVORITE_MOVIE,
    movieId
});

export const addUserToWatchMovie = movieId => ({
    type: ADD_USER_TO_WATCH_MOVIE,
    movieId
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const removeUserFavoriteActor = actorId => ({
    type: REMOVE_USER_FAVORITE_ACTOR,
    actorId
});

export const removeUserFavoriteMovie = movieId => ({
    type: REMOVE_USER_FAVORITE_MOVIE,
    movieId
});

export const removeUserToWatchMovie = movieId => ({
    type: REMOVE_USER_TO_WATCH_MOVIE,
    movieId
});

export const setUserInfo = info => ({
    type: SET_USER_INFO,
    info
});






