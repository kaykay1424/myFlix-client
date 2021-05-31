/************ Modules **************/

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import {
    BrowserRouter as Router, 
    Redirect, 
    Route
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
import './main-view.scss';

const MainView = ({
    movies,  
    logoutUser,
    setActors, 
    setMovies, 
    setFavoritedMovies,
    setFeaturedMovies,
    setUserInfo,
    user
}) => {

    useEffect(() => {
        if (token && movies.length === 0) {
            getActors(token);
            getMovies(token);
            getFavoritedMovies(token);
        }
        if (token && !user.id) {
            axios.get(
                // eslint-disable-next-line max-len
                `https://my-flix-2021.herokuapp.com/users/${localStorage.getItem('user')}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }).then(response => {
                const currentUser = response.data;
                setUserInfo({
                    birthDate: currentUser.birthDate,
                    favoriteActors: currentUser.favoriteActors,
                    favoriteMovies: currentUser.favoriteMovies,
                    email: currentUser.email,
                    id: localStorage.getItem('user'),
                    password: currentUser.password,
                    toWatchMovies: currentUser.toWatchMovies,
                    username: currentUser.username
                });
            });
        }
    },[]);
    
    const token = localStorage.getItem('token');

    const [actorsError, setActorsError] = useState(false);
    const [moviesError, setMoviesError] = useState(false);

    const getActors = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/actors',{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                setActors(response.data);
            })
            .catch(error => {
                setActorsError(error);
            });
    };

    const getFavoritedMovies = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/favorite-movies',{
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            setFavoritedMovies(response.data);
        }).catch(error => {
            setMoviesError(error);
        });
    };

    const getMovies = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/movies',{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                const movies = response.data;
                setMovies(movies);
                setFeaturedMovies(movies.filter(movie =>
                    (movie.featured)));
            })
            .catch(error => {
                setMoviesError(error);
            });
    };

    const onLoggedIn = ({token, user}) => {   
        setUserInfo({
            birthDate: user.birthDate,
            favoriteActors: user.favoriteActors,
            favoriteMovies: user.favoriteMovies,
            email: user.email,
            id: user._id,
            password: user.password,
            toWatchMovies: user.toWatchMovies,
            username: user.username
        });
        localStorage.setItem('token', token);
        localStorage.setItem('user', user._id);
        getActors(token);
        getMovies(token);
        getFavoritedMovies(token);    
    };

    const onLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        logoutUser();
        window.open('/', '_self');
    };

    const showLogin = (path) => {
        if (path == 'logout')
            onLogout();
        return <LoginView onLoggedIn={onLoggedIn} />;
    };
        
    return (
        <Router>    
            <MainNavbar /> 
            <Container className={`my-flix`} fluid>             
                <Route exact path="/" render={() => {
                    // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;

                    return <MoviesView error={moviesError} />;
                }} />

                <Route path="/movies/:id" render={({history, match}) => {
                // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;
                    
                    return <MovieView 
                        match={match} 
                        onBackClick={() => history.goBack()} 
                    />;
                }}/>

                <Route exact path="/actors" render={() => {
                    // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;
                    
                    return <ActorsView error={actorsError} />;
                }} />

                <Route path="/actors/:id" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;

                    return (
                        <ActorView  
                            onBackClick={() => history.goBack()} 
                            match={match}
                        />        
                    );
                }} />

                <Route path="/genres/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;
                    
                    return (                         
                        <GenreView 
                            match={match}
                            onBackClick={() => history.goBack()} 
                        />
                    );
                }} />

                <Route path="/directors/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;
                    
                    return (
                        <DirectorView  
                            match={match}
                            onBackClick={() => history.goBack()} 
                        />
                    );
                }} />     

                <Route path="/register" render={() => {
                    // if user is already logged in redirect to home page
                    if (token) 
                        return <Redirect to="/" />;

                    return (<RegistrationView />);
                }} />

                <Route path="/profile" render={() => {
                    // If user is not logged in, show login view
                    if (!token) return <Redirect to="/login" />;
                    return (
                        <ProfileView 
                            onLogout={onLogout} 
                        />
                    );
                }} />

                <Route path="/login" render={() => {
                    // if user is already logged in redirect to home page
                    if (token) 
                        return <Redirect to="/" />;

                    return <LoginView onLoggedIn={onLoggedIn} />;
                }} />
                
                <Route path="/logout" render={() => {
                    showLogin('logout');
                }} />

                <Route path="/about" render={() => {
                    if (!token) return <Redirect to="/login" />;
                    return <AboutView />;
                }} />
            </Container>
        </Router>
            
    );               
       
};

MainView.propTypes = {
    actors: PropTypes.array.isRequired,
    actorsFilter: PropTypes.string.isRequired,
    actorsSortingFactor: PropTypes.string.isRequired,
    favoritedMovies: PropTypes.array.isRequired,
    featuredMovies: PropTypes.array.isRequired,
    logoutUser: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    moviesFilter: PropTypes.string,
    moviesListType: PropTypes.string.isRequired,
    moviesSortingFactor: PropTypes.string.isRequired,
    selectedMovie: PropTypes.object.isRequired,
    setActors: PropTypes.func.isRequired,
    setFavoritedMovies: PropTypes.func.isRequired,
    setFeaturedMovies: PropTypes.func.isRequired,
    setMovies: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        actors: state.actors,
        actorsFilter: state.actorsFilter,
        actorsSortingFactor: state.actorsSortingFactor,
        favoritedMovies: state.favoritedMovies,
        featuredMovies: state.featuredMovies,
        movies: state.movies,
        moviesFilter: state.moviesFilter,
        moviesListType: state.moviesListType,
        moviesSortingFactor: state.moviesSortingFactor,
        selectedMovie: state.selectedMovie,
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