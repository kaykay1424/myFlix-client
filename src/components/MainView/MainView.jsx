import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';

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
        axios.get('https://my-flix-2021.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            }, () => {
                this.setState({
                    error: 'An error has occurred. Please try again.'
                });
            }); 
        
        this.setNavbarAttributes();
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

    handleRegistrationClick = () => {
        this.setState({
            registration: true
        });
    }

    setNavbarAttributes = (user=this.state.user) => {        
        if (this.state.selectedMovie && user) {
            this.props.setNavbar(user, 'MovieView');
        }  else if (this.state.movies.length > 0 && user) {
            this.props.setNavbar(user, 'MainView');
        } else {
            this.props.setNavbar(user);
        }
    }

    setRegistration = () => {
        this.setState({
            registration: false
        });
    }

    setUser = (user) => {
        this.setState({
            user
        });
        this. setNavbarAttributes(user);
    }

    render() {
        const {
            error, 
            movies, 
            registration, 
            selectedDirector, 
            selectedGenre,
            selectedMovie, 
            user
        } = this.state;
        // If user needs to create an account, show registration view
        if (registration) {
            return (
                <Row className="justify-content-md-center">
                    <Col className="form-container" md={5}>
                        <RegistrationView 
                            setRegistration={this.setRegistration} 
                            setUser={this.setUser} 
                        />
                    </Col>                    
                </Row>
            );
        }
        // If user is not logged in, show login view
        if (!user) {
            return (
                <Row className="justify-content-md-center">
                    <Col className="form-container" md={5}>
                        <LoginView 
                            setUser={this.setUser} 
                            onRegistrationClick={this.handleRegistrationClick} 
                        />
                    </Col>
                </Row>
            );
        }
        // If a user clicks on the genre link to select a genre
        // show genre view
        if (selectedGenre) {
            // get list of movies other than the selected movie
            // that match the selected genre
            const otherMovies = movies.filter((movie) => {
                return movie.name !== selectedMovie.name 
                    && movie.genre.name === selectedGenre.name;
            });

            return (   
                <Row className="justify-content-md-center">
                    <Col id="director-view" className="view" md={6}>    
                        <GenreView 
                            selectedGenre={selectedGenre} 
                            otherMovies={otherMovies}
                            onBackClick={this.handleBackClick} 
                        />
                    </Col>
                </Row>
            ); 
        }  
        // If a user clicks on the director link to select a director
        // show director view
        if (selectedDirector) {
            // get list of movies other than the selected movie 
            // that are directed by the selected director
            const otherMovies = movies.filter((movie) => {
                return movie.name !== selectedMovie.name 
                    && movie.director.name === selectedDirector.name;
            });
            return (   
                <Row className="justify-content-md-center">
                    <Col id="director-view" className="view" md={6}>    
                        <DirectorView 
                            selectedDirector={selectedDirector} 
                            otherMovies={otherMovies}
                            onBackClick={this.handleBackClick} 
                        />
                    </Col>
                </Row>
            ); 
        }  
        // If a user clicks on the read more link to select a movie
        // show movie view
        if (selectedMovie) {
            return (   
                <Row className="justify-content-md-center">
                    <Col className="view" md={6}>    
                        <MovieView 
                            selectedMovie={selectedMovie} 
                            onItemClick={this.handleItemClick}
                            onBackClick={this.handleBackClick} 
                        />
                    </Col>
                </Row>
            ); 
        }  
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
        // If there are movies to display
        // show all movies
        if (movies.length > 0) {
            return (
                <Row className="movies-container justify-content-md-center">
                    {this.state.movies.map((movie) => {
                        return (
                            <Col key={movie._id}  md={4}>
                                <MovieCard 
                                    movie={movie} 
                                    onItemClick={this.handleItemClick}  
                                />
                            </Col>
                        );
                    })};
                </Row>
            );
        }
        // If there are no movies to display    
        if (movies.length === 0) {
            return <div className="movies-container" />;
        }        
    }   
}

MainView.propTypes = {
    setNavbar: PropTypes.func.isRequired
};

export default MainView;