import React, {useState} from 'react';
import {Form, FormControl,  InputGroup, Nav,Navbar} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './main-navbar.scss';

const MainNavbar = ({isUserLoggedIn, view}) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Navbar 
            id="main-navbar" 
            expand="lg" 
            className={`${!isUserLoggedIn ? 'logged-out': 'logged-in'}`}
        >
            <Navbar.Brand href="/" 
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
                
                
             
                        {view === 'MovieView' || view === 'MainView'
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
                                        onChange={(e) => setSearchTerm(
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
                            <Nav.Link 
                                href="/logout" 
                                className="link logout"
                            >
                                Logout
                            </Nav.Link>
                        </Nav>
                        <Nav className="nav-links">
                            <Nav.Link 
                                href="/account" 
                                className="link"
                            >
                            Account
                            </Nav.Link>
                            <Nav.Link href="/" className={
                                `link ${view === 'MainView' 
                                || view === 'MovieView' ? 'active': ''}`}
                            >
                            Movies
                            </Nav.Link>
                            <Nav.Link 
                                href="/about" 
                                className="link"
                            >
                                About
                            </Nav.Link>
                        </Nav>
                   
                    </Navbar.Collapse>
                </>
                : null
            }
        </Navbar>
    );
};

MainNavbar.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
    view: PropTypes.string
};

export default MainNavbar;