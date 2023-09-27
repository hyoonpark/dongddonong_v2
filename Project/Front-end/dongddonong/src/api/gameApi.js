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


// 해당 경기 정보 가져오기
export const getGameData = async (gameId) => {
  try {
    const res = await axiosInstance.get(`/game/${gameId}`);
    // console.log('성공!', res)
    return res.data;
  }
  catch (err) {
    console.log('실패!!!!', err);
    return err;
  }
};