import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//forgout user
export function forgout(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/resetPasswordLink", {
        email
      });
     toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//get reset psw user
export function getResetPassword(userId, token) {
    return async (dispatch) => {
      try {
        await request.get(`/api/password/resetPassword/${userId}/${token}`);
      } catch (error) {
        console.log(error)
        dispatch(passwordActions.setError())
      }
    };
  }
// reset psw 
export function resetPassword(newPsw, user) {
    return async () => {
      try {
        const {data} = await request.post(
        `/api/password/resetPassword/${user.userId}/${user.token}`,
        {password : newPsw});
        toast.success(data.message)
      } catch (error) {
       toast.error(error.response.data.message)
      }
    };
  }
