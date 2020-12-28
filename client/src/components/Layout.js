import React, { Fragment } from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <a href='/'>Home</a>
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
