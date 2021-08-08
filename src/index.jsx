/********** Modules **********/

import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, 
} from 'react-router-dom';

/*********** -Redux ************/

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import myFlixApp from './reducers/reducers';

/*********** Components ************/

import MainView from './components/MainView/MainView';

import './index.scss';

const store = createStore(myFlixApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {      
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <MainView />
                </Router>
                
            </Provider>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);