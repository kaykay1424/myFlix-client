import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView/MainView';

import {Container} from 'react-bootstrap';
import MainNavbar from './components/MainNavbar/MainNavbar';
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {  
    state = {
        isUserLoggedIn: false,
        view: ''
    }

    setNavbar = (loggedIn, view='') => {
        // console.log('view ' + view)
        // console.log(loggedIn)
        loggedIn 
            ? this.setState({
                isUserLoggedIn: true
            }) 
            : this.setState({
                isUserLoggedIn: false
            });
        this.setState({
            view: view
        });
    }
    
    render() {
        return (
            <>
                <MainNavbar 
                    isUserLoggedIn={this.state.isUserLoggedIn} 
                    view={this.state.view}
                />
                <Container className="my-flix" fluid>
                    <MainView setNavbar={this.setNavbar} />
                </Container>
            </>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);