/************ Modules **************/

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {
    BrowserRouter as Router, 
    Redirect, 
    Route
} from 'react-router-dom';
import {connect} from 'react-redux';

/************ Components ************/

import ActorView from '../ActorView/ActorView';
import GenreView from '../GenreView/GenreView';
import DirectorView from '../DirectorView/DirectorView';
import ListTypeSelect from '../ListTypeSelect/ListTypeSelect';
import MainNavbar from '../MainNavbar/MainNavbar';
import ListItemCard from '../ListItemCard/ListItemCard';
import MovieView from '../MovieView/MovieView';
import LoginView from '../LoginView/LoginView';
import ProfileView from '../ProfileView/ProfileView';
import RegistrationView from '../RegistrationView/RegistrationView';
import SortingFactorSelect from '../SortingFactorSelect/SortingFactorSelect';

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
                    
                    let selectedMovies;
                    if (moviesListType === 'all') 
                        selectedMovies = [...movies];
                    if (moviesListType === 'featured') 
                        selectedMovies = featuredMovies;
                    if (moviesListType === 'favorited') {
                        selectedMovies = favoritedMovies;
                        selectedMovies = movies.filter(movie => {
                            for (let i = 0; i < selectedMovies.length; i++) {
                                if (Object.values(
                                    selectedMovies[i]).indexOf(movie.name) > -1)
                                    return true;
                            }
                            return false;
                        });
                    }
    
                    if (moviesSortingFactor === 'rating') 
                        selectedMovies.sort((movie1, movie2) => {
                            return movie2.rating - movie1.rating;
                        });
                    if (moviesSortingFactor === 'releaseYear')
                        selectedMovies.sort((movie1, movie2) => {
                            return movie2.releaseYear - movie1.releaseYear;
                        });

                    if (moviesFilter !== '') {
                        selectedMovies = selectedMovies.filter(movie => {
                            const regExp = new RegExp(moviesFilter, 'i');
                            return movie.name.match(regExp);
                        });
                    }

                    selectedMovies = selectedMovies.map(movie => {
                        let usersFavorited = 0;
                        for (let i = 0; i < favoritedMovies.length; i++) {
                            if (favoritedMovies[i].name === movie.name) 
                                usersFavorited = 
                                favoritedMovies[i].usersFavorited;
                        }
                        return {
                            ...movie,
                            usersFavorited
                        };
                    });


                    // If there are no movies to display    
                    if (selectedMovies.length === 0) 
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
                                <Col md={4}>
                                    <Form>
                                        <Form.Row>
                                            <Col>
                                                <ListTypeSelect />
                                            </Col>
                                            <Col>
                                                <SortingFactorSelect 
                                                    options={
                                                        [
                                                            {
                                                                text: 'None',
                                                                value: 'none',
                                                                selected: true
                                                            },
                                                            {
                                                                text: 'Rating',
                                                                value: 'rating',
                                                                selected: false
                                                            },
                                                            {
                                                                text: 'Release year',
                                                                value: 'releaseYear',
                                                                selected: false
                                                            }
                                                        ]
                                                    }
                                                    type="movies"
                                                />
                                            </Col>
                                        </Form.Row>
                                        
                                        
                                    </Form>
                                    
                                </Col>
                            </Row>
                            <Row>
                                {selectedMovies.map((movie) => {
                                    return (
                                        <Col key={movie._id}  md={4}>
                                            <ListItemCard 
                                                item={movie} 
                                                itemType="movies"
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
                    const fullSelectedMovies = movies.map(movie => {
                        let usersFavorited = 0;
                        for (let i = 0; i < favoritedMovies.length; i++) {
                            if (favoritedMovies[i].name === movie.name) 
                                usersFavorited = 
                                favoritedMovies[i].usersFavorited;
                        }
                        return {
                            ...movie,
                            usersFavorited
                        };
                    });
                    const movie = fullSelectedMovies.find(
                        
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

                <Route exact path="/actors" render={() => {
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
                
                    let selectedActors = [...actors];

                    // if (actorsSortingFactor === 'none') 
                    //     selectedActors = [...actors];

                    if (actorsSortingFactor === 'birthCountry') {
                        selectedActors.sort((actor1, actor2) => {
                            if (actor1.birthCountry > actor2.birthCountry)
                                return 1;
                            if (actor1.birthCountry === actor2.birthCountry)
                                return 0;
                            if (actor1.birthCountry < actor2.birthCountry)
                                return -1;
                        });
                    }

                    if (actorsSortingFactor === 'birthDate')
                        selectedActors.sort((actor1, actor2) => {
                            const actor1BirthYear = new Date(
                                actor1.birthDate).getFullYear();
                            const actor2BirthYear = new Date(
                                actor2.birthDate).getFullYear();
                            return actor2BirthYear - actor1BirthYear;
                        });

                    if (actorsFilter !== '') {
                        selectedActors = selectedActors.filter(actor => {
                            const regExp = new RegExp(actorsFilter, 'i');
                            return actor.name.match(regExp);
                        });
                    }

                    // If there are no actors to display    
                    if (selectedActors.length === 0) 
                        return (
                            <>
                                
                                <div className="actors-container" />
                            </>
                        );

                    return (
                        <>
                            
                            <Row 
                                className="actors-container 
                                movies-container
                                justify-content-md-center"
                            >
                                <Col md={2}>
                                    <Form>
                                        <Form.Row>
                                            <Col>
                                                <SortingFactorSelect 
                                                    options={
                                                        [
                                                            {
                                                                text: 'None',
                                                                value: 'none',
                                                                selected: true
                                                            },
                                                            {
                                                                text: 'Birth date',
                                                                value: 'birthDate',
                                                                selected: false
                                                            },
                                                            {
                                                                text: 'Birth country',
                                                                value: 'birthCountry',
                                                                selected: false
                                                            }
                                                        ]
                                                    }
                                                    type="actors"
                                                />
                                            </Col>
                                        </Form.Row>

                                    </Form>
                                
                                </Col>
                            </Row>
                            <Row>
                                {selectedActors.map((actor) => {
                                    
                                    return (
                                        <Col key={actor._id}  md={4}>
                                            <ListItemCard 
                                                item={actor} 
                                                itemType="actors"
                                            />
                                        </Col>
                                    );
                                })};
                            </Row>;
                        </>
                    );
                }} />

                <Route path="/actors/:id" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!token) return showLogin();

                    const actor = actors.find(
                        
                        actor => {
                            // console.log(movie)
                            return actor._id === match.params.id;
                        }); 

                    return (
                        <>
                                
                            <Row className="justify-content-md-center">
                                <Col 
                                    id="actor-view" 
                                    className="view" md={6}>    
                                    <ActorView 
                                        actor={actor}  
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