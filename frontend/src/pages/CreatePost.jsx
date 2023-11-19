import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/apiCalls/postsApiCall";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../redux/apiCalls/categoryApiCall";
function CreatePost() {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post title is required");
    if (description.trim() === "")
      return toast.error("Post description is required");
    if (category.trim() === "") return toast.error("Post category is required");
    if (!file) return toast.error("Post image is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);
    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    console.log(isPostCreated);
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  const { categories }  = useSelector(state => state.category)
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <div className="container py-3">
      <ToastContainer position="top-center" />
      <h2 className="fw-bolder text-info">Create Post</h2>
      <form onSubmit={formSubmitHandler}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="inputTitle4"
              placeholder="Title"
            />
          </div>
          <div className="form-group col-md-6 ">
            <label htmlFor="inputEmail4">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control text-capitalize"
              aria-label="Default select example"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="inputEmail4">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              rows="7"
              className="form-control"
              id="inputDescription4"
              placeholder="Description"
            />
          </div>
        </div>
        <div className="form-group col-md-12">
          <label>Image</label>
          <div className="input-group">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="form-control"
              id="image"
              placeholder="Image"
            />
            <div htmlFor="image" className="input-group-prepend ">
              <span className="input-group-text">
                <i className="bi bi-images"></i>
              </span>
            </div>
          </div>
        </div>

        <button
          style={{ width: "90px" }}
          type="submit"
          className="btn btn-primary d-flex align-items-center justify-content-center "
        >
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
