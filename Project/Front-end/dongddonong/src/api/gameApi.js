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

//유저의 전체 경기 목록 가져오기
export const getUserGameAll = async (userId) => {
  try {
    const res = await axiosInstance.get(`/game/all/${userId}`);
    return res.data
  } catch (err) {
    console.log('유저 전체 경기 가져오기 실패!', err);
    return err
  }
};


// 해당 경기 정보 가져오기
export const getGameData = async (gameId) => {
  try {
    const res = await axiosInstance.get(`/game/${gameId}`);
    // console.log('경기 정보 가져오기 성공!', res.data.data)
    return res.data;
  }
  catch (err) {
    console.log('실패!!!!', err);
    return err;
  }
};


// // 분석 중 경기 가져오기
// export const getAnalyzeData = async (userId, isAnalyzing) => {
//   try {
//     const res = await axiosInstance.get(`/analyze/${userId}`, {
//       params: {
//         isAnalyzing: isAnalyzing,
//       },
//     });
//     // console.log('분석 중 정보 가져오기 성공!', res.data.data)
//     return res.data;
//   }
//   catch (err) {
//     console.log('실패!!!!', err);
//     return err;
//   }
// };

// 분석 중 경기 gameId 가져오기

export const getAnalyzingArray = async (userId, isAnalyzing) => {
  try {
    const res = await axiosInstance.get(`/game/status-modal/analyze/${userId}`, {
      params: {
        isAnalyzing: isAnalyzing,
      },
    });
    // console.log('분석 중 정보 가져오기 성공!', res.data.data)
    return res.data;
  }
  catch (err) {
    console.log('실패!!!!', err);
    return err;
  }
};

// 분석 완료 및 미할당된 경기 gameId 가져오기
export const getNotAssignedArray = async (userId, isAssigned) => {
  try {
    const res = await axiosInstance.get(`/game/status-modal/assign/${userId}`, {
      params: {
        isAssigned: isAssigned,
      },
    });
    // console.log('분석 중 정보 가져오기 성공!', res.data.data)
    return res.data;
  }
  catch (err) {
    console.log('실패!!!!', err);
    return err;
  }
};
