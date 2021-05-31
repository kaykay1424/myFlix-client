import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {makeTextReadable} from '../../utils/helpers';
import '../../utils/partials/_view.scss';
import './genre-view.scss';
import RelatedAttributeCard from '../RelatedAttributeCard/RelatedAttributeCard';

const GenreView = ({
    selectedGenre, 
    onBackClick, 
    onItemClick, 
    otherMovies}) => {    
    return (
        <>
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
                <p className="description">{makeTextReadable(selectedGenre.description)}</p>
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
        </>              
    );
};

GenreView.propTypes = {
    selectedGenre: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    otherMovies: PropTypes.array.isRequired
};

export default GenreView;