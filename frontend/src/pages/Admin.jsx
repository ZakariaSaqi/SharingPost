import React, { useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";
import {useDispatch, useSelector} from "react-redux"
import { fetchCategories } from "../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../redux/apiCalls/postsApiCall";
import { getAllComment } from "../redux/apiCalls/commentApiCall";
function Admin() {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)
  const { userCount } = useSelector(state => state.profile)
  const { postsCount } = useSelector(state => state.post)
  const { allComments } = useSelector(state => state.comment)
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(getUsersCount())
    dispatch(getPostsCount())
    dispatch(getAllComment())
  }, [dispatch])
  console.log(allComments)
  return (
    <div >

    <div className="d-flex flex-row" style={{height :"81vh"}}>
      <AdminSidebar />
      <div className="container py-3"   >
        <div className="row">
          <div className="col-md-3">
            <div className="card my-2">
              <h5 className="card-header">Users</h5>
              <div className="card-body px-3">
              <div className="d-flex flex-row justify-content-between">
              <h2>{userCount}</h2>
               <i className="bi bi-people mr-2"
               style={{fontSize : "35px"}}></i>
              </div>
                <Link className="btn btn-primary" to="/adminDashboard/usersTable">
                  See All Userser
                </Link>
                
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card my-2">
              <h5 className="card-header">Posts</h5>
              <div className="card-body px-3">
              <div className="d-flex flex-row justify-content-between">
              <h2>{postsCount}</h2>
               <i className="bi bi-people mr-2"
               style={{fontSize : "35px"}}></i>
              </div>
                <Link className="btn btn-primary"
                to="/adminDashboard/postsTable">
                  See All Posts
                </Link>
                
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card my-2">
              <h5 className="card-header">Categories</h5>
              <div className="card-body px-3">
              <div className="d-flex flex-row justify-content-between">
              <h2>{categories.length}</h2>
               <i className="bi bi-people mr-2"
               style={{fontSize : "35px"}}></i>
              </div>
                <Link className="btn btn-primary"
                to="/adminDashboard/categoriesTable">
                  See All Categories
                </Link>
                
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card my-2">
              <h5 className="card-header">Comments</h5>
              <div className="card-body px-3">
              <div className="d-flex flex-row justify-content-between">
              <h2>{allComments.length}</h2>
               <i className="bi bi-people mr-2"
               style={{fontSize : "35px"}}></i>
              </div>
                <Link className="btn btn-primary"
                  to="/adminDashboard/commentsTable">
                  See All Comments
                </Link>
                
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <AddCategory />
        </div>
      </div>
    </div>
    
    </div>
  );
}

export default Admin;
