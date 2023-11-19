import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/apiCalls/categoryApiCall";
function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="">
      <h5 className="text-uppercase text-center fw-bold border-top border-4 pt-2">
        Categories
      </h5>
      <ul className="list-group ">
        {categories.map((category) => (
          <Link
            className="list-group-item d-flex flex-row justify-content-between"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            <p className="m-0 text-capitalize">{category.title}</p>
            <i className="bi bi-arrow-right-short"></i>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
