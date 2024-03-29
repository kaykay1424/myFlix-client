import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {rootPath} from '../../utils/helpers';

import './about-view.scss';

const AboutView = () => {
    return (
        <Row id="AboutView" className="justify-content-center">
            <Col className="view" sm={8} md={5}>
                <h1 className="text-center">Welcome to myFlix!</h1>
                <p className="description">
                Feel free to browse and sort 
                    <Link to={`${rootPath}/movies`}> movies </Link> 
                and <Link to={`${rootPath}/actors`}> actors </Link>
                and add them to your favorites 
                or to-watch lists. You can visit your 
                    <Link to={`${rootPath}/profile`}> profile </Link> 
                to view those lists 
                as well as edit your profile info.
                </p>
            </Col>                    
        </Row>
    );
};

export default AboutView;