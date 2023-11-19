import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls/authApiCall";
function Auth() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  return (
    <ul className="navbar-nav ;">
      {user ? (
        <>
          <li className="nav-item ">
            <Link className="nav-link active text-capitalize dropdown">
              <div
                className="d-flex flex-row align-items-center dropdown-toggle"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user?.username}
                <img
                  className="rounded-circle ml-1"
                  style={{
                    width: "20px",
                    height: "20px",
                    objectFit: "cover",
                  }}
                  src={user?.profilePhoto.url}
                  alt=""
                />
              </div>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <Link className="dropdown-item" to={`/profile/${user?._id}`}><i class="bi bi-person-fill mr-1"></i> Profile</Link>
                <Link onClick={() => dispatch(logoutUser())} className="dropdown-item"to=""><i class="bi bi-box-arrow-in-left mr-1"></i>Log Out</Link>
              </div>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item ">
            <Link className="nav-link active" to="/login">
              <i className="bi bi-box-arrow-in-right mr-1"></i>{" "}
              <span>Login</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/signup">
              <i className="bi bi-person-plus mr-1"></i> <span>Signup</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default Auth;
