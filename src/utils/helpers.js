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

