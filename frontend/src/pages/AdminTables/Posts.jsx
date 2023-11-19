import React, { useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../../redux/apiCalls/postsApiCall";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const deletePostHandler = (postID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deletePost(postID));
        dispatch(fetchPosts());
      }
    });
  };

  return (
    <div className="d-flex flex-row">
      <AdminSidebar />
      <div className="container">
        <h2 className="fw-bolder text-info my-4">All posts</h2>
        <table class="table table-bordered ">
          <thead className="bg-info text-white">
            <tr> 
             <th scope="col">#</th>
             <th scope="col">User</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col" style={{ maxWidth: "20px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <th scope="row">{index + 1}</th>
                <td><img
                src={post.user.profilePhoto.url}
                width="25"
                className="rounded-circle mr-2"
                alt="Profile"
              />{post.user.username}</td>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td className="m-auto">
                  <div className="row d-flex justify-content-center ">
                    <div className="col-mx-6">
                      <Link to={`/posts/details/${post._id}`}
                        className="btn btn-success m-1"
                      >
                        View Post
                      </Link>
                    </div>
                    <div className="col-mx-6">
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => deletePostHandler(post._id)}
                      >
                        Delete Post
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Posts;
