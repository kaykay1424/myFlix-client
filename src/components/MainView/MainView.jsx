/************ Modules **************/

import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import {
    BrowserRouter as Router, 
    Redirect, 
    Route
} from 'react-router-dom';
import {connect} from 'react-redux';

/************ Components ************/

import GenreView from '../GenreView/GenreView';
import DirectorView from '../DirectorView/DirectorView';
import MainNavbar from '../MainNavbar/MainNavbar';
import MovieCard from '../MovieCard/MovieCard';
import MovieView from '../MovieView/MovieView';
import LoginView from '../LoginView/LoginView';
import ProfileView from '../ProfileView/ProfileView';
import RegistrationView from '../RegistrationView/RegistrationView';

import {
    logoutUser,
    setActors, 
    setMovies, 
    setFavoritedMovies,
    setFeaturedMovies,
    setSelectedMovie, 
    setUserInfo
} from '../../actions/actions';
import './main-view.scss';

const MainView = ({
    actors, 
    movies, 
    selectedMovie, 
    logoutUser,
    setActors, 
    setMovies, 
    setFavoritedMovies,
    setFeaturedMovies,
    setUserInfo}) => {
    
    const token = localStorage.getItem('token');

    const [error, setError] = useState(false);

    const getActors = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/actors',{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                setActors(response.data);
            })
            .catch(error => {
                setError(error);
            });
    };

    const getFavoritedMovies = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/favorite-movies',{
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            setFavoritedMovies(response.data);
        }).catch(error => {
            setError(error);
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
                setError(error);
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
        return (
            <>
                    
                <Row className="justify-content-md-center">
                    <Col className="form-container" md={5}>
                        <LoginView 
                            onLoggedIn={onLoggedIn} 
                        />
                    </Col>
                </Row>
            </>
        );
    };
        
    return (
        <Router>
            <MainNavbar /> 
            <Container className="my-flix" fluid>             
                <Route exact path="/" render={() => {
                    // If user is not logged in, show login view
                    if (!token) return showLogin();
                    // if there is an error loading the movies
                    if (error) {
                        return (
                            <>
                                    
                                <Row className="justify-content-md-center">
                                    <Col md="5"> 
                                        <div>
                                            An error has occurred. 
                                            Please try again.
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        );
                    }     

                    // If there are no movies to display    
                    if (movies.length === 0) 
                        return (
                            <>
                                    
                                <div className="movies-container" />
                            </>
                        );

                    return (
                        <>
                                
                            <Row 
                                className="movies-container 
                                justify-content-md-center"
                            >
                                {movies.map((movie) => {
                                    return (
                                        <Col key={movie._id}  md={4}>
                                            <MovieCard 
                                                movie={movie} 
                                                
                                            />
                                        </Col>
                                    );
                                })};
                            </Row>;
                        </>
                    );
                }} />
                             
                <Route path="/movies/:id" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return showLogin();
                    const movie = movies.find(
                        
                        movie => {
                            // console.log(movie)
                            return movie._id === match.params.id;
                        }); 

                    const movieActors = movie.stars.map((star) => {
                        const matchingActor = actors.find((actor) => {
                            return star.actor === actor.name;
                        });
                        
                        
                        return {
                            ...star,
                            id: matchingActor._id,
                            image: matchingActor.image
                        };
                    });

                    return (
                        <>
                                
                            <Row className="justify-content-md-center">
                                <Col 
                                    id="movie-view" 
                                    className="view" md={6}>    
                                    <MovieView 
                                        movie={movie} 
                                        movieActors={movieActors} 
                                        onBackClick={() => history.goBack()} 
                                    />
                                </Col>
                            </Row>
                        </>
                    );
                }} />

                <Route path="/genres/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return showLogin();
                    const selectedGenre = movies.find(
                        ({genre}) => {
                            return genre.name 
                                === match.params.name;
                        }).genre;
                    return (
                        <>
                                
                            <Row className="justify-content-md-center">
                                <Col 
                                    id="genre-view" 
                                    className="view" 
                                    md={6}
                                >    
                                    <GenreView 
                                        onItemClick={this.handleItemClick}
                                        selectedGenre={selectedGenre} 
                                        otherMovies={movies.filter((movie) => {
                                            return movie.name 
                                            !== selectedMovie.name 
                                        && movie.genre.name === 
                                            selectedGenre.name;
                                        })}
                                        onBackClick={() => history.goBack()} 
                                    />
                                </Col>
                            </Row>
                        </>
                    );
                }} />

                <Route path="/directors/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return showLogin();
                    const selectedDirector = movies.find(
                        ({director}) => 
                            director.name === match.params.name).director;
                    
                    return (
                        <>
                            <Row className="justify-content-md-center">
                                <Col 
                                    id="director-view" 
                                    className="view" 
                                    md={6}
                                >    
                                    <DirectorView
                                        onItemClick={this.handleItemClick} 
                                        selectedDirector={selectedDirector} 
                                        otherMovies={movies.filter((movie) => {
                                            return movie.name 
                                            !== selectedMovie.name 
                                        && movie.director.name === 
                                            selectedDirector.name;
                                        })}
                                        onBackClick={() => history.goBack()} 
                                    />
                                </Col>
                            </Row>;
                        </>
                    );
                }} />     

                <Route path="/register" render={() => {
                    // if user is already logged in redirect to home page
                    if (token) 
                        return <Redirect to="/" />;

                    return (
                        <>
                                
                            <Row className="justify-content-md-center">
                                <Col className="form-container" md={5}>
                                    <RegistrationView />
                                </Col>                    
                            </Row>
                        </>
                    );
                }} />

                <Route path="/profile" render={() => {
                    // If user is not logged in, show login view
                    if (!token) return showLogin();
                    return (
                        <>
                                
                            <Row className="justify-content-md-center">
                                <Col 
                                    id="profile-view" 
                                    className="form-container" 
                                    md={8}
                                >
                                    <ProfileView 
                                        onLogout={onLogout} 
                                    />
                                </Col>
                            </Row>
                        </>
                    );
                }} />
                <Route path="/logout" render={() => {
                    showLogin('logout');
                }} />
            </Container>
        </Router>
            
    );               
       
};

MainView.propTypes = {
    actors: PropTypes.array.isRequired,
    logoutUser: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
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
        favoritedMovies: state.favoritedMovies,
        featuredMovies: state.featuredMovies,
        movies: state.movies,
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
    setSelectedMovie,
    setUserInfo
})(MainView);