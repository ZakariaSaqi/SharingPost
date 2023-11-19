import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
//Get user profile
export function getUserProfile(userID) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userID}`);
      dispatch(profileActions.setProfile(data));
      console.log(JSON.parse(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//Uolaad  profile photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };
}
//Update  profile
export function updateProfile(userID, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userID}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.updateUserProfile(data));
      dispatch(authActions.setUsername(data.username));

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error);
    }
  };
}
// delete profile
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error);
      dispatch(profileActions.clearLoading());
    }
  };
}
// count users
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/count", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setUsersCount(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
// get all users
export function getAllProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/users/profile", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error);
    }
  };
}

