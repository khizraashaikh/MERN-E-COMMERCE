import { publicRequest, userRequest } from "../utils/requestMethods";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const response = await publicRequest.get("/products");
    dispatch(getProductsSuccess(response.data));
  } catch (error) {
    dispatch(getProductsFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const response = await userRequest.delete(`/products/delete/${id}`);
    dispatch(deleteProductSuccess(response.data));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const response = await userRequest.put(`/products/update/${id}`, product);
    dispatch(updateProductSuccess(response.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const response = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(response.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};
