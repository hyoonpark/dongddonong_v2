import axiosInstance from "./axiosConfig";

//유저가 동영상을 업로드
export const gameUpload = async (formData) => {
        const result = await axiosInstance.post("/game/upload", formData, 
        { headers: { "Content-Type" : "multipart/form-data"}}
        ).then((result)=>{});
    }
