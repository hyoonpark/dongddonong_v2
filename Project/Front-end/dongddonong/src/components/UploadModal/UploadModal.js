import React, { useState, useEffect, useRef } from "react";
import thumbnail from '../../assets/thumbnail.png';
import GuideCarousel from "./GuideCarousel";
import MultiButton from './MultiButton';
import axios from "axios";
import trashbin from "../../assets/trashbin.png"
import classes from './ErrorModal.module.css'
import ReactDOM from 'react-dom';
import off from '../../assets/off.png'


//푸쉬용
const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    const [files, setFiles] = useState(null);
    const [imagesSrc, setImagesSrc] = useState([]);
    const [status, setStatus] = useState("initial");
    const [videoDurations, setVideoDurations] = useState([]);
    const selectFile = useRef("");
    const [gameTypes, setGameTypes] = useState([]); // 업로드 데이터 배열 추가

    useEffect(() => {
        console.log(files); // 상태가 업데이트되면 실행됨
        console.log(gameTypes); //
    }, [files, gameTypes]);

    const buttonOptions = ["연습", "투바", "대전"]; // 멀티버튼 옵션 목록

    const handleFileChange = (e) => {
        if (e.target.files) {
            setImagesSrc([]); // 다시 올리고 싶을 수도 있으니 전 상태를 비워
            setStatus("initial");
            setFiles(e.target.files);
            setVideoDurations([]); // 비디오 길이를 저장하는 배열 초기화
            setGameTypes([]); // 업로드 데이터 배열 초기화


            [...e.target.files].forEach((file, index) => {
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

        const updatedDurations = [...videoDurations];
        updatedDurations.splice(index, 1);

        // 해당 인덱스의 업로드 데이터도 제거
        const updatedGameTypes = [...gameTypes];
        updatedGameTypes.splice(index, 1);

        setFiles(updatedFiles);
        setVideoDurations(updatedDurations);
        setGameTypes(updatedGameTypes);
    };

    const handleButtonChange = (index, selectedValue) => {
        // 해당 버튼의 정보와 파일 제목을 객체로 묶어 업로드 데이터 배열에 추가
        const updatedGameTypes = [...gameTypes];
        updatedGameTypes[index] = {
            buttonInfo: selectedValue,
            fileName: files[index].name,
        };
        setGameTypes(updatedGameTypes);
    };

    const handleUpload = async () => {
        if (files) {
            setStatus("uploading");

            const formData = new FormData();
            // [...files].forEach((file) => {
            //     formData.append("files", file);
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
                console.log(files[i]);
            };
            formData.append("gametypes", gameTypes);
            console.log(formData.get("files"));
            console.log(formData);
            try {
                const result = await fetch("http://j9e103:5000/ai/upload", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    body: formData,
                });

                const data = await result.json();
                console.log(data);
                setStatus("success");
                setFiles(null)
            } catch (error) {
                console.error(error);
                setStatus("fail");
            }
        }
    };

    return (
        <div className={`bg-white rounded-xl p-4 ${classes.modal}`}>
            <div className="flex justify-end">
                <img onClick={props.onConfirm} className="w-6" src={off} alt='닫기버튼' />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-center">동영상 업로드</h2>
            <GuideCarousel></GuideCarousel>
            <div className="text-xl">영상 업로드</div>
            <div>최소 영상 화질 : 720p</div>
            <div>최대 영상 길이 : 15분</div>
            <div className="h-[260px] grid grid-rows-9">
                <div className="mt-4 text-center row-start-1">
                    <button onClick={() => selectFile.current.click()} className=" sm:w-72 border-2 w-48 text-primary rounded-lg border-primary ">업로드할 영상 선택하기</button>
                    <input className="hidden mt-5" ref={selectFile} id="file" accept="video/*" type="file" multiple onChange={handleFileChange} />
                </div>
                <div className="mt-4 row-start-2 row-end-6 grid grid-cols-6 overflow-auto">
                    {files &&
                        [...files].map((file, index) => (
                            <div className="h-30 col-start-1 sm:col-start-2 col-end-6 mt-2 gap-4" key={file.name}>
                                <ul>
                                    <li>제목: {file.name}</li>
                                    {file.type.startsWith("video/") && (
                                        <div className="flex justify-between">
                                            {/* <div>재생시간: {videoDurations[index]} 초   </div> */}
                                            <MultiButton
                                                options={buttonOptions}
                                                selected={gameTypes[index]?.buttonInfo || ""}
                                                onChange={(selectedValue) => handleButtonChange(index, selectedValue)}
                                            />

                                            <img className=" ml-2 w-5 h-5" src={trashbin} onClick={() => handleDeleteVideo(index)} />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        ))}
                </div>
                {files && files.length > 0 && ( // files.length > 0을 추가하니까 사라지네 왜지?
                    <div className="text-right row-start-7">
                        <button onClick={handleUpload} className=" mr-6 mt-4 submit bg-primary text-white w-32 rounded-lg">
                            Upload {files.length > 1 ? "files" : "a file"}
                        </button>
                    </div>
                )}
                <Result onClear={setFiles} status={status} />
                {/* <button onClick={props.onConfirm}>창닫기</button> */}
            </div>
        </div>
    );
};

const Result = ({ status }) => {
    if (status === "success") {
        return (
            <p>✅ Uploaded successfully!</p>)
    } else if (status === "fail") {
        return <p>❌ Upload failed!</p>;
    } else if (status === "uploading") {
        return <p>⏳ Uploading started...</p>;
    } else {
        return null;
    }
};



const UploadModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    onConfirm={props.onConfirm}
                />,
                document.getElementById('overlays')
            )}
        </>
    )
}

export default UploadModal;
