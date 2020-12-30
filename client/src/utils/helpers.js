import cookie from 'js-cookie';

export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (window !== 'undefined') {
    cookie.remove(key);
  }
};

export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key);
  }
};

export const setInLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const getFromLocalStorage = (key) => {
  if (window !== 'undefined') {
    JSON.parse(localStorage.getItem(key));
  }
};

export const authenticateUser = (response, next) => {
  // setCookie('token', response.data.token);
  setInLocalStorage('token', response.data.token);
  setInLocalStorage('user', response.data.user);
  next();
};

export const isAuthenticated = () => {
  if (window !== 'undefined') {
    // const cookieChecked = getCookie('token');
    // if (cookieChecked) {
    //   if (localStorage.getItem('user')) {
    //     return JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     return false;
    //   }
    // }
    if (getFromLocalStorage('currentUser')) {
      return getFromLocalStorage('currentUser');
    } else {
      return false;
    }
  }
};

export const signOutUser = (next) => {
  // removeCookie('token');
  removeFromLocalStorage('token');
  removeFromLocalStorage('user');
  next();
};
