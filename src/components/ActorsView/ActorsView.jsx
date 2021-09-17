/************* Modules ***************/

import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/************** Components ************/

import ListItemCard from '../ListItemCard/ListItemCard';
import Message from '../Message/Message';
import SortingFactorSelect from '../SortingFactorSelect/SortingFactorSelect';

import '../../utils/partials/_view.scss';

const ActorsView = ({
    actors,
    actorsFilter,
    actorsSortingFactor,
    error,
    errorType
}) => {
    let content;
    // if there is an error loading the actors
    if (error && errorType === 'error') {
        content = (
            <Message 
                message={error} type={errorType} />
        );
    // If there are no actors to display    
    } else if (error && errorType === 'info') {
        content = (<Message 
            message={error} type={errorType} />);
    // If there are actors to display    
    } else {             
        let selectedActors = [...actors];
        
        // Sort actors by their birth country
        if (actorsSortingFactor === 'birthCountry') {
            selectedActors.sort((actor1, actor2) => {
                if (actor1.birthCountry > actor2.birthCountry)
                    return 1;
                if (actor1.birthCountry === actor2.birthCountry)
                    return 0;
                if (actor1.birthCountry < actor2.birthCountry)
                    return -1;
            });
        }

        // Sort actors by their birthday
        if (actorsSortingFactor === 'birthDate')
            selectedActors.sort((actor1, actor2) => {
                const actor1BirthYear = new Date(
                    actor1.birthDate).getFullYear();
                const actor2BirthYear = new Date(
                    actor2.birthDate).getFullYear();
                return actor2BirthYear - actor1BirthYear;
            });

        // Filter actors by search term     
        if (actorsFilter !== '') {
            selectedActors = selectedActors.filter(actor => {
                const regExp = new RegExp(actorsFilter, 'i');
                return actor.name.match(regExp);
            });
        }

        content = (
            <>                            
                <Row 
                    className="
                justify-content-center"
                >
                    <Col sm={4} md={3} lg={2}>
                        <Form>
                            <Form.Row>
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
                                                    text: 'Birth date',
                                                    value: 'birthDate',
                                                    selected: false
                                                },
                                                {
                                                    text: 'Birth country',
                                                    value: 'birthCountry',
                                                    selected: false
                                                }
                                            ]
                                        }
                                        type="actors"
                                    />
                                </Col>
                            </Form.Row>
                        </Form>                                
                    </Col>
                </Row>
                <Row className="view-row justify-content-center">
                    {/* Display list of actors */}
                    {selectedActors.map(
                        (actor) => {                                    
                            return (
                                <Col key={actor._id} md={6} lg={4}>
                                    <ListItemCard 
                                        item={actor} 
                                        itemType="actors"
                                    />
                                </Col>
                            );
                        })};
                </Row>;
            </>
        );
    }

    return (
        <Row className="actors-container 
        movies-container
        justify-content-center"
        >
            <Col className="container-col">
                {content}
            </Col>
            
        </Row>
    );
};

ActorsView.propTypes = {
    actors: PropTypes.array.isRequired,
    actorsFilter: PropTypes.string.isRequired,
    actorsSortingFactor: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    errorType: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
};

const mapStateToProps = state => ({
    actors: state.actors,
    actorsFilter: state.actorsFilter,
    actorsSortingFactor: state.actorsSortingFactor
});

export default connect(mapStateToProps)(ActorsView);