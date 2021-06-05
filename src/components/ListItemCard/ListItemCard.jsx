/************* Modules *************/

import React from 'react';
import PropTypes from 'prop-types';
import {Card, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {createExcerpt} from '../../utils/helpers';

import './list-item-card.scss';

const ListItemCard = ({item, itemType}) => {
    const excerpt = createExcerpt(
            item.description ? item.description : item.bio),
        pathname = itemType === 'movies' ? '/movies' : '/actors',
        readMoreLink = `${pathname}/${item._id}`;    
    return (
        <Card className="list-item-card">
            <Card.Body>            
                <Card.Title className="header">
                    {/* Only show tooltip 
                    if item is a movie and it has been favorited by a user*/}
                    {
                        item.usersFavorited && item.usersFavorited > 0
                            ? (<OverlayTrigger
                                trigger={['hover','focus', 'click']}
                                placement="top"
                                overlay={
                                    <Tooltip>
                                Favorites by users: {item.usersFavorited}
                                    </Tooltip>
                                }
                            >
                                <svg /* Star icon */
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="feather feather-star"
                                >
                                    <polygon 
                                        points="12 2 15.09
                                    8.26 22 9.27 17
                                    14.14 18.18 21.02
                                    12 17.77 5.82
                                    21.02 7 14.14 2
                                    9.27 8.91 8.26 12 2"
                                    >
                                    </polygon>
                                </svg>
                            </OverlayTrigger>
                            )
                            : null
                    }
                    {item.name}
                    {/* Show 'Featured' text if item is a featured movie */}
                    {itemType === 'movies' && item.featured 
                        ? (<small> (Featured)</small>)
                        : null
                    }
                </Card.Title>
                <Card.Img src={item.image} alt={item.name} />
                <Card.Text className="description">
                    {excerpt} &hellip;
                </Card.Text>
                <div className="read-more-link-container">
                    <svg /* Right arrow icon */
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="feather feather-arrow-right"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <Link to={readMoreLink} 
                        className="read-more-link" 
                    >
                        Read More
                    </Link>
                </div> 
            </Card.Body>
        </Card>
    );       
};

ListItemCard.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        bio: PropTypes.string,
        description: PropTypes.string,
        featured: PropTypes.bool, 
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        usersFavorited: PropTypes.number
    }).isRequired,
    itemType: PropTypes.string.isRequired
};

export default ListItemCard;