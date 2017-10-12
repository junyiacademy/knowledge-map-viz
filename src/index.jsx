import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/reducers';

import App from './components/App';

let container = null;
let defaultNetwork = {};
if(__DEV__){
    console.log('debug mode');
    container = document.getElementsByTagName('BODY')[0];
    defaultNetwork = {
        roots: [
            {
                type: 'ring',
                id: 'l1',
                member: [
                    {
                        type: 'single',
                        id: 's1',
                        children: [
                            {type: 'single', id: 'c1',
                                children: [
                                    {
                                        type: 'single',
                                        id: 'child01'
                                    },
                                    {
                                        type: 'line',
                                        id: 'l2',
                                        member: [
                                            {type: 'single', id: 'child02'},
                                            {type: 'single', id: 'child03'}, 
                                        ]
                                    }
                                ]
                            },
                            {type: 'single', id: 'c2'},
                            {type: 'single', id: 'c3'},
                        ]
                    },
                    {
                        type: 'single',
                        id: 's2',
                        children: [
                            {type: 'single', id: 'c31'},
                            {type: 'single', id: 'c32'},
                            {type: 'single', id: 'c33'},
                        ]
                    },
                    {
                        type: 'single',
                        id: 's3',
                        children: [
                            {type: 'single', id: 'c21'},
                            {type: 'single', id: 'c22'},
                            {type: 'single', id: 'c23'},
                        ]
                    }
                ]
            }
        ]
    };
}

let store = createStore(
    reducers,
    {
        network: defaultNetwork,
        text: false,
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


render(
    <Provider store={store}>
        <App />
    </Provider>, 
    container);
