import axios from 'axios';
import { databaseSecret } from '../../../Const';
import { setLocation } from '../location/actions';
import { setLoading, endLoading, getLoading } from '../loading/actions';

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

export const setSkills = data => {
  return {
    type: 'SET_SKILLS',
    data
  };
};

export const setCharacter = data => {
  return {
    type: 'SET_CHARACTER',
    data
  };
};

export const setAttributes = data => {
  return {
    type: 'SET_ATTRIBUTES',
    data
  };
};

export const setQuests = data => {
  return {
    type: 'SET_QUESTS',
    data
  };
};

export const setUser = data => {
  return {
    type: 'SET_USER',
    data
  };
};

export const setQuest = data => {
  return {
    type: 'SET_QUEST',
    data
  };
};
// + "?auth=" + databaseSecret
export const getData = (target, dataPoint) => {
  return dispatch => {
    dispatch(setLoading());
    return axios
      .get(target + '?auth=' + databaseSecret)
      .then(response => {
        if (dataPoint === 'profile') {
          dispatch(setProfile(response.data));
          dispatch(endLoading());
        } else if (dataPoint === 'user') {
          dispatch(setUser(response.data));
          dispatch(endLoading());
        } else if (dataPoint === 'skills') {
          dispatch(setSkills(response.data));
          dispatch(endLoading());
        } else if (dataPoint === 'attributes') {
          dispatch(setAttributes(response.data));
          dispatch(endLoading());
        } else if (dataPoint === 'character') {
          dispatch(setCharacter(response.data));
          dispatch(endLoading());
        } else if (dataPoint === 'quests') {
          dispatch(setQuests(response.data));
          dispatch(endLoading());
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
    console.log('TARGET: ', target + '?auth=' + databaseSecret);
    console.log(data);
    dispatch(setLoading());
    return axios
      .put(target + '?auth=' + databaseSecret, data)
      .then(response => {
        dispatch(getData(target, 'profile'));
        dispatch(endLoading());
        redirect && dispatch(setLocation(redirect));
        type === 'quest' && setQuest(response.data);
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteData = (target, redirect) => {
  return dispatch => {
    return axios
      .delete(target + '?auth=' + databaseSecret)
      .then(response => {
        redirect && dispatch(setLocation(redirect));
      })
      .catch(error => {
        throw error;
      });
  };
};
