import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header>
      <nav className="container">
        <div className="logo">
          {isAuthenticated ? (
            <Link to={"/my-blogs"}>
              <h1>My Blogs</h1>
            </Link>
          ) : (
            <Link to={"/"}>
              <h1>{"{"}Finsweet</h1>
            </Link>
          )}
        </div>
        <div className="navigation">
          <div className="navs">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/posts"}>Posts</NavLink>
            <NavLink to={"/about"}>About Us</NavLink>
            <NavLink to={"/register"}>Register</NavLink>
          </div>
          <div className="action">
            {isAuthenticated ? (
              <NavLink className="btn-white" to={"/account"}>
                Account
              </NavLink>
            ) : (
              <NavLink className="btn-white" to={"/login"}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
