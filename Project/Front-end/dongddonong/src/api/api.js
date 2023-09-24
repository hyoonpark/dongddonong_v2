import axios from "axios";

const instance = axios.create({
  baseURL: "https://j9e103.p.ssafy.io:8589",
  headers: {},
});

export default instance;
