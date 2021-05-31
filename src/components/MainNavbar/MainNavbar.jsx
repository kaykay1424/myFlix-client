import React, {useState} from 'react';
import {Form, FormControl,  InputGroup, Nav,Navbar} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';

import {setMoviesFilter} from '../../actions/actions';
import './main-navbar.scss';

const MainNavbar = ({setMoviesFilter}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const isUserLoggedIn = localStorage.getItem('token') ? true : false,
        pathname = useLocation().pathname;

    const onChangeSearchTerm = (value) => {
        setSearchTerm(value);
        setMoviesFilter(value);
    };

    return (
        <Navbar 
            id="main-navbar" 
            expand="lg" 
            className={`${!isUserLoggedIn ? 'logged-out': 'logged-in'}`}
        >
            <Navbar.Brand to="/" 
                className={`logo link ${!isUserLoggedIn 
                    ? 'logged-out'
                    : 'logged-in'
                }`}
            >
                myFlix
            </Navbar.Brand>
            {isUserLoggedIn
                ?
                <>
                    <Navbar.Toggle aria-controls="main-navbar-collapse" />
                
                    <Navbar.Collapse 
                        id="main-navbar-collapse"
                    > 
                
                
             
                        {pathname === '/' || pathname === '/actors'
                            ?                                  
                            <Form className="mx-auto" inline>
                                <InputGroup className="input-container">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="search-bar">
                                            <svg 
                                                xmlns="
                                                    http://www.w3.org/2000/svg" 
                                                width="24" 
                                                height="24" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                className="feather 
                                                    feather-search"
                                            >
                                                <circle 
                                                    cx="11" 
                                                    cy="11" 
                                                    r="8"
                                                >    
                                                </circle>
                                                <line 
                                                    x1="21" 
                                                    y1="21" 
                                                    x2="16.65" 
                                                    y2="16.65"
                                                >
                                                </line>
                                            </svg>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Search &hellip;" 
                                        onChange={(e) => onChangeSearchTerm(e.target.value)} 
                                        value={searchTerm} 
                                        aria-label="Search &hellip;"
                                        aria-describedby="search-bar"
                                    />
                                </InputGroup>                           
                            </Form>
                            : null
                        }
                        <Nav> 
                            <Link 
                                to="/logout" 
                                className="link nav-link logout"
                            >
                                Logout
                            </Link>
                        </Nav>
                        <Nav className="nav-links">
                            <Link 
                                to="/profile" 
                                className={
                                    `link nav-link ${pathname === '/profile' 
                                        ? 'active': ''}`}
                            >
                            Profile
                            </Link>
                            <Link to="/" className={
                                `link nav-link ${
                                    pathname === '/' 
                                    || pathname.match('movies')
                                    ? 'active': ''}`}
                            >
                            Movies
                            </Link>
                            <Link to="/actors" className={
                                `link nav-link ${pathname.match('actors') 
                                    ? 'active': ''}`}
                            >
                            Actors
                            </Link>
                            <Link 
                                to="/about" 
                                className={`link nav-link ${pathname === '/about'
                                ? 'active': ''}`}
                            >
                                About
                            </Link>
                        </Nav>
                   
                    </Navbar.Collapse>
                </>
                : null
            }
        </Navbar>
    );
};

MainNavbar.propTypes = {
    setMoviesFilter: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, {setMoviesFilter})(MainNavbar);