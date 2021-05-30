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
import '../../utils/partials/_form.scss';
import './profile-view.scss';

const ProfileView = ({onLogout, user}) => {

    // Make date appear in readable format (2021-05-01)
    // const date = new Date(response.data.birthDate);
    // const birthdate = `${
    //     date.getFullYear()}-${
    //     date.getMonth() < 10 
    //         ? `0${date.getMonth()+1}`
    //         : date.getMonth()+1}-${date.getDate()}`;

    const [birthDate, setBirthDate] = useState(
        user.birthDate ? user.birthDate : '');    
    const [email, setEmail] = useState(user.email);
    const oldPassword = user.password;
    const [username, setUsername] = useState(user.username);
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [successfulRemoval, setSuccessfulRemoval] = useState(false);

    const [birthDateError, setBirthDateError] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [updateProfileError, setUpdateProfileError] = useState(false);
    const [usernameLengthError, setUsernameLengthError] = useState(false);
    const [usernameTypeError, setUsernameTypeError] = useState(false);

    const token = localStorage.getItem('token');

    const deleteUser = () => {
        confirm('Are you sure you want to delete your account')
            ?
            axios({
                method: 'delete',
                url: `https://my-flix-2021.herokuapp.com/users/${user.id}`,
                headers:  {Authorization: `Bearer ${token}`}
            }).then(() => {
                setSuccessfulRemoval(true);
                setTimeout(() => {
                    onLogout();
                }, 3000);
            }).catch(() => {
                setDeleteUserError(true);
            }) 
            :null;
    };
     
    const handleSubmit = (e) => {
        e.preventDefault();
        // Reset error values
        setBirthDateError(false);
        setPasswordMatchError(false);

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
        if (!validateBirthDate()) return;
        updatedUser['birthDate'] = birthDate;

        axios({
            method: 'patch',
            url: `https://my-flix-2021.herokuapp.com/users/${user.id}`,
            data: updatedUser,
            headers:  {Authorization: `Bearer ${token}`}
        })
            .then(() => {
                setUserInfo(updatedUser);
                if (newPassword1) {
                    logoutUser();
                    window.open('/', '_self');                
                }

                setSuccessfulUpdate(true);  
                setTimeout(() => {
                    setSuccessfulUpdate(false);
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
        if (newPassword2 !== '' && (e.target.value !== newPassword2)) 
            setPasswordMatchError(true);
    };

    const onChangeNewPassword2 = (e) => {
        setNewPassword2(e.target.value);
        setPasswordMatchError(false);
        if (newPassword1 !== '' && (newPassword1 !== e.target.value)) 
            setPasswordMatchError(true);
    };

    const onChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameLengthError(false);
        setUsernameTypeError(false);
        if (value  !== '') {
            if (value .length < 6) 
                setUsernameLengthError(true);

            const nonAlphaCharacters = value.match(/\W/g);
            // If there are non alphabetical characters 
            // make sure that they are only numbers
            // Username should only contain alphanumeric characters
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
        <>
            <Row>
                <Col>
                    <h1>Personal Info</h1>
                </Col>
            </Row>
            <Row>
                
                <Col>
                
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
                                        placeholder="Enter your password again"
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
                                        placeholder="Enter your password again"
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
                            ? (<p className="error">Passwords must match.</p>)
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
                <Col>
                    <UserList 
                        title="Favorite Movies" 
                        listType='favorite-movies'
                        listTypeJS='favoriteMovies' 
                        userId={user.id} 
                        itemIdType="movie_id" 
                        token={token} 
                    />
                    <UserList 
                        title="To Watch Movies" 
                        listType='to-watch-movies' 
                        listTypeJS='toWatchMovies'
                        userId={user.id} 
                        itemIdType="movie_id" 
                        token={token} 
                    />
                    <UserList 
                        title="Favorite Actors" 
                        listType='favorite-actors' 
                        listTypeJS='favoriteActors'
                        userId={user.id} 
                        itemIdType="actor_id" 
                        token={token} 
                    />
                </Col>
            </Row> 
            <Row className="justify-content-end">
                <Col xs={12} sm={4} md={5}>
                    <div className="delete-user-container">
                        <svg 
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
                    {successfulRemoval 
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
        </>
    );
};

ProfileView.propTypes = {
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        birthDate: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
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