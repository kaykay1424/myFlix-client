import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import '../../utils/partials/_view.scss';
import './director-view.scss';
import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';

const DirectorView = ({
    selectedDirector, 
    onBackClick, 
    onItemClick, 
    otherMovies}) => {   
    return (
        <>
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
                <p className="description">{selectedDirector.bio}</p>
            </div>                      
            <div className="attributes">
                <div className="attribute">
                    <p className="label">Birth Year</p>
                    <p>{selectedDirector.birthYear}</p>
                </div>
                {selectedDirector.deathYear 
                    ? 
                    <div className="attribute">
                        <p className="label">Death Year</p>
                        <p>{selectedDirector.deathYear}</p>
                    </div>
                    : null
                }
            </div> 
            {otherMovies.length > 0
                ? (<>
                    <h3>Other {selectedDirector.name} Movies</h3>
                    <div className="related-attributes">
                        
                        {
                            otherMovies.map((movie, i) => 
                                (
                                    <RelatedAttributeCard 
                                        key={i}
                                        image={movie.image} 
                                        description={<Link 
                                            to={`/movies/${movie._id}`}>
                                            <p 
                                                onClick={() => 
                                                    onItemClick(
                                                        'selectedMovie', movie)}
                                            >
                                                {movie.name}
                                            </p>
                                        </Link>} 
                                    />
                                )
                            )  
                        }
                    </div>
                </>)
                : null
            }
        </>              
    );
};

DirectorView.propTypes = {
    selectedDirector: PropTypes.shape({
        bio: PropTypes.string.isRequired,
        birthYear: PropTypes.number.isRequired,
        deathYear: PropTypes.number,
        name: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    otherMovies: PropTypes.array.isRequired
};

export default DirectorView;