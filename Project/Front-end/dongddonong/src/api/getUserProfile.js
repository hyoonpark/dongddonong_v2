import axiosInstance from "./axiosConfig";

// 유저가 참여한 경기 데이터 가져오기
export const getUserProfile = async (id) => {
  try {
    const res = await axiosInstance.get(`/user/info`, {
        params: { userId: id },
      } )
    return res.data.data
  } catch (err) {
    return err
  }
};