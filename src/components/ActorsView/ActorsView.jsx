import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ListItemCard from '../ListItemCard/ListItemCard';
import Message from '../Message/Message';
import SortingFactorSelect from '../SortingFactorSelect/SortingFactorSelect';
import '../../utils/partials/_view.scss';

const ActorsView = ({
    actors,
    actorsFilter,
    actorsSortingFactor,
    error
}) => {
    let content;
    // if there is an error loading the actors
    if (error) {
        content = (
            <Message 
                message="The list of actors could not be loaded. 
                Please try again" 
                type="error" />
        );
        // If there are no actors to display    
    } else if (actors.length === 0) {
        content = (<Message 
            message="There are no actors to display." type="info" />);
    } else {             
        let selectedActors = [...actors];
   
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

        if (actorsSortingFactor === 'birthDate')
            selectedActors.sort((actor1, actor2) => {
                const actor1BirthYear = new Date(
                    actor1.birthDate).getFullYear();
                const actor2BirthYear = new Date(
                    actor2.birthDate).getFullYear();
                return actor2BirthYear - actor1BirthYear;
            });

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
                justify-content-md-center"
                >
                    <Col md={2}>
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
                <Row className="view-row">
                    {selectedActors.map((actor) => {
                                    
                        return (
                            <Col key={actor._id}  md={4}>
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
        justify-content-md-center"
        >
            <Col>
                {content}
            </Col>
            
        </Row>
    );
};

ActorsView.propTypes = {
    actors: PropTypes.array.isRequired,
    actorsFilter: PropTypes.string.isRequired,
    actorsSortingFactor: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    actors: state.actors,
    actorsFilter: state.actorsFilter,
    actorsSortingFactor: state.actorsSortingFactor
});

export default connect(mapStateToProps)(ActorsView);