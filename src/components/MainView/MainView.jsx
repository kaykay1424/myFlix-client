/************ Modules **************/

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {
    Redirect, 
    Route,
    Switch,
    useHistory
} from 'react-router-dom';
import {connect} from 'react-redux';

/************ Components ************/

import AboutView from '../AboutView/AboutView';
import ActorView from '../ActorView/ActorView';
import ActorsView from '../ActorsView/ActorsView';
import GenreView from '../GenreView/GenreView';
import DirectorView from '../DirectorView/DirectorView';
import MainNavbar from '../MainNavbar/MainNavbar';
import MovieView from '../MovieView/MovieView';
import MoviesView from '../MoviesView/MoviesView';
import LoginView from '../LoginView/LoginView';
import ProfileView from '../ProfileView/ProfileView';
import RegistrationView from '../RegistrationView/RegistrationView';

import {
    logoutUser,
    setActors, 
    setMovies, 
    setMoviesFilter,
    setFavoritedMovies,
    setFeaturedMovies,
    setSelectedMovie, 
    setUserInfo
} from '../../actions/actions';

const MainView = ({
    logoutUser,
    movies,  
    setActors, 
    setMovies, 
    setFavoritedMovies,
    setFeaturedMovies,
    setUserInfo,
    user
}) => {
    const [actorsError, setActorsError] = useState(false);
    const [moviesError, setMoviesError] = useState(false);

    const token = localStorage.getItem('token');
    const history = useHistory();

    // Set necessary info after page refresh
    useEffect(() => { 
        // // Reset error values so errors will be removed, 
        // until errors occur again  
        setMoviesError(false);
        setActorsError(false);
        // If user is logged in but movies haven't been set    
        if (user && movies.length === 0) {
            getActors(token);
            getMovies(token).then((data) => getFavoritedMovies(token, data));
            
        }
        // If user is logged in but user info hasn't been set
        if (token && !user) {
            const userId = localStorage.getItem('user');
            axios.get(
                // eslint-disable-next-line max-len
                `https://my-flix-2021.herokuapp.com/users/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }).then(response => {
                setUserInfo({
                    ...response.data,
                    _id: userId
                });
            }).catch(error => {
                // If token is invalid
                if (error.response.status === 401) {
                    onLogout('/login');
                } 
            });
            
        }
    },[user, movies]);

    // Get list of actors from API
    const getActors = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/actors',{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                const actorsList = response.data;
                setActors(actorsList);
                
                if (actorsList.length === 0) {
                    setActorsError({
                        message: 'There are no actors to display.',
                        type: 'info'
                    });
                }
            })
            .catch(() => {
                setActorsError({
                    message: `The list of actors could not be loaded. 
                    Please try again`,
                    type: 'error'
                });
            });
    };

    // Get list of favoritedMovies from API
    const getFavoritedMovies = (token, moviesList) => {
        axios.get('https://my-flix-2021.herokuapp.com/favorite-movies',{
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            const favMovies = response.data;
            // Get list of movies and add usersFavorited property
            // to the ones that have been favorited by users
            moviesList = moviesList.map((movie) => {
                for (let i = 0; i < favMovies.length; i++) {
                    if (favMovies[i].name === movie.name) { 
                        const usersFavorited = 
                        favMovies[i].usersFavorited;
                        return {
                            ...movie,
                            usersFavorited
                        };
                    }
                }
                return false;
            });

            // Filter out the movies that haven't been favorited by users
            // and set favoritedMovies to that list
            setFavoritedMovies(moviesList.filter(movie => {
                return movie; 
            }));
           
        }).catch(() => {
            setMoviesError({
                message: `The list of movies could not be loaded. 
                Please try again.`,
                type: 'error'
            });
        });
    };

    // Get list of all movies from API
    const getMovies = (token) => {
        return axios.get('https://my-flix-2021.herokuapp.com/movies',{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                const moviesList = response.data;
                setMovies(moviesList);
                // Filter out the movies that aren't featured
                // and set featuredMovies to that list
                setFeaturedMovies(moviesList.filter(movie =>
                    (movie.featured)));
                
                if (moviesList.length === 0) {
                    setMoviesError({
                        message: 'There are no movies to display.',
                        type: 'info'
                    });
                }

                return moviesList;
            })
            .catch(() => {
                setMoviesError({
                    message: `The list of movies could not be loaded. 
                    Please try again.`,
                    type: 'error'
                });
            });
    };

    // Set user info and get lists of movies/actors 
    // after user is logged in
    const onLoggedIn = ({token, user}) => {  
        localStorage.setItem('token', token);
        localStorage.setItem('user', user._id);
        setUserInfo(user);

        getActors(token);
        getMovies(token).then((data) => getFavoritedMovies(token, data));
        history.push('/');
    };

    // Remove user info once user is logged out
    const onLogout = (redirectPath) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        logoutUser();
        history.push(redirectPath);
    };

    return (
        <>    
            <MainNavbar onLogout={onLogout} /> 
            <Container className={`my-flix`} fluid> 
                <Switch>            
                    <Route exact path="/" render={() => {                    
                        // If user is not logged in, show login view
                        if (!token) 
                            return <Redirect to="/login" />;

                        return <MoviesView 
                            error={moviesError.message || false} 
                            errorType={moviesError.type || false} />;
                    }} />

                    <Route path="/movies/:id" render={({history, match}) => {
                        // If user is not logged in, show login view
                        if (!token) 
                            return <Redirect to="/login" />;
                    
                        return <MovieView 
                            match={match} 
                            onBackClick={() => history.goBack()} 
                        />;                                        
                    }}/>

                    <Route exact path="/actors" render={() => {
                    // If user is not logged in, show login view
                        if (!token) 
                            return <Redirect to="/login" />;
                    
                        return <ActorsView 
                            error={actorsError.message || false} 
                            errorType={actorsError.type || false} />;
                    }} />

                    <Route path="/actors/:id" render={({history, match}) => {
                    // If user is not logged in, show login view
                        if (!token) 
                            return <Redirect to="/login" />;

                        return (
                            <ActorView  
                                onBackClick={() => history.goBack()} 
                                match={match}
                            />        
                        );
                    }} />

                    <Route path="/genres/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                        if (!token) 
                            return <Redirect to="/login" />;
                    
                        return (                         
                            <GenreView 
                                match={match}
                                onBackClick={() => history.goBack()} 
                            />
                        );
                    }} />

                    <Route 
                        path="/directors/:name" 
                        render={({history, match}) => {
                            // If user is not logged in, show login view
                            if (!token) 
                                return <Redirect to="/login" />;
                    
                            return (
                                <DirectorView  
                                    match={match}
                                    onBackClick={() => history.goBack()} 
                                />
                            );
                        }} />     

                    <Route path="/register" render={({history}) => {
                    // if user is already logged in redirect to home page
                        if (user) 
                            return <Redirect to="/" />;

                        return (<RegistrationView history={history} />);
                    }} />

                    <Route path="/login" render={({history}) => {
                    // if user is already logged in redirect to home page
                        if (user) 
                            return <Redirect to="/" />;

                        return <LoginView 
                            history={history} 
                            onLoggedIn={onLoggedIn} 
                        />;
                    }} />

                    <Route path="/profile" render={({history}) => {
                    // If user is not logged in, show login view
                        if (!token) 
                            return <Redirect to="/login" />;
                        return (
                            <ProfileView 
                                history={history}
                                onLogout={onLogout} 
                            />
                        );
                    }} />

                    <Route path="/about" render={() => {
                        if (!token) 
                            return <Redirect to="/login" />;
                        return <AboutView />;
                    }} />

                    {/* Catch all Route */}
                    <Route path="*" render={() => {
                        return <Redirect to="/" />;
                    }} />
                </Switch>
            </Container>
        </>         
    );                      
};

MainView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    setActors: PropTypes.func.isRequired,
    setFavoritedMovies: PropTypes.func.isRequired,
    setFeaturedMovies: PropTypes.func.isRequired,
    setMovies: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => {
    return {
        movies: state.movies,
        user: state.user
    };
};

export default connect(mapStateToProps, {
    setFavoritedMovies,    
    setFeaturedMovies,
    logoutUser,
    setActors, 
    setMovies, 
    setMoviesFilter,
    setSelectedMovie,
    setUserInfo
})(MainView);