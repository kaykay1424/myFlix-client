/************ Modules *************/

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, Col, Form, FormControl, InputGroup, Row} from 'react-bootstrap';

import {addFocusedClass, removeFocusedClass, rootPath} from '../../utils/helpers';

import './login-view.scss';

const LoginView = ({onLoggedIn}) => {
    const [loginError, setLoginError] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset value so error will be removed, 
        // until the error occurs again
        setLoginError(false); 
        
        axios.post('https://my-flix-2021.herokuapp.com/login',{
            username,
            password
        })
            .then(response => { 
                onLoggedIn(response.data);               
            }).catch(() => {
                setLoginError(true);
            });
    };

    return (  
        <Row id="login-view" className="justify-content-center view-row--form">
            <Col className="form-container" sm={6} md={4}>
                <>            
                    <Form 
                        id="login-form" 
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <h1>Great to Meet you!</h1>
                        <Form.Text 
                            className="label"
                        >
                        Login to your account
                        </Form.Text>
                        <Form.Group controlId="email">
                            <Form.Label 
                                className="form-label">Username</Form.Label>
                            <InputGroup 
                                className="input-container"
                            >                        
                                <FormControl 
                                    type="text" 
                                    placeholder="Enter your username"
                                    onBlur={
                                        (e) => removeFocusedClass(e)
                                    } 
                                    onFocus={
                                        (e) => addFocusedClass(e)
                                    }
                                    onChange={
                                        (e) => setUsername(e.target.value)
                                    } 
                                    value={username} 
                                    required
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <svg /* User icon */
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" 
                                            height="24" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className="feather feather-user"
                                        >
                                            <path 
                                                d="M20 21v-2a4
                                                4 0 0 0-4-4H8a4 4
                                                0 0 0-4 4v2"
                                            // eslint-disable-next-line max-len
                                            >                                    
                                            </path>
                                            <circle 
                                                cx="12" 
                                                cy="7" 
                                                r="4">
                                            </circle>
                                        </svg>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="password" className="form-group">
                            <Form.Label 
                                className="form-label"
                            >
                                Password
                            </Form.Label>
                            <InputGroup 
                                className="input-container"
                            >                        
                                <FormControl 
                                    type="password" 
                                    onBlur={
                                        (e) => removeFocusedClass(e)
                                    } 
                                    onFocus={
                                        (e) => addFocusedClass(e)
                                    }
                                    onChange={
                                        (e) => setPassword(e.target.value)
                                    } 
                                    placeholder="Enter your password"
                                    value={password}
                                    required 
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <svg /* Lock icon */
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" 
                                            height="24" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className="feather feather-lock"
                                        >
                                            <rect 
                                                x="3" 
                                                y="11" 
                                                width="18" 
                                                height="11" 
                                                rx="2" 
                                                ry="2"
                                            >                                
                                            </rect>
                                            <path 
                                                d="M7 11V7a5 5
                                            0 0 1 10 0v4"
                                            >
                                            </path>
                                        </svg>
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <div className="btn-container">
                            <Button type="submit">Login</Button>
                        </div>            
                    </Form>
                    {loginError 
                        ? (<p className="error">There was an error.
                        Please try again.</p>)
                        : null
                    }   
                    <div className="btn-container">
                        <Link to={`${rootPath}/register`}>
                            <Button 
                                type="button" 
                            >
                            Register
                            </Button>
                        </Link>
                    </div>  
                </>
            </Col>
        </Row>          
    );
};

LoginView.propTypes = {
    history: PropTypes.object,
    onLoggedIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(LoginView);