import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated, signOutUser } from '../utils/helpers';

const Header = () => {
  let history = useHistory();

  const isActive = (path) => {
    if (history.location.pathname === path) {
      return { pointerEvents: 'none', color: '#000' };
    }
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
          {isAuthenticated() ? (
            <>
              <li>
                <span>{isAuthenticated().name}</span>
              </li>
              <li>
                <Link
                  to='/'
                  onClick={() =>
                    signOutUser(() => {
                      history.push('/');
                    })
                  }
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
