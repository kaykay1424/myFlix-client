/************ Modules *************/

import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Col, Form, FormControl, InputGroup, Row} from 'react-bootstrap';

import {
    addFocusedClass, 
    removeFocusedClass,
    validateBirthDate,
    validatePasswords,
    validateUsername,
    rootPath
} from '../../utils/helpers';

import './registration-view.scss';

const RegistrationView = ({history}) => {
    const [birthDateError, setBirthDateError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [usernameLengthError, setUsernameLengthError] = useState(false);
    const [usernameTypeError, setUsernameTypeError] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error values so errors will be removed, 
        // until the errors occur again
        setRegistrationError(false);

        // If there are errors stop submitting form
        if (
            passwordMatchError 
            || usernameLengthError 
            || usernameTypeError 
            || birthDateError
        ) {
            return;
        }

        const birthDate = e.target[1].value,
            password1 = e.target[3].value,
            newUser = {
                email: e.target[2].value,
                password: password1,
                username: e.target[0].value            
            };

        // Check if birthDate was entered
        // if it is add it to user object       
        if (birthDate !== '') newUser['birthDate'] = birthDate;
        
 
        axios.post('https://my-flix-2021.herokuapp.com/users', newUser)
            .then(() => {
                history.push(`${rootPath}/login`);               
            }, (err) => {
                setRegistrationError(err);
            });
    };

    const onChangeBirthDate = (value) => {
        if (value !== '') {
            const isValid = validateBirthDate(value);
            if (isValid) {
                if (birthDateError) 
                    setBirthDateError(false);
            } else {
                if (!birthDateError) 
                    setBirthDateError(`${value} is not a valid date. 
                    Please enter a date in this format: yyyy-mm-dd`
                    );
            }
        }
        
    };

    const onChangePassword = (password1, password2) => {

        const isValid = validatePasswords(
            password1, 
            password2);
        if (isValid) {
            if (passwordMatchError) 
                setPasswordMatchError(false);
        } else {
            if (!passwordMatchError) 
                setPasswordMatchError(true); 
        }
    };

    const onChangeUsername = (value) => {        
        // Check that username is at least 6 characters
        // and only contains alphanumeric characters
        if (value  !== '') {
            const errors = validateUsername(value);
            
            if (errors.length) {
                if (!usernameLengthError) setUsernameLengthError(true);
            } else {
                if (usernameLengthError) setUsernameLengthError(false);
            }

            if (errors.type) {
                if (!usernameTypeError) setUsernameTypeError(true);
            } else {
                if (usernameTypeError) setUsernameTypeError(false);
            }
        }
    };

    return (<Row 
        id="registration-view" 
        className="justify-content-center view-row--form">
        <Col className="form-container" sm={6} md={4}>
            <Form 
                id="registration-form" 
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1>Great to Meet you!</h1>
                <Form.Text className="label">Create an account</Form.Text>
                <Form.Group controlId="username">
                    <Form.Label className="form-label">
                    Username*
                    </Form.Label>
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
                            onChange={(e) => onChangeUsername(e.target.value)}  
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
                                    className="feather feather-newUser"
                                >
                                    <path 
                                        d="M20 21v-2a4
                                    4 0 0 0-4-4H8a4 
                                    4 0 0 0-4 4v2"
                                    >                                    
                                    </path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="birth-date">
                    <Form.Label className="form-label">Birthday</Form.Label>
                    <InputGroup  
                        className={`input-container 
                        ${birthDateError ? 'error' : ''}`
                        }
                    >
                        <FormControl
                            type="text" 
                            placeholder="2021-05-10"
                            onBlur={
                                (e) => removeFocusedClass(e)
                            } 
                            onFocus={
                                (e) => addFocusedClass(e)
                            } 
                            onChange={(e) => onChangeBirthDate(e.target.value)} 
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <svg /* Calendar icon */ 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="feather feather-calendar"
                                >
                                    <rect 
                                        x="3" 
                                        y="4" 
                                        width="18" 
                                        height="18" 
                                        rx="2" ry="2">
                                    </rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email*</Form.Label>
                    <InputGroup 
                        className="input-container"> 
                        <FormControl 
                            id="email"
                            type="email" 
                            placeholder="me@gmail.com" 
                            onBlur={
                                (e) => removeFocusedClass(e)
                            } 
                            onFocus={
                                (e) => addFocusedClass(e)
                            }
                            required
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <svg /* Mail icon */
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="feather feather-mail"
                                >
                                    <path 
                                        d="M4 4h16c1.1
                                    0 2 .9 2 2v12c0
                                    1.1-.9 2-2 2H4c-1.1
                                    0-2-.9-2-2V6c0-1.1.9-2
                                    2-2z">
                                    </path>
                                    <polyline 
                                        points="22,6 12,13 2,6">
                                    </polyline>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="password1">
                    <Form.Label className="form-label">Password*</Form.Label>
                    <InputGroup  
                        className={
                            `input-container ${passwordMatchError 
                                ? 'error' 
                                : ''
                            }`
                        }
                    >
                        <FormControl 
                            type="password" 
                            onBlur={
                                (e) => removeFocusedClass(e)
                            } 
                            onFocus={
                                (e) => addFocusedClass(e)
                            }
                            onChange={(e) =>  
                                onChangePassword(
                                    e.target.parentElement.
                                        parentElement.nextSibling.
                                        lastChild.firstChild.value, 
                                    e.target.value
                                )} 
                            placeholder="Enter your password"
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
                                        ry="2">
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
                <Form.Group controlId="password2">
                    <InputGroup 
                        className={
                            `input-container ${passwordMatchError 
                                ? 'error' 
                                : ''
                            }`
                        } 
                    >
                        <FormControl 
                            type="password" 
                            aria-label="retype password"
                            onBlur={
                                (e) => removeFocusedClass(e)
                            } 
                            onFocus={
                                (e) => addFocusedClass(e)
                            }
                            onChange={(e) => {
                                onChangePassword(
                                    e.target.parentElement.
                                        parentElement.previousSibling.
                                        lastChild.firstChild.value, 
                                    e.target.value);
                            }} 
                            placeholder="Enter your password again"
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
                                        ry="2">
                                    </rect>
                                    <path 
                                        d="M7 11V7a5 5
                                    0 0 1 10 0v4">
                                    </path>
                                </svg>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                {birthDateError 
                    ? (<p className="error">{birthDateError}</p>)
                    : null
                }
                {usernameLengthError 
                    ? (<p className="error">
                    Username must be at least 6 characters long.
                    </p>)
                    : null
                }
                {usernameTypeError 
                    ? (<p className="error">
                    Username must only contain alphanumeric characters.
                    </p>)
                    : null
                }
                {passwordMatchError 
                    ? (<p className="error">Passwords must match.</p>)
                    : null
                } 
                {registrationError 
                    ? (<p className="error">There was an error.
                    Please try again.</p>)
                    : null
                }             
                <div className="btn-container">
                    <Button type="submit">Register</Button>
                </div>            
            </Form>
        </Col>                    
    </Row>
    );
};

RegistrationView.propTypes = {
    history: PropTypes.object.isRequired
};

export default RegistrationView;