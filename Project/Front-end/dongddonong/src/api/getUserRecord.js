import axiosInstance from "./axiosConfig";

// 유저가 참여한 경기 데이터 가져오기
export const getUserRecord = async (userId) => {
  try {
    console.log(userId);
    const res = await axiosInstance.get(`/game/assign/${userId}`);
    console.log(res.data)
    return res.data.data
  } catch (err) {
    return err
  }
};
