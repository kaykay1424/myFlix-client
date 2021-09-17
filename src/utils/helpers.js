import axios from 'axios';
import parse from 'html-react-parser';

export const rootPath = '/myFlix-client';

export const addToList = (userId, listType, itemId, itemIdType) => {
    const token = localStorage.getItem('token'),
        data = {};
    data[itemIdType] = itemId;
    return axios({
        method: 'patch',
        // eslint-disable-next-line max-len
        url: `https://my-flix-2021.herokuapp.com/users/${userId}/${listType}/${itemId}`,
        data,
        headers:  {Authorization: `Bearer ${token}`}
    });
};

export const createExcerpt = (description) => {
    return description.slice(0, 45);
};

// Break long text into readable paragraphs
export const makeTextReadable = (text) => {
    const textArray = text.split('');
    textArray.unshift('<p>');
    const indexesArray = [];
    let numParagraphs = 0;

    for (let i = 0; i < textArray.length; i++) {        
        // Add a paragraph after every 5 sentences
        if (textArray[i] === '.' && textArray[i+1] === ' ') {
            numParagraphs++;
            if (numParagraphs === 5) {
                indexesArray.push(i+1);
                numParagraphs = 0;
                textArray.splice(i+1, 0, '</p><p>');
            }
        }
        
    }
   
    return parse(textArray.join('')); // render as html
};

export const addFocusedClass = (e) => {
    const element = e.target;
    // make container surrounding svg icon match .form-control
    // when .form-control is focused
    element.nextSibling.classList.add('focused'); 
    element.nextSibling.firstChild.firstChild.classList.add('focused');
};

export const removeFocusedClass = (e) => {
    const element = e.target;
    // make container surrounding svg icon match .form-control
    // when .form-control is focused
    element.nextSibling.classList.remove('focused'); 
    element.nextSibling.firstChild.firstChild.classList.remove('focused');
};

/********** Form Validation **********/
// Make date appear in readable format (2021-05-01)
export const convertBirthDate = (birthdate) => {
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

export const validateBirthDate = (birthdate) => {   
    const regex = /\d\d\d\d-\d\d-\d\d/; // valid date format

    // If birthday is not valid
    if (!birthdate.match(regex)) return false; 
    else return true;   
};

export const validatePasswords = (password1, password2) => {
    // If both passwords don't match
    return (password1 !== '' && (password1 !== password2))
        ? false
        : true;
};

export const validateUsername = (username) => {
    const errors = {
        length: false,
        type: false
    };
    
    // Check that username is at least 6 characters
    // and only contains alphanumeric characters
    if (username.length < 6) errors.length = true;     
    const nonAlphaCharacters = username.match(/\W/g);
            
    // If there are non alphabetical characters 
    // make sure that they are only numbers
    if (nonAlphaCharacters) {
        for (let i = 0; i < nonAlphaCharacters.length; i++) {
            if (!nonAlphaCharacters[i].match(/\d/))
                errors.type = true;
            break;
        }
    } 

    return errors;
};