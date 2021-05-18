import React from 'react';
import PropTypes from 'prop-types';

import '../../utils/partials/_view.scss';
// import './director-view.scss';
import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';

const GenreView = ({selectedGenre, onBackClick, otherMovies}) => {    
    return (
        <>
            <div className="image-cover" >
                <div className="close-box">
                    <svg 
                        onClick={() => onBackClick('selectedGenre')} 
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
                <p className="description">{selectedGenre.description}</p>
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
                                    description={<p>{movie.name}</p>} />;})  
                        }
                    </div>
                </>)
                : null
            }
        </>              
    );
};

GenreView.propTypes = {
    name: PropTypes.string.isRequired,
    selectedGenre: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired,
    otherMovies: PropTypes.array.isRequired
};

export default GenreView;