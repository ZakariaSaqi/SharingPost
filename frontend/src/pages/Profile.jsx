import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../redux/apiCalls/profileApiCall";
import { logoutUser } from "../redux/apiCalls/authApiCall";
import PostItem from "../components/PostItem";

function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserProfile(id));
  }, [dispatch, id]);
  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/")
    }
  }, [navigate, isProfileDeleted]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select profile photo");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  const deleteProfileHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this account !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(user?._id))
        dispatch(logoutUser())
        console.log(isProfileDeleted)
      }
    });
  };

  if (loading) {
    return (
      <div
      style={{ minHeight: "81vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <RotatingLines
        strokeColor="#007bff "
        strokeWidth="5"
        animationDuration="0.75"
        width="100"
        visible={true}
      />
    </div>
    )
  }
  if (!profile) {
    return (
      <div
        style={{ minHeight: "81vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <RotatingLines
          strokeColor="#007bff "
          strokeWidth="5"
          animationDuration="0.75"
          width="100"
          visible={true}
        />
      </div>
    ); // You can render a loading indicator or any other fallback UI
  }

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" />
      <div className="row d-flex justify-content-center mb-4">
        <div className="col-md-10">
          <div className="card p-3 py-4">
            <div className="m-auto position-relative">
              <img
                src={profile?.profilePhoto.url}
                width="100"
                className="rounded-circle"
                alt="Profile"
              />
              {user?._id === profile?._id && (
                <label
                  htmlFor="image"
                  className="position-absolute bg-primary px-1 rounded"
                  style={{
                    bottom: "-20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-image text-white"></i>
                </label>
              )}
              <input
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  updateImageSubmitHandler(e); // Call the handler directly
                }}
                type="file"
                className="form-control"
                id="image"
                placeholder="Image"
                title="Select New Image"
                hidden
              />
            </div>

            <div className="text-center mt-3">
              <h5 className="mt-2 mb-0">{profile?.username}</h5>
              <span
                style={{
                  fontSize: "12px",
                  color: "grey",
                }}
              >
                Date joined : {new Date(profile?.createdAt).toDateString()}
              </span>

              <div className="px-4 mt-1"></div>
              {user?._id === profile?._id && (
                <button
                  data-toggle="modal"
                  data-target="#UpdateProfile"
                  data-whatever="@mdo"
                  className="btn btn-primary px-4 ms-3"
                >
                  <i className="bi bi-person-lines-fill mr-2"></i>
                  Update
                </button>
              )}
            </div>
          </div>
          <h2 className="fw-bolder text-info mt-4 ">
            {profile?.username} Posts
          </h2>
          <div className="row d-flex justify-content-center">
            {profile?.posts?.map((post) => (
              <PostItem
                key={post._id}
                post={post}
                username={profile?.username}
                userId={profile?._id}
              />
            ))}
          </div>
          {user?._id === profile?._id && (
            <div className="d-flex justify-content-center">
              <button
                onClick={deleteProfileHandler}
                className="btn btn-danger w-100"
              >
                Delete Your Account
              </button>
            </div>
          )}
        </div>
      </div>
      <UpdateProfile profile={profile} />
    </div>
  );
}

export default Profile;
