/********** Modules **********/

import React from 'react';
import ReactDOM from 'react-dom';

/*********** -Redux ************/

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import myFlixApp from './reducers/reducers';

/*********** Components ************/

import MainView from './components/MainView/MainView';
import MainNavbar from './components/MainNavbar/MainNavbar';

import './index.scss';

const store = createStore(myFlixApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {      
    render() {
        return (
            <Provider store={store}>
                
                
                <MainView />
                
            </Provider>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);