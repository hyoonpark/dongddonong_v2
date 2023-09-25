import axiosInstance from "./axiosConfig";

export const getGameUserId = async (userId) => {
  try {
    const res = await axiosInstance.get(`/game/assign/`, {
      params: {
        userId: userId,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
