import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <a className="navbar-brand" href="/">
        React Reading List
      </a>
      <a className="navbar-brand" href="/" style={{color: 'white'}}>
        Search
      </a>
      <a className="navbar-brand" href="/saved" style={{color: 'white'}}>
        Saved
      </a>
    </nav>
  );
}

export default Nav;
