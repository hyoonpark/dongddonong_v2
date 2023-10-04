import axiosInstance from "./axiosConfig";

export const UserMapping = (PlayerHistoryId, userId) => {
  axiosInstance
    .patch(`game/assign/${PlayerHistoryId}`, {
      params: { userId: { userId } },
    })
    .then((resp) => {
      console.log(resp);
      return resp;
    });
};
