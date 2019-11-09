import { combineReducers } from 'redux';
import data from './data/reducer';
import location from './location/reducer'
import auth from './auth/reducer'
import errors from './errors/reducer'
import loading from './loading/reducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    data,
    location,
    auth,
    errors,
    loading,
    form: formReducer
});