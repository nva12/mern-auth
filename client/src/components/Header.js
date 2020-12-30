import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated, signOutUser } from '../utils/helpers';

const Header = () => {
  let history = useHistory();

  return (
    <header>
      <nav>
        <Link to='/'>Brand Logo</Link>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {isAuthenticated() ? (
            <>
              <li>
                <span>{isAuthenticated().name}</span>
              </li>
              <li>
                <span
                  onClick={() =>
                    signOutUser(() => {
                      history.push('/');
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  Sign Out
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/signup'>Sign Up</Link>
              </li>
              <li>
                <Link to='/signin'>Sign In</Link>
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
