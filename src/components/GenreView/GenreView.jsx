/************* Modules *************/

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

/************* Components **************/

import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';
import {makeTextReadable, rootPath} from '../../utils/helpers';

import './genre-view.scss';

const GenreView = ({
    onBackClick,  
    match,
    movies,
    selectedMovie
}) => { 
    // If the list of movies is empty
    // stop execution of function
    // as is is needed for component to function properly
    if (movies.length === 0)
        return null;  
        
    // Find genre based on id param in url    
    const selectedGenre = movies.find(
        ({genre}) => {
            return genre.name 
                    === match.params.name;
        }).genre;
       
    // Filter movies to find other movies from the same genre
    const otherMovies = movies.filter((movie) => {
        return movie.name 
                !== selectedMovie.name 
            && movie.genre.name === 
                selectedGenre.name;
    });

    return (
        <Row className="justify-content-center">
            <Col 
                id="genre-view" 
                className="view" 
                md={6}
            >   
                <div className="heading-box--no-image" >
                    <div className="close-box">
                        <svg /* X icon */
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
                {/* Only show other movies section 
                   if list of otherMovies from the genre 
                   is not empty  */}                   
                {otherMovies.length > 0
                    ? (<>
                        <div className="related-attributes">
                            <h3>Other {selectedGenre.name} Movies</h3>
                            {/* Display list of other movies 
                            from the genre */}
                            {
                                otherMovies.map((movie, i) =>    
                                {
                                    return <RelatedAttributeCard 
                                        key={i}
                                        image={movie.image} 
                                        description={<Link 
                                            to={`${rootPath}/movies/${movie._id}`}
                                        >
                                            <p>{movie.name}</p>
                                        </Link>} 
                                    />;
                                })  
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
    match: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    movies: state.movies,
    selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps)(GenreView);