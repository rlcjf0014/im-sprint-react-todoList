import React from 'react';
import Search from './Search';

const Nav = ({ search }) => (
  <nav className="navbar">
    <div className="col-md-6 col-md-offset-3">
      <Search search={search}/>
    </div>
  </nav>
);

export default Nav;
