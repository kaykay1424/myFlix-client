import axios from 'axios';

export const addToList = (userId, listType, itemId, itemIdType) => {
    const token = localStorage.getItem('token'),
        data = {};
    data[itemIdType] = itemId;
    return axios({
        method: 'patch',
        url: `https://my-flix-2021.herokuapp.com/users/${userId}/${listType}/${itemId}`,
        data,
        headers:  {Authorization: `Bearer ${token}`}
    });
};

export const createExcerpt = (description) => {
    return description.slice(0, 45);
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

