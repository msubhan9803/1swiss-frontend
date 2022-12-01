/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import formReducer from './formReducer';
import subscriptionFormReducer from './subscriptionFormReducer.js';

export default combineReducers({
    formReducer,
    subscriptionFormReducer
});