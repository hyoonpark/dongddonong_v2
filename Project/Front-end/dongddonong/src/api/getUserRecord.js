import axiosInstance from "./axiosConfig";

// 유저가 참여한 경기 데이터 가져오기

const getUserRecord = async (userId) => {
  try {
    const res = await axiosInstance.get(`/game/assign/${userId}`);
    console.log('요청성공!', res.data)
    return res.data
  } catch (err) {
    return err
  }
};
export default getUserRecord