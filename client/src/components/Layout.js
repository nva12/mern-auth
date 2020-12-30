import React, { Fragment } from 'react';
import Header from './Header';

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
