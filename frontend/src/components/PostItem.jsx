import React from "react";
import { Link } from "react-router-dom";
function PostItem({ post, username, userId }) {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;
  return (
    <div
      className="card my-2 d-flex flex-column h-100"
      style={{ maxWidth: "700px" }}
    >
      <div
        className="m-auto"
        style={{ MaxWidth: "400px", maxHeight: "auto", overflow: "hidden" }}
      >
        <img
          className="card-img-top m-auto"
          src={post?.image.url}
          alt={post?.title}
        />
      </div>
      <div className="card-body d-flex flex-column flex-grow-1 ">
        <div className="d-flex flex-row justify-content-between align-items-center ">
          <p style={{ fontSize: "12px", color: "grey" }} className="m-0">
            <strong>Author : </strong>
            <Link to={profileLink}>
              {username ? username : post?.user?.username}
            </Link>
          </p>
          <p style={{ fontSize: "12px", color: "grey" }} className="m-0">
            <strong>{new Date(post?.createdAt).toDateString()}</strong>
          </p>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center ">
          <h5 className="card-title my-2 ">{post?.title}</h5>
          <p style={{ fontSize: "12px", color: "grey" }} className="m-0">
            <Link
              className="text-uppercase"
              to={`posts/categories/${post?.category}`}
            >
              {post?.category}
            </Link>
          </p>
        </div>
        <p className="latest-post-card-description card-text">
          {post?.description}{" "}
        </p>
      </div>

      <Link
        to={`/posts/details/${post?._id}`}
        className="Link btn btn-primary w-100"
      >
        Read more ...
      </Link>
    </div>
  );
}

export default PostItem;
