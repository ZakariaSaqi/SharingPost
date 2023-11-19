import React, { useState } from "react";
import Swal from "sweetalert2";
import UpdateComment from "../pages/UpdateComment";
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentPost } from "../redux/apiCalls/commentApiCall";
function CommentsList  ({ comments }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);
  const [updateComment, setUpdateComment] = useState(null)
  const updateCommentHandler = (comment) => {
    setUpdateComment (comment)
  }
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this comment !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
       dispatch(deleteCommentPost(commentId))
      }
    });
  };
  return (
    <>
      <h3>
        {comments?.length === 0
          ? "No comments yet"
          : comments?.length === 1
          ? "One Comment"
          : comments?.length + " Comments"}
      </h3>
      {comments?.map((comment) => (
        <div className="card py-2 mb-2 " key={comment?._id}>
          <div className="card-body  py-0 ">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <p style={{ fontSize: "14px" }} className="font-weight-bold ">
                {comment?.username}
              </p>
              <p  style={{ fontSize: "12px" }}>
               <Moment fromNow ago>
               {comment?.createdAt}
               </Moment> {" "} ago
              </p>
            </div>
            <p style={{ fontSize: "12px" }}>
              {comment?.text}
            </p>
            {user?._id === comment?.user && (
              <div className="d-flex  flex-row">
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash mr-2 text-danger"
              ></i>
              <i
              onClick={() => updateCommentHandler(comment)}
                data-toggle="modal"
                data-target="#UpdateComment"
                data-whatever="@mdo"
                className="bi bi-pencil-square text-primary"
              ></i>
            </div>
            )}
          </div>
        </div>
      ))}
      <UpdateComment updateComment={updateComment} />
    </>
  );
}

export default CommentsList;
