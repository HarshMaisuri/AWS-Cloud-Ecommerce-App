import { handleError } from "@/lib/utils";
import { api } from "./api";
import axios from "axios";

// const UPLOAD_URL = process.env.NEXT_PUBLIC_UPLOAD_URL;
const UPLOAD_URL="https://87mvh8ltvg.execute-api.us-east-1.amazonaws.com/Prod";

export const getClientProducts = () => {
  return api.get("/products").catch((err) => {
    handleError(err);
  });
};

export const getClientProductById = (id) => {
  return api.get(`/products/${id}`).catch((err) => {
    handleError(err);
  });
};

export const signupApi = (payload) => {
  return api.post("/users", payload).catch((err) => {
    handleError(err);
  });
};

export const postLogin = async (payload: any) => {
  console.log("payload", payload);
  try {
    let response = await api.post("/users/login", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res", response.data);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const placeOrder = (payload) => {
  return api.post("/orders", payload).catch(handleError);
};

export const uploadFile = async (payload) => {
  try {
    const response = await axios.post(`${UPLOAD_URL}/file-upload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
