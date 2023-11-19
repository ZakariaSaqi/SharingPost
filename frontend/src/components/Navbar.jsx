import React from "react";
import {Link} from "react-router-dom"
import Auth from "./Auth";
import { useSelector } from "react-redux";
function Navbar() {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-5">
      <Link className="navbar-brand fw-bold" to="/">
        <strong>Post-App</strong>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
         <i className=" bi bi-list  "></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <i className="bi bi-house  mr-1"></i>Home{" "}
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/posts">
              <i className="bi bi-stickies  mr-1"></i>Post
            </Link>
          </li>
         {  user && ( <li className="nav-item active">
            <Link className="nav-link" to="/posts/createPost">
              <i className="bi bi-journal-plus  mr-1"></i>Create
            </Link>
          </li>) }
         { user?.isAdmin && (
          <li className="nav-item active">
          <Link className="nav-link" to="/adminDashboard">
            <i className="bi bi-person-check  mr-1"></i>Admin Dash
          </Link>
        </li>
         )}
        </ul>
        <Auth />
      </div>
    </nav>
  );
}

export default Navbar;
