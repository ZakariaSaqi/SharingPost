import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error);
    }
  };
}

//create category
export function createCategory(newCate) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCate, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("Category added successfully !");
    } catch (error) {
      toast.error(error);
    }
  };
}
//delete category
export function deleteCategory(cateId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${cateId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteCategory(data._id));
      toast.success("Category deleted successfully !");
    } catch (error) {
      toast.error(error);
    }
  };
}
