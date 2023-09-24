import axiosInstance from "./axiosConfig";

// 전체 경기 목록 가져오기
export const getGameAll = async () => {
  try {
    const res = await axiosInstance.get(`/game/all`);
    return res.data
  } catch (err) {
    return err
  }
};