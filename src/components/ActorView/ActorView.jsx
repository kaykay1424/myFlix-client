import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    addUserFavoriteActor
} from '../../actions/actions';
import {makeTextReadable} from '../../utils/helpers';
import {addToList} from '../../utils/helpers';
import '../../utils/partials/_view.scss';
import './actor-view.scss';

const ActorView = ({
    actor,
    addUserFavoriteActor,
    onBackClick, 
    user}) => {   

    const [favorited, setFavorited] = useState(false);
    
    const addToFavoritesList = () => {
        addToList(
            user.id, 
            'favorite-actors', 
            actor._id, 
            'actor_id').then(() => {
            setFavorited(true);
            addUserFavoriteActor(actor._id);
        });
    };

    return (
        <>
            <div 
                className="image-cover" 
                style={
                    {
                        backgroundImage: `url(${actor.image})`
                    }
                }
            >
                <div className="close-box">
                    <svg 
                        onClick={
                            () => onBackClick()
                        }                            
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
                <h1>
                    {actor.name}
                    <div className="user-list-icons">
                        <svg 
                            onClick={() => addToFavoritesList()}
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className={`feather feather-heart 
                            ${favorited 
                                || (user.favoriteActors 
                                    && user.favoriteActors.indexOf(
                                        actor._id) > -1) 
                                ? 'added-to-list': ''}`
                            }
                            title="Add this actor to your Favorite Movies list"
                        >
                            <path 
                                d="M20.84 4.61a5.5
                                5.5 0 0 0-7.78 
                                0L12 5.67l-1.06-1.06a5.5 
                                5.5 0 0 0-7.78 7.78l1.06 
                                1.06L12 21.23l7.78-7.78 
                                1.06-1.06a5.5 5.5 0 0 0 
                                0-7.78z"
                            >
                            </path>
                        </svg>                        
                    </div>
                </h1>
                <p className="label">Description</p>
                <p className="description">{makeTextReadable(actor.bio)}</p>
                <p className="label">Birthday</p>
                <p className="description">
                    {
                        new Date(actor.birthDate).toDateString()
                    }
                </p>
                <p className="label">Birth country</p>
                <p className="description">{actor.birthCountry}</p>
            </div>                      
            <div className="attributes">
                <div className="attribute">
                    <p className="label">Occupations</p>
                    {actor.occupations.join(', ')}
                </div>
                <div className="attribute">
                    <p className="label">Stars in</p>
                    {actor.starsIn.join(', ')}
                </div>
            </div>    
            <div className="source-container">
                <a 
                    href={actor.imdbLink} 
                    target="_blank"
                    rel="noreferrer"
                >
                    Source
                </a>
            </div> 
        </>              
    );
};

ActorView.propTypes = {
    actor: PropTypes.object.isRequired,
    addUserFavoriteActor: PropTypes.func.isRequired,
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number,
        releaseYear: PropTypes.number,
        stars: PropTypes.array
    }).isRequired,
    movieActors: PropTypes.array.isRequired,
    onBackClick: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
    setSelectedMovie: PropTypes.func.isRequired,
    setFavoritedMovies: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        favoriteActors: PropTypes.array.isRequired
    })
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {
    addUserFavoriteActor})(ActorView);

