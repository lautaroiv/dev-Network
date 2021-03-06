import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const signUpUser = (userData, history) => async dispatch => {
  try {
    await axios.post('/api/users/signup', userData);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Sign in - Get User Token
export const signInUser = userData => async dispatch => {
  try {
    const res = await axios.post('/api/users/signin', userData);
    //save to localstorage
    const { token } = res.data;
    //set token to localStorage
    localStorage.setItem('jwtToken', token);
    //set token to auth header
    setAuthToken(token);
    //decode token to get user data
    const decoded = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//set signed in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Sign out user

export const signOutUser = () => dispatch => {
  //remove token from localStorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
