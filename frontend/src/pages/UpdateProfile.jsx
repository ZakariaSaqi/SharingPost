import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/apiCalls/profileApiCall";
import { toast } from "react-toastify";
function UpdateProfile({ profile }) {

  const dispatch = useDispatch();
  const [username, setUsername] = useState(profile.username);
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    setUsername(profile.username);
  }, [profile]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const updateUser = { username };
    if (password.trim() !== "") {
      updateUser.password = password;
    }
    const success = dispatch(updateProfile(profile?._id, updateUser));
    if (success) {
      toast.success("Profile Updated Successfully");
      document.getElementById("UpdateProfile").click(); // This triggers the modal close
    }
  };
  return (
    <div
      className="modal fade"
      id="UpdateProfile"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form onSubmit={formSubmitHandler}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update your profile
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
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="form-control"
                    id="inputTitle4"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="inputEmail4">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="inputTitle4"
                    placeholder="Password"
                  />
                </div>
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

export default UpdateProfile;
