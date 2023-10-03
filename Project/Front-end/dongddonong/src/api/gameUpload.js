import axiosInstance from "./axiosConfig";

//유저가 동영상을 업로드
export const gameUpload = async (formData) => {
        const result = await axiosInstance.post("/game/upload", formData, 
        { headers: { "Content-Type" : "multipart/form-data"}}
        ).then((result)=>{console.log(result)});

        // const res = await result.json();
        console.log(result);
        // setStatus("success");
        // setFiles(null)
    }
//     } catch (error) {
//         console.error(error);
//         // setStatus("fail");
//     }
// };