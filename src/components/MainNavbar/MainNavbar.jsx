/************ Modules *************/

import React, {useEffect, useState} from 'react';
import {Form, FormControl,  InputGroup, Nav,Navbar} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {rootPath} from '../../utils/helpers';

import {
    setActorsFilter, 
    setActorsSortingFactor,
    setMoviesFilter,
    setMoviesListType,
    setMoviesSortingFactor
} from '../../actions/actions';

import './main-navbar.scss';

const MainNavbar = ({
    onLogout, 
    setActorsFilter,
    setActorsSortingFactor, 
    setMoviesFilter, 
    setMoviesListType,
    setMoviesSortingFactor,
    user
}) => {
    const loggedIn = user ? true : false;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(loggedIn);
    
    const  pathname = useLocation().pathname;
 
    // Clear search term from searchbar when page changes
    useEffect(() => {
        setSearchTerm('');
        setActorsFilter('');
        setMoviesFilter('');
        setMoviesListType('all');
        setActorsSortingFactor('none');
        setMoviesSortingFactor('none');
        
    },[pathname]);

    useEffect(() => {
        setIsUserLoggedIn(loggedIn);
    },[user]);

    const onChangeSearchTerm = (value) => {
        setSearchTerm(value);
        if (pathname === `${rootPath}/movies`)
            setMoviesFilter(value);
        else if (pathname === `${rootPath}/actors`)
            setActorsFilter(value);
    };

    return (
        <Navbar 
            id="main-navbar" 
            expand="lg" 
            className={`${!isUserLoggedIn ? 'logged-out': 'logged-in'}`}
        >
            <Navbar.Brand to={`${rootPath}/movies`} 
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

                        {pathname === `${rootPath}/movies` || pathname === `${rootPath}/actors`
                            ?                                  
                            <Form className="mx-auto" inline>
                                <InputGroup className="input-container">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="search-bar">
                                            <svg /* Search icon */
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
                                        onChange={
                                            (e) => onChangeSearchTerm(
                                                e.target.value)
                                        } 
                                        value={searchTerm} 
                                        aria-label="Search &hellip;"
                                        aria-describedby="search-bar"
                                    />
                                </InputGroup>                           
                            </Form>
                            : null
                        }
                        <Nav> 
                            <Navbar.Text 
                                className="link nav-link logout"
                                onClick={() =>  {
                                    onLogout('/login');
                                }}
                            >
                                Logout
                            </Navbar.Text>
                        </Nav>
                        <Nav className="nav-links">
                            <Link 
                                to={`${rootPath}/profile`} 
                                className={
                                    `link nav-link ${pathname === `${rootPath}/profile` 
                                        ? 'active': ''}`}
                            >
                            Profile
                            </Link>
                            <Link to={`${rootPath}/movies`} className={
                                `link nav-link ${
                                    pathname === `${rootPath}/movies` 
                                        ? 'active': ''}`}
                            >
                            Movies
                            </Link>
                            <Link to={`${rootPath}/actors`} className={
                                `link nav-link ${pathname === `${rootPath}/actors`
                                    ? 'active': ''}`}
                            >
                            Actors
                            </Link>
                            <Link 
                                to={`${rootPath}/about`} 
                                className=
                                    {
                                        `link nav-link ${pathname === `${rootPath}/about`
                                            ? 'active': ''}`
                                    }
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
    onLogout: PropTypes.func.isRequired,
    setActorsFilter: PropTypes.func.isRequired,
    setActorsSortingFactor: PropTypes.func.isRequired,
    setMoviesFilter: PropTypes.func.isRequired,
    setMoviesListType: PropTypes.func.isRequired,
    setMoviesSortingFactor: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, {
    setActorsFilter,
    setActorsSortingFactor,
    setMoviesFilter,
    setMoviesListType,
    setMoviesSortingFactor
})(MainNavbar);