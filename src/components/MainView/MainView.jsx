/************ Modules **************/

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

/************ Components ************/

import GenreView from '../GenreView/GenreView';
import DirectorView from '../DirectorView/DirectorView';
import MovieCard from '../MovieCard/MovieCard';
import MovieView from '../MovieView/MovieView';
import LoginView from '../LoginView/LoginView';
import RegistrationView from '../RegistrationView/RegistrationView';

import './main-view.scss';

class MainView extends React.Component {
    state = {
        registration: false,
        error: null,
        movies: [],
        selectedDirector: null,
        selectedGenre: null,
        selectedMovie: null,
        user: null  
    }

    componentDidMount() {
        if (window.location.pathname === '/logout')
            return this.logoutUser();
        
        const token = localStorage.getItem('token');
        if (token) {        
            this.setState({
                user: localStorage.getItem('user')
            });
            this.setNavbarAttributes(true);
            this.getMovies(localStorage.getItem('token'));
        } else {
            this.setNavbarAttributes(false);
        }
    }

    getMovies = (token) => {
        axios.get('https://my-flix-2021.herokuapp.com/movies',{
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                this.setError(error);
            });
    }
    
    handleBackClick = (selected) => {
        this.setState({
            [selected]: null
        });
    }
    
    handleItemClick = (typeOfItem, itemSelected) => {
        this.setState({
            [typeOfItem]: itemSelected
        });
    }

    logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({
            user: null
        });
        this.setNavbarAttributes(false);
        window.open('/', '_self');
    }
   
    setError = (error) => {
        this.setState({
            error
        });
    }

    setNavbarAttributes = (isUserLoggedIn) => {        
        if (isUserLoggedIn) {
            this.props.setNavbar(true, 'MovieView');
        } else {
            this.props.setNavbar(false);
        }
    }

    setUser = ({token, user}) => { 
        this.setState({
            user: user.username
        });   
        localStorage.setItem('token', token);
        localStorage.setItem('user', user.username);
        this.setNavbarAttributes(true);
        this.getMovies(token);    
    }

    render() {
        const {
            error, 
            movies, 
            selectedDirector, 
            selectedGenre,
            selectedMovie, 
            user
        } = this.state;

        const showLogin = () => {
            return (
                <Row className="justify-content-md-center">
                    <Col className="form-container" md={5}>
                        <LoginView 
                            setUser={this.setUser} 
                        />
                    </Col>
                </Row>
            );
        };
        
        return (
            <Router>                
                <Route exact path="/" render={() => {
                    // If user is not logged in, show login view
                    if (!user) return showLogin();
                    // if there is an error loading the movies
                    if (error) {
                        return (
                            <Row className="justify-content-md-center">
                                <Col md="5"> 
                                    <div>
                                        An error has occurred. 
                                        Please try again.
                                    </div>
                                </Col>
                            </Row>
                        );
                    }     

                    // If there are no movies to display    
                    if (movies.length === 0) 
                        return <div className="movies-container" />;

                    return <Row 
                        className="movies-container justify-content-md-center"
                    >
                        {movies.map((movie) => {
                            return (
                                <Col key={movie._id}  md={4}>
                                    <MovieCard 
                                        movie={movie} 
                                        onItemClick={this.handleItemClick}  
                                    />
                                </Col>
                            );
                        })};
                    </Row>;
                }} />
             
                <Route path="/register" render={() => {
                    if (user) return <Redirect to="/" />;
                    return <Row className="justify-content-md-center">
                        <Col className="form-container" md={5}>
                            <RegistrationView />
                        </Col>                    
                    </Row>;
                }} />

                <Route path="/movies/:id" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!user) return showLogin();
                    return <Row className="justify-content-md-center">
                        <Col className="view" md={6}>    
                            <MovieView 
                                selectedMovie={movies.find(
                                    movie => {
                                        return movie._id === match.params.id;
                                    })      
                                }  
                                onItemClick={this.handleItemClick}
                                onBackClick={() => history.goBack()} 
                            />
                        </Col>
                    </Row>;
                }} />

                <Route path="/genres/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!user) return showLogin();
                    return <Row className="justify-content-md-center">
                        <Col id="genre-view" className="view" md={6}>    
                            <GenreView 
                                onItemClick={this.handleItemClick}
                                selectedGenre={movies.find(
                                    ({genre}) => {
                                        return genre.name 
                                            === match.params.name;
                                    }).genre
                                } 
                                otherMovies={movies.filter((movie) => {
                                    return movie.name !== selectedMovie.name 
                                        && movie.genre.name === 
                                            selectedGenre.name;
                                })}
                                onBackClick={() => history.goBack()} 
                            />
                        </Col>
                    </Row>;
                }} />

                <Route path="/directors/:name" render={({history, match}) => {
                    // If user is not logged in, show login view
                    if (!user) return showLogin();
                    return <Row className="justify-content-md-center">
                        <Col id="director-view" className="view" md={6}>    
                            <DirectorView
                                onItemClick={this.handleItemClick} 
                                selectedDirector={movies.find(
                                    ({director}) => 
                                        director.name 
                                        === match.params.name).director
                                } 
                                otherMovies={movies.filter((movie) => {
                                    return movie.name !== selectedMovie.name 
                                        && movie.director.name === 
                                            selectedDirector.name;
                                })}
                                onBackClick={() => history.goBack()} 
                            />
                        </Col>
                    </Row>;
                }} />                
            </Router>
        );               
    }   
}

MainView.propTypes = {
    setNavbar: PropTypes.func.isRequired
};

export default MainView;