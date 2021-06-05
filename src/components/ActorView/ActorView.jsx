/************* Modules ***********/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

/************* Helpers ************/

import {makeTextReadable} from '../../utils/helpers';
import {addToList} from '../../utils/helpers';

import {
    addUserFavoriteActor
} from '../../actions/actions';

const ActorView = ({
    actors,
    addUserFavoriteActor,
    match,
    onBackClick, 
    user
}) => {   
    // If the list of actors is empty
    // stop execution of function
    // as is is needed for component to function properly 
    if (actors.length === 0) 
        return null;
    const [favorited, setFavorited] = useState(false);

    // Find actor based on id param in url
    const actor = actors.find(                
        actor => {
            return actor._id === match.params.id;
        }); 

    // Add actor to user's favorite actors list
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

    // remove 3 letter abbreviation for day of week from date string
    let birthDate = new Date(actor.birthDate).toDateString();
    birthDate = birthDate.slice(3,birthDate.length); 

    return (
        <Row className="justify-content-center">
            <Col 
                id="actor-view" 
                className="view" md={6}>    
                <div 
                    className="heading-box" 
                    style={
                        {
                            backgroundImage: `url(${actor.image})`
                        }
                    }
                >
                    <div className="close-box">
                        <svg /* X icon */
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
                    <h1 className="main-heading">
                        {actor.name}
                        <div className="user-list-icons">
                            <svg /* Heart icon */
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
                                className={`feather feather-heart ${favorited 
                                || (user.favoriteActors 
                                    && user.favoriteActors.indexOf(
                                        actor._id) > -1) 
                                    ? 'added-to-list': ''}`
                                }                                
                            >
                                <title>
                                    Add this actor to your Favorite Actors list
                                </title>
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
                    <p className="label">Bio</p>
                    <div className="description">
                        {makeTextReadable(actor.bio)}
                    </div>
                    <p className="label">Birthday</p>
                    <p className="description">{birthDate}
                    </p>
                    <p className="label">Birth country</p>
                    <p className="description">{actor.birthCountry}</p>
                </div>                      
                <div className="attributes">
                    <div className="attribute">
                        <p className="label">Occupations</p>
                        <p 
                            className="description"
                        >
                            {actor.occupations.join(', ')}
                        </p>
                    </div>
                    <div className="attribute">
                        <p className="label">Stars in</p>
                        <p 
                            className="description"
                        >
                            {actor.starsIn.join(', ')}
                        </p>
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
            </Col>
        </Row>             
    );    
};

ActorView.propTypes = {
    actors: PropTypes.array.isRequired,
    addUserFavoriteActor: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    onBackClick: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        favoriteActors: PropTypes.array.isRequired
    })
};

const mapStateToProps = state => ({
    actors: state.actors,
    user: state.user
});

export default connect(mapStateToProps, {
    addUserFavoriteActor})(ActorView);

