import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // Import thunk directly from 'redux-thunk'
import appReducers from './reducers';

// Define Redux store creation function
const ReduxStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = configureStore(
        {reducer:appReducers},
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
    return store;

}

// Create the Redux store
const store = ReduxStore();

export default store;