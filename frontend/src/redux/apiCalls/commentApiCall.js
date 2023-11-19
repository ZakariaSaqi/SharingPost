import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { commentActions } from "../slices/commentSlice";
//create new comment
export function createCommentPost(newComm) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", newComm, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.addCommentToPost(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//update new comment
export function updateCommentPost(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/comments/${commentId}`, comment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.updateComment(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//delete  comment
export function deleteCommentPost(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`,{
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deleteComment(commentId));
      dispatch(commentActions.deleteComment(commentId))
      toast.success("Comment has been deleted !")
    } catch (error) {
      toast.error(error);
    }
  };
}
//GET ALL commentS
export function getAllComment() {
  return async (dispatch, getState) => {
    try {
      const {data} = await request.get(`/api/comments`,{
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.setAllComments(data));
    } catch (error) {
      toast.error(error);
    }
  };
}