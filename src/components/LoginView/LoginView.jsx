import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap';

import {addFocusedClass, removeFocusedClass} from '../../utils/helpers';
import '../../utils/partials/_form.scss';
import './login-view.scss';

const LoginView = ({setUser, onRegistrationClick}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = '#0376E3';
        return () => {
            document.body.style.backgroundColor = '#1B1D24';
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            password
        };

        setUser(user);
    };

    return (  
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
                    <Form.Label className="form-label">Username</Form.Label>
                    <InputGroup 
                        className="input-container">                        
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
                                <svg 
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
                                    >                                    
                                    </path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="password" className="form-group">
                    <Form.Label className="form-label" >Password</Form.Label>
                    <InputGroup 
                        className="input-container">                        
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
                                <svg 
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
            <div className="btn-container">
                <Button 
                    type="button" 
                    onClick={onRegistrationClick}
                >
                    Register
                </Button>
            </div>  
        </>
    );
};

LoginView.propTypes = {
    onRegistrationClick: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};

export default LoginView;