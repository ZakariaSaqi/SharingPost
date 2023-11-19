import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";
function Reset() {
  const { userId, token } = useParams();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const [password, setPassword] = useState("");
  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);
  const ResetFormHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("New password is required");
    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <div className="container py-5" style={{ height: "81vh" }}>
      <ToastContainer position="top-center" />
      {isError ? (
        <>
          <div
            style={{ minHeight: "81vh" }}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <i
              className="bi bi-exclamation-circle text-danger "
              style={{ fontSize: "5rem" }}
            ></i>
            <h3 className="text-success text-danger">Not found </h3>
          </div>
        </>
      ) : (
        <> 
          <div className="d-flex flex-column justif-content-center align-items-center">
            <form onSubmit={ResetFormHandler}>
              <h2 className="fw-bolder text-info text-center">
                Reset password{" "}
              </h2>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">New password</label>
                <input
                  type=""
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Reset;
