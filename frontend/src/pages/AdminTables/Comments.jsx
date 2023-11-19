import React, { useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentPost,
  getAllComment,
} from "../../redux/apiCalls/commentApiCall";
import Swal from "sweetalert2";
function Comments() {
  const dispatch = useDispatch();
  const { allComments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(getAllComment());
  }, [dispatch]);
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this comment !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCommentPost(commentId));
        dispatch(getAllComment());
      }
    });
  };
  return (
    <div className="d-flex flex-row">
      <AdminSidebar />
      <div className="container">
        <h2 className="fw-bolder text-info my-4">All comments</h2>
        <table class="table table-bordered ">
          <thead className="bg-info text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Comment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allComments.map((comment, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td><img
                src={comment.user.profilePhoto.url}
                width="25"
                className="rounded-circle mr-2"
                alt="Profile"
              />{comment.user.username}</td>
                <td>{comment.text}</td>

                <td>
                  <div className="row d-flex justify-content-center ">
                    <div className="col-mx-6">
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => deleteCommentHandler(comment._id)}
                      >
                        Delete
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

export default Comments;
