import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchByCategory } from "../redux/apiCalls/postsApiCall";
function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchByCategory(category));
  }, [category]);
  return (
    <div className="container " style={{ minHeight: "81vh" }}>
      <h2 className="fw-bolder text-info">Latest Posts</h2>
      {postsCate.length === 0 ? (
        <>
          <p>
            No posts "{category}" found ,{" "}
            <Link to="/posts">
              <strong>Back to posts !</strong>
            </Link>
          </p>
        </>
      ) : (
        <PostList posts={postsCate} />
      )}
    </div>
  );
}

export default Category;
