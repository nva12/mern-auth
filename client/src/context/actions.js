import axios from 'axios';

const ROOT_URL = process.env.REACT_APP_API;

export const signinUser = async (dispatch, signinPayload) => {
  let userData = {};

  await axios
    .post(`${ROOT_URL}/users/signin`, signinPayload)
    .then((response) => {
      console.log('Successfully signed in user', response);

      dispatch({ type: 'SIGNIN_SUCCESS', payload: response.data });

      localStorage.setItem('currentUser', JSON.stringify(response.data));

      userData = response.data;
    })
    .catch((error) => {
      console.log('Error signing in user', error.response.data.error);
      dispatch({ type: 'SIGNIN_ERROR', error: error.response.data.error });
    });

  return userData;
};

export const signout = async (dispatch) => {
  dispatch({ type: 'SIGNOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
};
