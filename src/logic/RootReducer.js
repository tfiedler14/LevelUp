import { combineReducers } from 'redux';
import data from './data/reducer';
import location from './location/reducer'
import auth from './auth/reducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    data,
    location,
    auth,
    form: formReducer
});