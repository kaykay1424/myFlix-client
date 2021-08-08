/************ Modules *************/

import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Col, Form, FormControl, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import {
    convertBirthDate,
    validateBirthDate,
    validatePasswords,
    validateUsername
} from '../../utils/helpers';
import {
    logoutUser,
    setUserInfo
} from '../../actions/actions';

import UserList from '../UserList/UserList';

import './profile-view.scss';

const ProfileView = ({onLogout, setUserInfo, user}) => {
    // If user has not been set
    // stop execution of function
    // as is is needed for component to function properly
    if (!user)
        return null;
 
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [successfulUserRemoval, setSuccessfulUserRemoval] = useState(false);

    const [birthDateError, setBirthDateError] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [updateProfileError, setUpdateProfileError] = useState(false);
    const [usernameLengthError, setUsernameLengthError] = useState(false);
    const [usernameTypeError, setUsernameTypeError] = useState(false);

    const token = localStorage.getItem('token');

    const deleteUser = () => {
        confirm('Are you sure you want to delete your account?')
            ?
            axios({
                method: 'delete',
                url: `https://my-flix-2021.herokuapp.com/users/${user._id}`,
                headers:  {Authorization: `Bearer ${token}`}
            }).then(() => {
                setSuccessfulUserRemoval(true);
                setTimeout(() => {
                    setSuccessfulUpdate(false);
                    onLogout('/register'); 
                }, 3000);
            }).catch(() => {
                setDeleteUserError(true);
            }) 
            :null;
    };
     
    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error values so errors will be removed, 
        // until the errors occur again
        setDeleteUserError(false);
        setUpdateProfileError(false);

        // If there are errors stop submitting form
        if (
            passwordMatchError 
            || usernameLengthError 
            || usernameTypeError 
            || birthDateError
        ) {
            return;
        }

        const birthDate = e.target[1].value;
        const newPassword1 = e.target[3].value;
        const newPassword2 = e.target[4].value;
        const updatedUser = {
            email: e.target[2].value,
            password: newPassword1 !== '' 
            || newPassword2 !== '' 
                ? newPassword1 : user.password,
            username: e.target[0].value            
        };

        // Check if birthDate was entered
        // if it is add it to user object       
        if (birthDate !== '') updatedUser['birthDate'] = birthDate;
          
        axios({
            method: 'patch',
            url: `https://my-flix-2021.herokuapp.com/users/${user._id}`,
            data: updatedUser,
            headers:  {Authorization: `Bearer ${token}`}
        })
            .then(() => {
                setUserInfo(updatedUser);
                setSuccessfulUpdate(true); 
                
                setTimeout(() => {
                    setSuccessfulUpdate(false);
                    // If user updates their password, log them out
                    if (newPassword1 !== '') {
                        onLogout('/login');     
                    }
                }, 3000);            
            }, (err) => {
                setUpdateProfileError(err);
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

    return (
        <Row className="justify-content-center profile-container">
            <Col 
                id="profile-view" 
                className="form-container" 
                sm={12}
                md={8}
            >
                <Row>
                    <Col>
                        <h1>Personal Info</h1>
                    </Col>
                </Row>
                <Row>
                
                    <Col sm={6} md={6}>
                
                        <Form 
                            id="edit-profile-form" 
                            onSubmit={(e) => handleSubmit(e)}
                        >                
                            <Form.Group>
                                <Form.Label className="form-label">
                                Username
                                </Form.Label>
                                <FormControl
                                    id="username"
                                    type="text" 
                                    placeholder="Enter your username" 
                                    onChange={(e) => 
                                        onChangeUsername(e.target.value)} 
                                    defaultValue={user.username} 
                                    required
                                />      
                            </Form.Group>
                            <Form.Group>
                                <Form.Label 
                                    className="form-label"
                                >
                                Birthday
                                </Form.Label>
                                <FormControl
                                    id="birth-date"
                                    className={`input-container 
                                    ${birthDateError ? 'error' : ''}`
                                    }
                                    type="text" 
                                    placeholder="2021-05-10" 
                                    onChange={(e) => 
                                        onChangeBirthDate(e.target.value)} 
                                    defaultValue={user.birthDate 
                                        ? convertBirthDate(user.birthDate) : ''}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <FormControl 
                                    id="email"
                                    type="email" 
                                    placeholder="me@gmail.com"   
                                    defaultValue={user.email} 
                                    required
                                />   
                            </Form.Group>        
                            <Form.Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label 
                                            className="form-label"
                                        >
                                        New Password
                                        </Form.Label>
                                        <FormControl 
                                            id="newPassword1"
                                            type="password" 
                                            className={
                                                `input-container ${
                                                    passwordMatchError 
                                                        ? 'error' : ''
                                                }`
                                            } 
                                            onChange={
                                                (e) => onChangePassword(
                                                    e.target.parentElement.
                                                        parentElement
                                                        .nextSibling.
                                                        lastChild.
                                                        lastChild.value, 
                                                    e.target.value)
                                            } 
                                            placeholder="
                                            Enter your new password"
                                        />                            
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label 
                                            className="form-label"
                                        >
                                        Repeat Password
                                        </Form.Label>
                                        <FormControl 
                                            id="newPassword2"
                                            type="password" 
                                            className={
                                                `input-container ${
                                                    passwordMatchError 
                                                        ? 'error' : ''
                                                }`
                                            } 
                                            onChange={
                                                (e) => onChangePassword(
                                                    e.target.parentElement.
                                                        parentElement.
                                                        previousSibling.
                                                        lastChild.
                                                        lastChild.value, 
                                                    e.target.value)
                                            } 
                                            placeholder="
                                            Enter your password again"
                                        />                            
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            {usernameLengthError 
                                ? (<p className="error">
                                Username must be at least 6 characters long.
                                </p>)
                                : null
                            }
                            {usernameTypeError 
                                ? (<p className="error">
                                Username must only contain 
                                alphanumeric characters.
                                </p>)
                                : null
                            }
                            {birthDateError 
                                ? (<p className="error">{birthDateError}</p>)
                                : null
                            }
                            {passwordMatchError 
                                ? (<p className="error">
                                    Passwords must match.
                                </p>)
                                : null
                            } 
                            {updateProfileError 
                                ? (<p className="error">
                                There was an error updating your profile. 
                                Please try again.</p>)
                                : null
                            } 
                            {successfulUpdate 
                                ? 
                                (<p className="text-info">
                                    Your profile was updated successfully!
                                </p>
                                )   
                                : null
                            }            
                            <div className="btn-container">
                                <Button type="submit">Save Settings</Button>
                            </div>            
                        </Form>
                    </Col>
                    <Col sm={6} md={6}>
                        <UserList 
                            title="Favorite Movies" 
                            listType='favorite-movies'
                            listTypeCamelCase='favoriteMovies' 
                            userId={user._id} 
                            itemIdType="movie_id" 
                            token={token} 
                        />
                        <UserList 
                            title="To Watch Movies" 
                            listType='to-watch-movies' 
                            listTypeCamelCase='toWatchMovies'
                            userId={user._id} 
                            itemIdType="movie_id" 
                            token={token} 
                        />
                        <UserList 
                            title="Favorite Actors" 
                            listType='favorite-actors' 
                            listTypeCamelCase='favoriteActors'
                            userId={user._id} 
                            itemIdType="actor_id" 
                            token={token} 
                        />
                    </Col>
                </Row> 
                <Row className="justify-content-end">
                    <Col xs={12} sm={4} md={5}>
                        <div className="delete-user-container">
                            <svg /* Trash icon */
                                onClick={() => deleteUser()}
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="feather feather-trash"
                            >
                                <polyline points="3 6 5 6 21 6">
                                </polyline>
                                <path 
                                    d="M19 6v14a2 2 0 0 
                                1-2 2H7a2 2 0 0 1-2-2V6m3
                                0V4a2 2 0 0 1 2-2h4a2 
                                2 0 0 1 2 2v2"
                                >
                                </path>
                            </svg>
                            <span>Delete Account</span>
                        </div>
                        {successfulUserRemoval 
                            ? 
                            (<p className="text-info">
                            Your account was successfully deleted!</p>)   
                            : null
                        } 
                        {deleteUserError
                            ? 
                            (<p className="error">
                                Your account could not be deleted. 
                                Please try again</p>)   
                            : null
                        }
                    </Col>
                </Row> 
            </Col>
        </Row>
    );
};

ProfileView.propTypes = {
    onLogout: PropTypes.func.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    user: PropTypes.shape({
        _id: PropTypes.string,
        birthDate: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        username: PropTypes.string
    })
};

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps, {
    logoutUser,
    setUserInfo
})(ProfileView);