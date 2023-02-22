import axios from "axios";  
import logger from "./logService"
import { toast } from "react-toastify";
// import logger from "./log.service";

axios.interceptors.response.use(null, error => {
  const expectedError =
  error.response && 
  error.response.status >= 400 && 
  error.response.status < 500;
  if (!expectedError) {
    //console.log("Logging the error", error);
    // alert("An unexpected error occurred.")
    // logger.log(err);
    ////different toast 
    //toast("An unexpected error occurred.");
     logger.log(error);
     toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};