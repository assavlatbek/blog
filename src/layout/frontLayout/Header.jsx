import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

        <div className={`navigation ${menuOpen ? "open" : ""}`}>
          <div className="navs">
            <NavLink onClick={() => setMenuOpen(false)} to={"/"}>
              Home
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to={"/posts"}>
              Posts
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to={"/about"}>
              About Us
            </NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to={"/register"}>
              Register
            </NavLink>
          </div>
          <div className="action">
            {isAuthenticated ? (
              <NavLink
                onClick={() => setMenuOpen(false)}
                className="btn-white"
                to={"/account"}
              >
                Account
              </NavLink>
            ) : (
              <NavLink
                onClick={() => setMenuOpen(false)}
                className="btn-white"
                to={"/login"}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
        <div className="menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            <LazyLoadImage
              width={"50px"}
              height={"50px"}
              src="https://www.svgrepo.com/show/315606/menu-left.svg"
              effect="blur"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
