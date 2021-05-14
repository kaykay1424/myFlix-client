import React from 'react';
import axios from 'axios';

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
    }

    handleBackClick = () => {
        this.setState({
            selectedMovie: null
        });
    }
    
    handleMovieClick = (selectedMovie) => {
        this.setState({
            selectedMovie
        });
    }

    handleRegistrationClick = () => {
        this.setState({
            registration: true
        });
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
    }

    render() {
        const {error, movies, registration, selectedMovie, user} = this.state;
        
        // If user needs to create an account, show registration view
        if (registration)
            return (
                <RegistrationView 
                    setRegistration={this.setRegistration} 
                    setUser={this.setUser} 
                />
            );
        // If user is not logged in, show login view
        if (!user)
            return (
                <LoginView 
                    setUser={this.setUser} 
                    onRegistrationClick={this.handleRegistrationClick} 
                />
            );
        // If a user clicks on the read more link to select a movie
        // show movie view
        if (selectedMovie) 
            return (
                <MovieView 
                    selectedMovie={this.state.selectedMovie} 
                    onBackClick={this.handleBackClick} 
                />
            );   
        // if there is an error loading the movies
        if (error) 
            return (
                <div>
                    An error has occurred. 
                    Please try again.
                </div>
            );
        // If there are movies to display
        // show all movies
        if (movies.length > 0) 
            return (
                <div className="movies-container">
                    {this.state.movies.map((movie) => {
                        return (
                            <MovieCard 
                                key={movie._id} 
                                movie={movie} 
                                onMovieClick={this.handleMovieClick}  
                            />
                        );
                    })};
                </div>
            );
        // If there are no movies to display    
        if (movies.length === 0) 
            return <div className="movies-container" />;
        
    }   
}

export default MainView;