import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import {makeTextReadable} from '../../utils/helpers';
import '../../utils/partials/_view.scss';
import './genre-view.scss';
import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';

const GenreView = ({
    onBackClick, 
    onItemClick, 
    match,
    movies,
    selectedMovie
}) => {    
    const selectedGenre = movies.find(
        ({genre}) => {
            return genre.name 
                    === match.params.name;
        }).genre;
    const otherMovies = movies.filter((movie) => {
        return movie.name 
                !== selectedMovie.name 
            && movie.genre.name === 
                selectedGenre.name;
    });
    return (
        <Row className="justify-content-md-center">
            <Col 
                id="genre-view" 
                className="view" 
                md={6}
            >   
                <div className="image-cover" >
                    <div className="close-box">
                        <svg 
                            onClick={() => onBackClick()} 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="feather feather-x"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
                <div className="main-content">
                    <h1>{selectedGenre.name}</h1>
                    <p className="label">Description</p>
                    <p 
                        className="description"
                    >
                        {makeTextReadable(selectedGenre.description)}
                    </p>
                </div>                      
                {otherMovies.length > 0
                    ? (<>
                        <div className="related-attributes">
                            <h3>Other {selectedGenre.name} Movies</h3>
                            {
                                otherMovies.map((movie, i) => 
                                    
                                {
                                    return <RelatedAttributeCard 
                                        key={i}
                                        image={movie.image} 
                                        description={<Link 
                                            to={`/movies/${movie._id}`}
                                        >
                                            <p 
                                                onClick={
                                                    () => onItemClick(
                                                        'selectedMovie', movie)
                                                }
                                            >
                                                {movie.name}
                                            </p>
                                        </Link>} 
                                    />;})  
                            }
                        </div>
                    </>)
                    : null
                }
                <div className="source-container">
                    <a 
                        href={selectedGenre.wikipediaLink} 
                        target="_blank"
                        rel="noreferrer"
                    >
                    Source
                    </a>
                </div> 
            </Col>
        </Row>             
    );
};

GenreView.propTypes = {
    match: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.object.isRequired,
    selectedGenre: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    otherMovies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    movies: state.movies,
    selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps)(GenreView);