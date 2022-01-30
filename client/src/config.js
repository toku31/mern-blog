import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mern-blog-app01.herokuapp.com/api/"
})