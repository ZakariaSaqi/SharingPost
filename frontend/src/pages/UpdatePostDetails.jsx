import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/apiCalls/postsApiCall";
import { fetchCategories } from "../redux/apiCalls/categoryApiCall";
function UpdatePostDetails({ post }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Update state when the post prop changes
  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
    setCategory(post.category);
  }, [post._id]);


  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post title is required");
    if (description.trim() === "")
      return toast.error("Post description is required");
    if (category.trim() === "") return toast.error("Post category is required");
    const success = dispatch(
      updatePost({ title, description, category }, post?._id)
    );

    if (success) {
      toast.success("Post Updated succesfuly");
      document.getElementById("UpdatePostModal").click();
    }
  };
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);
  return (
    <div
      className="modal fade"
      id="UpdatePostModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form onSubmit={formSubmitHandler}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                    className="form-control"
                    id="inputDescription4"
                    placeholder="Description"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdatePostDetails;
