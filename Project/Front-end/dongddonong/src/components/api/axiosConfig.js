import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // 추후 .env 파일에 생성
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;