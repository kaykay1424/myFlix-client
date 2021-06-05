import axios from 'axios';
import parse from 'html-react-parser';

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

