import React, { useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getAllProfiles,
} from "../../redux/apiCalls/profileApiCall";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Users() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth) 
  const { profiles, isProfileDeleted } = useSelector(
    (state) => state.profile) 
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [isProfileDeleted]);
  const deleteProfileHandler = (userID) => {
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
        dispatch(deleteProfile(userID));
      }
    });
  };
  return (
    <div className="d-flex flex-row">
      <AdminSidebar />
      <div className="container">
        <h2 className="fw-bolder text-info my-4">All users</h2>
        <table class="table table-bordered ">
          <thead className="bg-info text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                <img
                src={profile?.profilePhoto.url}
                width="25"
                className="rounded-circle mr-2"
                alt="Profile"
              />
                { user?._id === profile?._id
                ? ( <>{profile.username  + " "} (You)</>) 
                : <> {profile.username}</>  

                }
               </td>
                <td>{profile.email}</td>
                <td className="m-auto">
                  <div className="row d-flex justify-content-center ">
                    <div className="col-mx-6">
                      <Link
                        to={`/profile/${profile._id}`}
                        className="btn btn-success m-1 "
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="col-mx-6">
                      <button
                       disabled={user?._id === profile?._id}
                        className="btn btn-danger m-1 "
                        onClick={() => deleteProfileHandler(profile._id)}
                      >
                        Delete Profile
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

export default Users;
