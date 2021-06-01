import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import '../../utils/partials/_view.scss';
import './director-view.scss';
import {makeTextReadable} from '../../utils/helpers';
import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';

const DirectorView = ({
    onBackClick, 
    match,
    movies,
    selectedMovie
}) => { 
    const selectedDirector = movies.find(
        ({director}) => 
            director.name === match.params.name).director; 
                
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
                <div className="image-cover" >
                    <div className="close-box">
                        <svg 
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
                    {selectedDirector.deathYear 
                        ? 
                        <div className="attribute">
                            <p className="label">Died</p>
                            <p>{selectedDirector.deathYear}</p>
                        </div>
                        : null
                    }
                </div> 
                {otherMovies.length > 0
                    ? (<>
                    
                        <div className="related-attributes">
                            <h3>Other {selectedDirector.name} Movies</h3>
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
    match: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    selectedMovie: PropTypes.object.isRequired,
    selectedDirector: PropTypes.shape({
        bio: PropTypes.string.isRequired,
        birthYear: PropTypes.number.isRequired,
        deathYear: PropTypes.number,
        imdbLink: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    otherMovies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    movies: state.movies,
    selectedMovie: state.selectedMovie
});

export default connect(mapStateToProps)(DirectorView);