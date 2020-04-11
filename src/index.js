import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import orderReducer from '../src/store/reducers/order';
import burgerBuilderReducer from '../src/store/reducers/burgerBuilder'
import authReducer from '../src/store/reducers/auth';
import {watchAuth, watchBurgerBuilder, watchOrder} from "./store/sagas";

const rootReducer = combineReducers({
    order: orderReducer,
    burgerBuilder: burgerBuilderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
