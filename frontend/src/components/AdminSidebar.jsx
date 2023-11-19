import React from "react";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
function AdminSidebar() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <div
        className="d-flex flex-column flex-shrink-0 p-3 h-100 text-white bg-info"
        style={{ width: "200px" }}
      >
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/adminDashboard/usersTable">
              <i className="bi bi-people mr-2"></i>
              Users
            </Link>
          </li>
          <li>
          <Link className="nav-link text-white" to="/adminDashboard/postsTable">
             <i className="bi bi-file-earmark-post mr-2"></i>
              Posts
          </Link>
          </li>
          <li>
          <Link className="nav-link text-white" to="/adminDashboard/categoriesTable">
          <i className="bi bi-tags-fill mr-2"></i>
              Categories
            </Link>
          </li>
          <li>
          <Link className="nav-link text-white" to="/adminDashboard/commentsTable">
             <i className="bi bi-chat-right-text-fill mr-2"></i>
              Comments
          </Link>
          </li>
        </ul>
        <hr />
       
      </div>
    </div>
  );
}

export default AdminSidebar;
