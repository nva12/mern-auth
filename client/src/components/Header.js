import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthDispatch, signout, useAuthState } from '../context';

const Header = () => {
  let history = useHistory();

  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { pointerEvents: 'none', color: '#000' };
    }
  };

  const dispatch = useAuthDispatch();
  const auth = useAuthState();

  const handleSignout = () => {
    signout(dispatch);
  };

  return (
    <header>
      <nav>
        <Link to='/'>Brand Logo</Link>
        <ul>
          <li>
            <Link to='/' style={isActive('/')}>
              Home
            </Link>
          </li>
          {auth.userDetails ? (
            <>
              <li>
                <span>{auth.userDetails.name}</span>
              </li>
              <li>
                <Link
                  to='/'
                  onClick={handleSignout}
                  style={{ cursor: 'pointer' }}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/signup' style={isActive('/signup')}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to='/signin' style={isActive('/signin')}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <h1>MERN app boilerplate with user authentication</h1>
      <hr />
    </header>
  );
};

export default Header;
