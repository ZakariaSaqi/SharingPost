import React, { useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
} from "../../redux/apiCalls/categoryApiCall";
import Swal from "sweetalert2";
function Categories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const deleteCategorytHandler = (cateId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
      await  dispatch(deleteCategory(cateId));
            dispatch(fetchCategories());
      }
    });
  };
  return (
    <div className="d-flex flex-row">
      <AdminSidebar />
      <div className="container">
        <h2 className="fw-bolder text-info my-4">All categories</h2>
        <table class="table table-bordered ">
          <thead className="bg-info text-white">
            <tr>
              <th scope="col">N°</th>
              <th scope="col">Title</th>
              <th scope="col" style={{ width: "15px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => (
              <tr key={category?._id}>
                <td scope="col">{index + 1}</td>
                <td className="text-capitalize" scope="col">
                  {category?.title}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCategorytHandler(category?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
