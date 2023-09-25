import axiosInstance from "./axiosConfig";

// 로그아웃하기
export const getLogout = async (userId) => {
  try {
    const res = await axiosInstance.post(`/user/logout?userId=${userId}`);
    return res.data;
  } catch (err) {
    console.error(err)
    return err;
  }
};