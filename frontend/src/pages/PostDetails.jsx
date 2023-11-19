import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import Swal from "sweetalert2";
import UpdatePostDetails from "./UpdatePostDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  toggleLikePost,
  updatePostImage, deletePost
} from "../redux/apiCalls/postsApiCall";
import { RotatingLines } from "react-loader-spinner";
function PostDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { id } = useParams();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  useEffect(() => {
    // window.scrollTo(0,0)
    dispatch(getPost(id));
  }, [id, post, dispatch]);


 
  if (!post) {
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
    ); 
  }
  
  const updateImageSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Post image is required");
    const formData = new FormData();
    formData.append("image", file);
    await dispatch(updatePostImage(formData, post?._id));
    // dispatch(getPost(id));
  };
  const deletePostHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async (result) => {
      if (result.isConfirmed) {
        await dispatch(deletePost(post?._id))
        navigate (`/profile/${user?._id}`)
      }
    });
  };
 
  return (
    <>
      <div className="container">
        <ToastContainer position="top-center" />
        <div className="row">
          <div
            className="col-md-9 card my-2 d-flex flex-column h-100 "
            style={{ maxWidth: "700px" }}
          >
            <div className="d-flex flex-column align-items-center px-4 pt-4  ">
              <img
                className="card-img-top m-auto img-fluid "
                src={post?.image.url}
                alt={post?.title}
                style={{ height: "auto", width: "50rem" }}
              />
              {post?.user?._id === user?._id && (
                <form className="mt-2">
                  <label htmlFor="image" className=" bg-primary px-1 rounded">
                    <i className="bi bi-image text-white"></i>
                  </label>
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
                </form>
              )}
            </div>
            <div className="card-body d-flex flex-column flex-grow-1 ">
              <h1
                style={{ fontWeight: "bold" }}
                className="card-title mb-2 text-center fw-bold m-0"
              >
                {post?.title}
              </h1>
              <div className="d-flex flex-row justify-content-center align-items-center mb-2 ">
                <div className="d-flex flex-row align-items-center ">
                  <img
                    src={post?.user?.profilePhoto.url}
                    className="img-fluid rounded mr-3"
                    alt=""
                    style={{ height: "auto", width: "2rem" }}
                  />
                  <div className="d-felx flex-column">
                    <p
                      style={{ fontSize: "12px", color: "grey" }}
                      className="m-0"
                    >
                      <Link to={`/profile/${post?.user?._id}`}>
                        {post?.user.username}
                      </Link>
                    </p>
                    <p
                      style={{ fontSize: "12px", color: "grey" }}
                      className="m-0"
                    >
                      <strong>
                        {new Date(post?.createdAt).toDateString()}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              <p className="card-text">{post?.description}</p>
            </div>
            <div className="d-flex justify-content-between felx-row">
              <div className="d-flex justify-content-end p-2 flex-row align-items-center">
                {user && (
                  <i
                    onClick={() => dispatch(toggleLikePost(post?._id))}
                    className={
                      post?.likes?.includes(user?._id)
                        ? "bi bi-hand-thumbs-up-fill mr-2 text-primary"
                        : "bi bi-hand-thumbs-up  mr-2  text-primary"
                    }
                    style={{ cursor: "pointer" }}
                  ></i>
                )}
                <p style={{ fontSize: "12px" }} className="m-0">
                  <strong>
                    {post?.likes?.length === 0
                      ? "No likes yet"
                      : post?.likes?.length === 1
                      ? post?.likes.length + " Like"
                      : post?.likes?.length + " Likes"}
                  </strong>
                </p>
              </div>
              {post?.user?._id === user?._id && (
                <div className="d-flex justify-content-end p-2 flex-row">
                  <i
                    onClick={deletePostHandler}
                    className="bi bi-trash mr-2 text-danger"
                  ></i>
                  <i
                    data-toggle="modal"
                    data-target="#UpdatePostModal"
                    data-whatever="@mdo"
                    className="bi bi-pencil-square text-primary"
                  ></i>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
           { user ?  <AddComment postId={post?._id} /> : <p>Log in to write a comment !</p>}

            <CommentsList comments={post?.comments} />
            <UpdatePostDetails post={post} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
