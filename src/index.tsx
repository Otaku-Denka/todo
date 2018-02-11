import './normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Todo from './components/todoContainer';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore, Middleware } from 'redux';
import reducers from './reducers/index';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const store = createStore(
    reducers,

    applyMiddleware(...middlewares)
);

ReactDOM.render(
    <Provider store={store}>
        <Todo />
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
