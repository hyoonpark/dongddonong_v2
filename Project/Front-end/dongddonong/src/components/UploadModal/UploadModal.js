import React, { useState, useEffect, useRef } from "react";
import thumbnail from '../../assets/thumbnail.png'

const UploadModal = () => {
    const [files, setFiles] = useState(null);
    const [imagesSrc, setImagesSrc] = useState([]);
    const [status, setStatus] = useState("initial");
    const [videoDurations, setVideoDurations] = useState([]);
    const selectFile = useRef("")
    useEffect(() => {
        console.log(files); // 상태가 업데이트되면 실행됨
    }, [files]);


    const handleFileChange = (e) => {
        if (e.target.files) {
            setImagesSrc([]); // 다시 올리고 싶을 수도 있으니 전 상태를 비워
            setStatus("initial");
            setFiles(e.target.files);
            setVideoDurations([]); // 비디오 길이를 저장하는 배열 초기화
            [...e.target.files].forEach((file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImagesSrc((prevFiles) => [...prevFiles, reader.result]);
                };

                // 비디오 길이 가져오기
                if (file.type.startsWith("video/")) {
                    const video = document.createElement("video");
                    video.src = URL.createObjectURL(file);
                    video.onloadedmetadata = () => {
                        setVideoDurations((prevDurations) => [
                            ...prevDurations,
                            video.duration,
                        ]);
                    };
                }
            });
        }
    };

    const handleDeleteVideo = (index) => {
        // 해당 인덱스의 동영상을 제거
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);

        // 해당 인덱스의 이미지 및 길이 정보도 제거
        const updatedImagesSrc = [...imagesSrc];
        updatedImagesSrc.splice(index, 1);

        const updatedDurations = [...videoDurations];
        updatedDurations.splice(index, 1);

        setFiles(updatedFiles);
        setImagesSrc(updatedImagesSrc);
        setVideoDurations(updatedDurations);
    };

    const handleUpload = async () => {
        if (files) {
            setStatus("uploading");

            const formData = new FormData();

            [...files].forEach((file) => {
                formData.append("files", file);
            });

            try {
                const result = await fetch("https://httpbin.org/post", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
                setStatus("success");
            } catch (error) {
                console.error(error);
                setStatus("fail");
            }
        }
    };

    return (
        <div className=" ml-2">
        <h2 className=" mt-4 font-bold text-center">동영상 업로드</h2>
        <div className=" h-[500px] grid grid-rows-9 ">
            <div className=" row-start-1 row-end-6 overflow-auto">
                
                
                {files &&
                    [...files].map((file, index) => (
                        <div className="h-30 flex mt-2 gap-4" key={file.name}>
                            <img src={thumbnail} className="w-16 h-16" alt="로딩중" />
                            <ul>
                                <li>제목: {file.name}</li>
                                {/* <li>Type: {file.type}</li> */}
                                <li>Size: {file.size} bytes</li>
                                {file.type.startsWith("video/") && (
                                    <> 
                                        <li>재생시간: {videoDurations[index]} 초</li>
                                        <button onClick={() => handleDeleteVideo(index)}>삭제</button>
                                        {videoDurations[index] > 10 && (
                                            <span>
                                                10초 초과의 파일은 삭제해주세요
                                                <div className="opacity-0 hover:opacity-100">진짜 되나?</div>
                                            </span>
                                        )}
                                    </>
                                )}
                            </ul>
                        </div>
                    ))}</div>
            <div className=" mt-4 text-center row-start-6">
                <button onClick={()=> selectFile.current.click()} className=" bg-slate-300">파일 업로드하기</button>
                <input className=" hidden mt-5" ref={selectFile} id="file" accept="video/*" type="file" multiple onChange={handleFileChange} />
            </div>
            {files && (<div className=" place-items-center row-start-7">
                <button onClick={handleUpload} className="submit">
                    Upload {files.length > 1 ? "files" : "a file"}
                </button>
                </div>

            )}

            <Result status={status} />
        </div>
        </div>
    );
};

const Result = ({ status }) => {
    if (status === "success") {
        return <p>✅ Uploaded successfully!</p>;
    } else if (status === "fail") {
        return <p>❌ Upload failed!</p>;
    } else if (status === "uploading") {
        return <p>⏳ Uploading started...</p>;
    } else {
        return null;
    }
};

export default UploadModal;
