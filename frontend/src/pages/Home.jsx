import React, { useEffect } from "react";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/apiCalls/postsApiCall";
function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);
  return (
    <>
      <header className="home-background-image py-5">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5  text-white mb-2" >
                 <strong> Welcome to Posts-App</strong>
                </h1>
                <p className="lead text-white mb-4">
                  the ultimate platform for sharing and discovering captivating
                  posts and articles. Dive into a world of diverse perspectives,
                  engaging stories, and thought-provoking content. Whether
                  you're a creator sharing your insights or a reader exploring
                  new ideas !"
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <ScrollLink
                    to="postlist"
                    spy={true}
                    smooth={true}
                    offset={-70} // Adjust the offset based on your header height
                    duration={500}
                    className="btn btn-primary btn-lg px-4 me-sm-3 mr-3"
                  >
                    Get Started
                  </ScrollLink>

                  <Link className="btn btn-outline-light btn-lg px-4">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container ">
        <h2 className="fw-bolder text-info">Latest Posts</h2>
        <div className="row ">
          <div className="col-md-8">
            <PostList posts={posts} />
          </div>

          <div className="col-md-4">
            <Sidebar />
            <Link
              id="postlist"
              to={"/posts"}
              className="btn btn-primary my-3 w-100"
            >
              See All Posts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
