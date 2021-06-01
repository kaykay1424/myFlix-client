import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ListItemCard from '../ListItemCard/ListItemCard';
import ListTypeSelect from '../ListTypeSelect/ListTypeSelect';
import Message from '../Message/Message';
import SortingFactorSelect from '../SortingFactorSelect/SortingFactorSelect';
import './movies-view.scss';

const MoviesView = ({
    favoritedMovies,
    featuredMovies,
    movies, 
    moviesFilter,
    moviesListType,
    moviesSortingFactor,
    error
}) => {
    
    let content;
    // if there is an error loading the movies
    if (error) {
        content = (
            <Message 
                message="The list of movies could not be loaded. 
                Please try again" type="error" />
        );
        // If there are no movies to display    
    } else if (movies.length === 0) {
        content = (<Message 
            message="There are no movies to display." type="info" />);
    } else {   
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
    favoritedMovies: PropTypes.array.isRequired,
    featuredMovies: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired, 
    moviesFilter: PropTypes.string.isRequired,
    moviesListType: PropTypes.string.isRequired,
    moviesSortingFactor: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
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