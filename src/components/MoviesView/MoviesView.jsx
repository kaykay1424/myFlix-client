/************ Modules *************/

import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/************ Components *************/

import ListItemCard from '../ListItemCard/ListItemCard';
import ListTypeSelect from '../ListTypeSelect/ListTypeSelect';
import Message from '../Message/Message';
import SortingFactorSelect from '../SortingFactorSelect/SortingFactorSelect';

import '../../utils/partials/_view.scss';

const MoviesView = ({
    error,
    errorType,
    favoritedMovies,
    featuredMovies,
    movies, 
    moviesFilter,
    moviesListType,
    moviesSortingFactor,
}) => {
   
    let content;
    // if there is an error loading the movies    
    if (error && errorType === 'error') {
        content = (
            <Message 
                message={error} type={errorType} />
        );
    // If there are no movies to display    
    } else if (error && errorType === 'info') {
        content = (<Message 
            message={error} type={errorType} />);
    // If there are movies to display          
    } else {   
        let originalSelectedMovies; // will not be sorted
        let selectedMovies;

        // Select list type

        // Select all movies
        if (moviesListType === 'all') {
            originalSelectedMovies = [...movies];
            selectedMovies = [...movies];
        }

        // Select featured movies
        if (moviesListType === 'featured') {
            originalSelectedMovies = [...featuredMovies];
            selectedMovies = [...featuredMovies];
        }

        // Select favorited movies
        if (moviesListType === 'favorited') {
            originalSelectedMovies = [...favoritedMovies];
            selectedMovies = [...favoritedMovies];
        }

        // Sort list if needed

        // If no sorting factor is selected, use original selected list
        if (moviesSortingFactor === 'none') {
            selectedMovies = [...originalSelectedMovies];
        }
    
        // Sort movies by rating
        if (moviesSortingFactor === 'rating') 
            selectedMovies.sort((movie1, movie2) => {
                return movie2.rating - movie1.rating;
            });
        
        // Sort movies by releaseYear    
        if (moviesSortingFactor === 'releaseYear')
            selectedMovies.sort((movie1, movie2) => {
                return movie2.releaseYear - movie1.releaseYear;
            });

        // Filter movies by search term
        if (moviesFilter !== '') {
            selectedMovies = selectedMovies.filter(movie => {
                const regExp = new RegExp(moviesFilter, 'i');
                return movie.name.match(regExp);
            });
        }

        // Add usersFavorited property to selected movies
        // (not needed for favoritedMovies)
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

        content = (
            <>
                        
                <Row 
                    className="justify-content-center"
                >
                    <Col md={5} sm={6} lg={4} xl={4}>
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
                <Row className="view-row justify-content-center">
                    {/* Display list of movies */}
                    {selectedMovies.map((movie) => {
                        return (
                            <Col key={movie._id} md={6} lg={4}>
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
    }

    return (
        <Row className="movies-container 
    justify-content-center"
        >
            <Col>
                {content}
            </Col>
        
        </Row>
    );
     
};

MoviesView.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    errorType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    favoritedMovies: PropTypes.array.isRequired,
    featuredMovies: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired, 
    moviesFilter: PropTypes.string.isRequired,
    moviesListType: PropTypes.string.isRequired,
    moviesSortingFactor: PropTypes.string.isRequired,
    
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

export default connect(mapStateToProps)(MoviesView);