/************ Modules *************/

import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Button, Col, Form, FormControl, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

import {
    logoutUser,
    setUserInfo
} from '../../actions/actions';

import UserList from '../UserList/UserList';

import './profile-view.scss';

const ProfileView = ({history, onLogout, setUserInfo, user}) => {
    // If user has not been set
    // stop execution of function
    // as is is needed for component to function properly
    if (!user)
        return null;
 
    // Make date appear in readable format (2021-05-01)
    const convertBirthDate = (birthdate) => {
        // If date hasn't been converted to readable format yet         
        if (
            birthdate 
            && birthdate.match('Z')) { 
            return birthdate.slice(0,10);
        // If date has been converted to readable format yet         
        } else if (birthdate 
            && !birthdate.match('Z')) {
            return birthdate;
        }
        // If user doesn't have birthday info
        return '';
    };

    const [birthDate, setBirthDate] = useState(
        convertBirthDate(user.birthDate));    
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [successfulUserRemoval, setSuccessfulUserRemoval] = useState(false);

    const [birthDateError, setBirthDateError] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [updateProfileError, setUpdateProfileError] = useState(false);
    const [usernameLengthError, setUsernameLengthError] = useState(false);
    const [usernameTypeError, setUsernameTypeError] = useState(false);

    const oldPassword = user.password,
        token = localStorage.getItem('token');

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
                    onLogout(); 
                    history.push('/register');
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
        setBirthDateError(false);
        setDeleteUserError(false);
        setPasswordMatchError(false);
        setUpdateProfileError(false);
        setUsernameLengthError(false);
        setUsernameTypeError(false);

        const updatedUser = {
            email,
            password: oldPassword,
            username            
        };

        // Make sure passwords match
        if ((newPassword1 !== '' || newPassword2 !== '') 
            && (newPassword1 !== newPassword2)) {
            setPasswordMatchError(false);
            return;
        } else if ((newPassword1 !== '' || newPassword2 !== '') 
            && (newPassword1 === newPassword2))
            updatedUser['password'] = newPassword1;

        // Check if birthDate was entered and if it is valid
        // if it is add it to user object       
        if (birthDate !== '') {
            if (!validateBirthDate()) return;
            updatedUser['birthDate'] = birthDate;
        }
            
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
                        onLogout();     
                        history.push('/login'); 
                    }
                }, 3000);            
            }, (err) => {
                setUpdateProfileError(err);
            });
    };

    const onChangeBirthDate = (e) => {
        setBirthDate(e.target.value);
        validateBirthDate(e.target.value);
    };

    const onChangeNewPassword1 = (e) => {
        setNewPassword1(e.target.value);
        setPasswordMatchError(false);
        // If both new passwords don't match
        if (newPassword2 !== '' && (e.target.value !== newPassword2)) 
            setPasswordMatchError(true);
    };

    const onChangeNewPassword2 = (e) => {
        setNewPassword2(e.target.value);
        setPasswordMatchError(false);
        // If both new passwords don't match
        if (newPassword1 !== '' && (newPassword1 !== e.target.value)) 
            setPasswordMatchError(true);
    };

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameLengthError(false);
        setUsernameTypeError(false);
        // Check that username is at least 6 characters
        // and only contains alphanumeric characters
        if (value  !== '') {
            if (value.length < 6) 
                setUsernameLengthError(true);

            const nonAlphaCharacters = value.match(/\W/g);
            
            // If there are non alphabetical characters 
            // make sure that they are only numbers
            if (nonAlphaCharacters) {
                for (let i = 0; i < nonAlphaCharacters.length; i++) {
                    if (!nonAlphaCharacters[i].match(/\d/))
                        setUsernameTypeError(true);
                    return;
                }
            }
        }
    };

    const validateBirthDate = (birthdate=birthDate) => {        
        const regex = /\d\d\d\d-\d\d-\d\d/; // valid date format

        // If birthday is not valid
        if (!birthdate.match(regex)) {            
            setBirthDateError(`${birthdate} is not a valid date. 
                Please enter a date in this format: yyyy-mm-dd`
            );
            return false;
        // If birthday is valid
        } else if (birthdate && birthdate.match(regex)) {
            setBirthDateError(false);
            return true;
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
                                    onChange={(e) => onChangeUsername(e)} 
                                    value={username} 
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
                                    onChange={(e) => onChangeBirthDate(e)} 
                                    value={birthDate} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <FormControl 
                                    id="email"
                                    type="email" 
                                    placeholder="me@gmail.com" 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    value={email} 
                                    required
                                />   
                            </Form.Group>
                            <Form.Group>
                                <Form.Label 
                                    className="form-label"
                                >
                                Old Password
                                </Form.Label> 
                                <FormControl 
                                    id="oldPassword"
                                    className="input-container" 
                                    type="password" 
                                    onChange={(e) => onChangeNewPassword1(e)} 
                                    placeholder="Enter your password"
                                    value={oldPassword}
                                    disabled 
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
                                                (e) => onChangeNewPassword1(e)
                                            } 
                                            placeholder="
                                            Enter your password again"
                                            value={newPassword1}
                                         
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
                                                (e) => onChangeNewPassword2(e)
                                            } 
                                            placeholder="
                                            Enter your password again"
                                            value={newPassword2}
                                         
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
    history: PropTypes.object.isRequired,
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