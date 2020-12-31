let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).token
  : '';

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_REQUEST':
      return {
        ...initialState,
        loading: true,
      };
    case 'SIGNIN_SUCCESS':
      return {
        ...initialState,
        userDetails: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'SIGNOUT':
      return {
        ...initialState,
        userDetails: '',
        token: '',
      };

    case 'SIGNIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
