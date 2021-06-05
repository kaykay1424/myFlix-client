/************* Modules *************/

import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import {makeTextReadable} from '../../utils/helpers';

import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';

const DirectorView = ({
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
    
    // Find director based on id param in url
    const selectedDirector = movies.find(
        ({director}) => 
            director.name === match.params.name).director; 
    
    // Filter movies to find other movies directed by the director            
    const  otherMovies=movies.filter((movie) => {
        return movie.name 
                !== selectedMovie.name 
            && movie.director.name === 
                selectedDirector.name;
    });
    
    return (
        <Row className="justify-content-center">
            <Col 
                id="director-view" 
                className="view" 
                md={6}
            >    
                <div className="heading-box--no-image">
                    <div className="close-box">
                        <svg /* X icon */
                            onClick={() => onBackClick('selectedDirector')} 
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
                    <h1>{selectedDirector.name}</h1>
                    <p className="label">Biography</p>
                    <div 
                        className="description"
                    >
                        {makeTextReadable(selectedDirector.bio)}
                    </div>
                </div>                      
                <div className="attributes">
                    <div className="attribute">
                        <p className="label">Born</p>
                        <p>{selectedDirector.birthYear}</p>
                    </div>
                    {/* Only show death info 
                    if director has deathYear attribute */}
                    {selectedDirector.deathYear 
                        ? 
                        <div className="attribute">
                            <p className="label">Died</p>
                            <p>{selectedDirector.deathYear}</p>
                        </div>
                        : null
                    }
                </div> 
                {/* Only show other movies section 
                   if list of otherMovies directed by director is not empty  */}
                {otherMovies.length > 0
                    ? (<>
                    
                        <div className="related-attributes">
                            <h3>Other {selectedDirector.name} Movies</h3>
                            {/* Display list of other movies 
                            directed by director */}
                            {
                                otherMovies.map((movie, i) => 
                                    (
                                        <RelatedAttributeCard 
                                            key={i}
                                            image={movie.image} 
                                            description={<Link 
                                                to={`/movies/${movie._id}`}>
                                                <p>{movie.name}</p>
                                            </Link>} 
                                        />
                                    )
                                )  
                            }
                        </div>
                    </>)
                    : null
                }
                <div className="source-container">
                    <a 
                        href={selectedDirector.imdbLink} 
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

DirectorView.propTypes = {
    match: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.object.isRequired,    
    onBackClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    movies: state.movies,
    selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps)(DirectorView);