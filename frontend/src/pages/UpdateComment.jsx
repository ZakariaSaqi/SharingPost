import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCommentPost } from "../redux/apiCalls/commentApiCall";
function UpdateComment({ updateComment }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  useEffect(() => {
    if (updateComment) {
      setText(updateComment.text);
    }
  }, [updateComment]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Plase type something");
    const success = dispatch(updateCommentPost(updateComment?._id, { text }));
    if (success) {
      toast.success("Comments Updated succesfuly");
      document.getElementById("UpdateComment").click();
    }
  };
  return (
    <div
      className="modal fade"
      id="UpdateComment"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="UpdateComment"
      aria-hidden="true"
    >
      <form onSubmit={formSubmitHandler}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="UpdateComment">
                Update comment
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control"
                  id="message-text"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateComment;
