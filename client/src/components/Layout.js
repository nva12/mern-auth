import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to='/'>Home</Link>
        <ul>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
