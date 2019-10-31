import axios from 'axios';
import firebaseApp from '../../../Const';
import { setLocation } from '../location/actions';

export const setData = data => {
  return {
    type: 'GET_DATA',
    data
  };
};

export const setProfile = data => {
  return {
    type: 'SET_PROFILE',
    data
  };
};

export const setHouses = data => {
  return {
    type: 'SET_HOUSES',
    data
  };
};

export const setHouse = data => {
  return {
    type: 'SET_HOUSE',
    data
  };
};

export const getData = (target, dataPoint) => {
  return dispatch => {
    return axios
      .get(target)
      .then(response => {
        if (dataPoint === 'profile') {
          dispatch(setProfile(response.data));
        } else if (dataPoint === 'houses') {
          dispatch(setHouses(response.data));
        }
      })
      .catch(error => {
        throw error;
      });
  };
};

export const putData = (target, data, redirect, type) => {
  return dispatch => {
    // const token = firebaseApp.auth().currentUser.getIdToken();
    return axios
      .put(target, data)
      .then(response => {
        dispatch(getData(target, 'profile'));
        redirect && dispatch(setLocation(redirect));
        type === 'house' && setHouse(response.data);
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteData = (target, redirect) => {
  return dispatch => {
    return axios
      .delete(target)
      .then(response => {
        redirect && dispatch(setLocation(redirect));
      })
      .catch(error => {
        throw error;
      });
  };
};
