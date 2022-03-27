import axios from "axios";

export default axios.create({
  baseURL: "https://62315f6305f5f4d40d78e17a.mockapi.io/",
  headers: {
    "Content-type": "application/json"
  }
});