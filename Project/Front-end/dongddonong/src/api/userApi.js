import axiosInstance from "./axiosConfig";

// 로그아웃하기
export const getLogout = async () => {
  try {
    const res = await axiosInstance.get(`/user/logout`);
    return res.data
  } catch (err) {
    return err
  }
};