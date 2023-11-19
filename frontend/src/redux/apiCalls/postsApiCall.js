import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch posts
 export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/posts?pageNumber=${pageNumber}`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//get post count posts
export function getPostsCount() {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`api/posts/count`);
        dispatch(postActions.setPostsCount(data));

      } catch (error) {
        toast.error(error);
      }
    };
  }
  //fetch post by cate
export function fetchByCategory(category) {
    return async (dispatch) => {
      try {
        const { data } = await request.get(`api/posts?category=${category}`);
        dispatch(postActions.setPostsCate(data));

      } catch (error) {
        toast.error(error);
      }
    };
  }
    //create new post
export function createPost(newPost) {
    return async (dispatch, getState) => {
      try {
        dispatch(postActions.setLoading())
         await request.post("api/posts", newPost, {
          headers : {
            Authorization : "Bearer " + getState().auth.user.token,
            "Content-Type" : "multipart/form-data"
          }
        });
        dispatch(postActions.setIsPostCreated());
        setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000) //2 sec
      } catch (error) {
        toast.error(error);
        dispatch(postActions.clearLoading())
      }
    };
  }

//get post details
export function getPost(postID) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/posts/${postID}`);
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//likes
export function toggleLikePost(postID) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`api/posts/like/${postID}`, {}, 
      {
        headers : {
          Authorization : "Bearer " + getState().auth.user.token
        }
      });
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error);
    }
  };
}
//update psot image
export function updatePostImage(newPhoto, postID) {
  return async (dispatch, getState) => {

    try {
     await request.put(`/api/posts/post-image-update/${postID}`, newPhoto,
      {
        headers : {
          Authorization : "Bearer " + getState().auth.user.token,
          "Content-Type" : "multipart/form-data"
        }
      });
      toast.success("New post image uploaded successfully")
    } catch (error) {
      toast.error(error);
    }
  };
}
// //update psot 
export function updatePost(newPost, postID) {
  return async (dispatch, getState) => {

    try {
      const { data } = await request.put(`/api/posts/${postID}`, newPost,
      {
        headers : {
          Authorization : "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.setPost(data))
    } catch (error) {
      toast.error(error);
    }
  };
}
// delete post
export function deletePost(postID) {
  return async (dispatch, getState) => {

    try {
      const { data } = await request.delete(`/api/posts/${postID}`,
      {
        headers : {
          Authorization : "Bearer " + getState().auth.user.token,
        }
      });
      dispatch(postActions.deletePost(data.postID))
      toast.success(data.message)
    } catch (error) {
      toast.error(error);
    }
  };
}
