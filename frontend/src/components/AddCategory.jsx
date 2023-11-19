import React, { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { createCategory } from "../redux/apiCalls/categoryApiCall";
function AddCategory() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("");
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (title.trim() === "") return toast.error("Title is required");
        dispatch(createCategory({title}))
        setTitle("")
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4 border">
                    <h2 className="fw-bolder text-info">Add new category</h2>
                    <form onSubmit={formSubmitHandler}>
                        <div className="form-group">
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

                        <button type="submit" className="btn btn-primary w-100">
                            Add category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;
