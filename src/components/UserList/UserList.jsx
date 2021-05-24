import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {createExcerpt} from '../../utils/helpers';
import './user-list.scss';
const UserList = ({title, listType, userId, token, itemIdType}) => {
    const [list, setList] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(
            `https://my-flix-2021.herokuapp.com/users/${userId}/${listType}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => {
            setList(response.data);
        });
    },[]);

    const addItemsToListLink = () => {
        const listTypeString = listType.replace(/-/g, ' ');
        if (listTypeString.match(/movies/i)) {
            return <p>
                Add some 
                <Link to="/">movies</Link> 
                to your <span className="list-type">
                    {listTypeString}
                </span> list!
            </p>;
        } else if (listTypeString.match(/actors/i)) {
            return <p>
                Add some 
                <Link to="/actors">actors</Link> 
                to your <span className="list-type">
                    {listTypeString}</span> list!
            </p>;
        }
    };

    const removeListItem = (itemId) => {
        const data = {};
        data[itemIdType] = itemId;
        axios({
            method: 'delete',
            url: `https://my-flix-2021.herokuapp.com/users/
            ${userId}/${listType}/${itemId}`,
            data,
            headers:  {Authorization: `Bearer ${token}`}
        }).then(() => {
            const newList = list.filter(listItem => {
                return listItem._id !== itemId;
            });
            setList(newList);
        }).catch(err => {
            setError(err);
        });
    };

    return (
        <div className="user-list">
            <h4 className="heading">{title}</h4>
            <ul>
                {list && list.length > 0 ? list.map((item) => {
                    return (
                        <li className="user-list-item" key={item._id}>
                            <div className="details">
                                <p>
                                    <Link to={`${
                                        listType.match(/movies/i) 
                                            ? `/movies/${item._id}` 
                                            : `/actors/${item._id}`}`}
                                    >
                                        {item.name}
                                    </Link>
                                </p>
                                <p className="description">{
                                    createExcerpt(
                                        item.description)} &hellip;
                                </p>
                            </div>
                            <svg 
                                onClick={() => removeListItem(item._id)}
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
                        </li>
                    );
                })
                    : addItemsToListLink()
                }
            </ul>
            {error 
                ? 
                <p 
                    className="error"
                >There was an error removing that item from your {listType}.</p>
                : null
            }
        </div>
    );
};

UserList.propTypes = {
    title: PropTypes.string.isRequired, 
    listType: PropTypes.string.isRequired, 
    userId: PropTypes.string.isRequired, 
    token: PropTypes.string.isRequired, 
    itemIdType: PropTypes.string.isRequired
};

export default UserList;