import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap';

import {addFocusedClass, removeFocusedClass} from '../../utils/helpers';
import '../../utils/partials/_form.scss';
import './registration-view.scss';

const RegistrationView = ({setRegistration, setUser}) => {
    const [birthDate, setBirthDate] = useState('');
    const [birthDateError, setBirthDateError] = useState(false);
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        document.body.style.backgroundColor = '#0376E3';
        return () => {
            document.body.style.backgroundColor = '#1B1D24';
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error values
        setBirthDateError(false);
        setPasswordMatchError(false);

        // Make sure passwords match
        if (password1 !== password2) {
            setPasswordMatchError(false);
            return;
        }

        const user = {
            password1,
            email,
            username            
        };

        // Check if birthDate was entered and if it is valid
        // if it is add it to user object       
        if (!validateBirthDate()) return;
        user['birthDate'] = birthDate;

        setUser(user);
        setRegistration();
    };

    const onChangeBirthDate = (e) => {
        setBirthDate(e.target.value);
        validateBirthDate(e.target.value);
    };

    const onChangePassword1 = (e) => {
        setPassword1(e.target.value);
        setPasswordMatchError(false);
        if (password2 !== '' && (e.target.value !== password2)) 
            setPasswordMatchError(true);
    };

    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
        setPasswordMatchError(false);
        if (password1 !== '' && (password1 !== e.target.value)) 
            setPasswordMatchError(true);
    };

    const validateBirthDate = (birthdate=birthDate) => {        
        const regex = /\d\d\d\d-\d\d-\d\d/; // valid date format
        if (!birthdate.match(regex)) {            
            setBirthDateError(`${birthdate} is not a valid date. 
                Please enter a date in this format: yyyy-mm-dd`
            );
            return false;
        } else if (birthdate && birthdate.match(regex)) {
            setBirthDateError(null);
            return true;
        }
    };

    return (
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
                        id="username"
                        type="text" 
                        placeholder="Enter your username" 
                        onBlur={
                            (e) => removeFocusedClass(e)
                        } 
                        onFocus={
                            (e) => addFocusedClass(e)
                        }
                        onChange={(e) => setUsername(e.target.value)} 
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
                        id="birth-date"
                        type="text" 
                        placeholder="2021-05-10"
                        onBlur={
                            (e) => removeFocusedClass(e)
                        } 
                        onFocus={
                            (e) => addFocusedClass(e)
                        } 
                        onChange={(e) => onChangeBirthDate(e)} 
                        value={birthDate} 
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
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
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
                                className="feather feather-mail"
                            >
                                <path 
                                    d="M4 4h16c1.1
                                    0 2 .9 2 2v12c0
                                    1.1-.9 2-2 2H4c-1.1
                                    0-2-.9-2-2V6c0-1.1.9-2
                                    2-2z">
                                </path>
                                <polyline points="22,6 12,13 2,6"></polyline>
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
                        id="password1"
                        type="password" 
                        onBlur={
                            (e) => removeFocusedClass(e)
                        } 
                        onFocus={
                            (e) => addFocusedClass(e)
                        }
                        onChange={(e) => onChangePassword1(e)} 
                        placeholder="Enter your password"
                        value={password1}
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
                        id="password2"
                        type="password" 
                        onBlur={
                            (e) => removeFocusedClass(e)
                        } 
                        onFocus={
                            (e) => addFocusedClass(e)
                        }
                        onChange={(e) => onChangePassword2(e)} 
                        placeholder="Enter your password again"
                        value={password2}
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
            {passwordMatchError 
                ? (<p className="error">Passwords must match</p>)
                : null
            }              
            <div className="btn-container">
                <Button type="submit">Register</Button>
            </div>            
        </Form>
    );
};

RegistrationView.propTypes = {
    setRegistration: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};

export default RegistrationView;