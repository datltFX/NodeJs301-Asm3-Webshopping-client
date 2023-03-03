import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://asm3-webshopping.onrender.com",
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
export default axiosClient;
