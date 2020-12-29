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

const Footer = () => {
  return (
    <footer>
      <hr />
      <p>
        <small>&copy; 2020 Nicolas Vallée</small>
      </p>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
