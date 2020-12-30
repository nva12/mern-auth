import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to='/'>Brand Logo</Link>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='/signin'>Sign In</Link>
          </li>
        </ul>
      </nav>
      <h1>MERN app boilerplate with user authentication</h1>
      <hr />
    </header>
  );
};

export default Header;
