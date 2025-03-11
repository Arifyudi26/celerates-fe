import axios from "axios";

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

export default Instance;
