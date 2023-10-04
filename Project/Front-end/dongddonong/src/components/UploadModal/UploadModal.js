import React, { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../contexts/userContext";
import { gameUpload } from "../../api/gameUpload";

// import thumbnail from '../../assets/thumbnail.png';
import GuideCarousel from "./GuideCarousel";
import MultiButton from './MultiButton';
import axios from "axios";
import trashbin from "../../assets/trashbin.png"
import classes from './ErrorModal.module.css'
import ReactDOM from 'react-dom';
import off from '../../assets/off.png'

const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    const [files, setFiles] = useState(null);
    const [status, setStatus] = useState("initial");
    const [videoDurations, setVideoDurations] = useState([]);
    const selectFile = useRef("");
    const [gameTypes, setGameTypes] = useState([]); // 업로드 데이터 배열 추가
    const [error, setError] = useState(false);
    const { user } = useUserContext();
    const [userId, setUserId] = useState(user.id)
    const [gameId, setGameId] = useState([])


    useEffect(() => {
        console.log(files); // 상태가 업데이트되면 실행됨
        for (const file in files) { console.log(file); }
        // console.log(gameTypes); //
    }, [files, gameTypes]);

    // const videoMetadata = require("fast-video-metadata");
    const buttonOptions = ["연습", "투바", "대전"]; // 멀티버튼 옵션 목록


    const handleFileChange = (e) => {
        if (e.target.files) { // 다시 올리고 싶을 수도 있으니 전 상태를 비워
            setStatus("initial");
            setFiles(e.target.files);
            // console.log(e.target.files);
            setVideoDurations([]); // 비디오 길이를 저장하는 배열 초기화
            setGameTypes([]); // 업로드 데이터 배열 초기화
            

            [...e.target.files].forEach((file, index) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {

                    //     const data = reader.result;
                    //     const exif = Exifr.parse(data);
                    //     setMetadata(exif);
                    //     // setImagesSrc((prevFiles) => [...prevFiles, reader.result]);

                };
                // reader.readAsDataURL(file)
                // const exif = metadata
                // const date = exif.DateTimeOriginal
                // console.log(exif)
                // console.log(date)
                // 비디오 길이 가져오기

                if (file.type.startsWith("video/")) {
                    const video = document.createElement("video");
                    video.src = URL.createObjectURL(file);
                    video.addEventListener('loadedmetadata', () => {
                        // 촬영 날짜(생성 날짜)를 가져오기
                        const creationDate = video.getAttribute('data-creation-date');

                    })
                    // console.log(video.currentTime)
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

    function gameModeToNumber(modename) {
        let gameTypeNumber = null
        if (modename === '연습') { gameTypeNumber = 1 }
        else if (modename === '투바') { gameTypeNumber = 2 }
        else if (modename === '대전') { gameTypeNumber = 3 }
        return (gameTypeNumber)
    }
    function formatDate(inputDate) {
        const date = new Date(inputDate);
      
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
      }

      function formatTime(second) {
        const seconds = Math.round(second)
        // const hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
        const min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
        const sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;
        const time = `${min}:${sec}`
        return time
      }
    const handleButtonChange = (index, selectedValue) => {
        // 해당 버튼의 정보와 파일 제목을 객체로 묶어 업로드 데이터 배열에 추가
        const updatedGameTypes = [...gameTypes];

        updatedGameTypes[index] = {
            buttonInfo: selectedValue,
            fileName: files[index].name,
        };
        setGameTypes(updatedGameTypes);
    };

    useEffect(() => {
        localStorage.setItem('gameId',JSON.stringify(gameId));
        console.log(localStorage.getItem('gameId'))
    },[gameId])
    const handleUpload = async () => {
        if (files) {
            setStatus("uploading");

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                

                files[i]["mode"] = gameModeToNumber(gameTypes[i]['buttonInfo'])
                formData.append('file', files[i]);
                formData.append('gameDate',formatDate(files[i]['lastModifiedDate']))
                formData.append('userId',userId)
                formData.append('mode', files[i]["mode"])
                formData.append('fileName', files[i].name)
                formData.append('videoLength',videoDurations[i])
                console.log(formData.get('mode'));
                console.log(formData.get('userId'));
                console.log(formData.get('gameDate'));
                console.log(formatDate(files[i]['lastModifiedDate']),userId,files[i]["mode"],files[i].name,videoDurations[i])
                // console.log(gameModeToNumber(gameTypes[i]));
                // console.log(gameModeToNumber(gameTypes[i]['buttonInfo']))
                // console.log(files[i])
                // console.log(formatDate(files[i]['lastModifiedDate']))
                // console.log(files[i]['lastModifiedDate'])
                    ;
                // console.log(formData.get("files"));
                // console.log(formData);
                // gameUpload(formData)
                const accessToken = localStorage.getItem("accessToken")
                console.log(accessToken)
                try {
                    const result = await fetch("https://j9e103.p.ssafy.io:8589/game/upload", {
                        method: "POST",
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + accessToken
                        },
                        body: formData,
                    });

                    const res = await result.json();

                    console.log(res);
                    setGameId((prev)=>[...prev, res['data']])
                    setStatus("success");
                    setFiles(null)
                } catch (error) {
                    console.error(error);
                    setStatus("fail");
                }
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
            {error && error > 0 && <div>에러를 없애줘</div>}
            <div className="text-xl">영상 업로드</div>
            <div>최소 영상 화질 : 720p</div>
            <div>최대 영상 길이 : 15분</div>
            <div className="h-[260px] grid grid-rows-9">
                <div className="mt-4 text-center row-start-1">
                    <button onClick={() => selectFile.current.click()} className=" sm:w-72 border-2 w-48 hover:text-white hover:bg-primary text-primary rounded-lg border-primary ">업로드할 영상 선택하기</button>
                    <input className="hidden mt-5" ref={selectFile} id="file" accept="video/*" type="file" multiple onChange={handleFileChange} />
                </div>
                <div className="mt-4 row-start-2 row-end-6 grid grid-cols-6 overflow-auto">
                    {files &&
                        [...files].map((file, index) => (
                            <div className="h-30 col-start-1 sm:col-start-2 col-end-6 mt-2 gap-4" key={file.name}>
                                <ul>
                                    <div className="flex justify-between">
                                        <div>{file.name}</div><div className="">{formatTime(videoDurations[index])}</div>
                                    </div>
                                    {file.type.startsWith("video/") && (
                                        <div className="flex justify-between">
                                            {videoDurations[index] < 900 &&
                                                <MultiButton
                                                    options={buttonOptions}
                                                    selected={gameTypes[index]?.buttonInfo || ""}
                                                    onChange={(selectedValue) => handleButtonChange(index, selectedValue)}
                                                />}
                                            {videoDurations[index] > 900 && <div className=" text-red-600 font-bold pointer-events-none" >영상길이가 너무 깁니다.</div>}

                                            <img className=" ml-2 cursor-pointer w-5 h-5" src={trashbin} onClick={() => handleDeleteVideo(index)} />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        ))}
                </div>
                
                {files && files.length > 0 && ( // files.length > 0을 추가하니까 사라지네 왜지?
                    <div className=" text-right row-start-7">
                        {videoDurations.some(duration => duration > 900) ? (
                            <div className="text-red-600 font-bold pointer-events-none">
                                업로드 못하는 영상을 삭제해주세요
                            </div>
                        ) : (
                            <button onClick={handleUpload} className={`${files.length === gameTypes.length ? null : 'pointer-events-none'} mr-6 mt-4 submit bg-primary text-white  w-32 rounded-lg`}>
                                {files.length === gameTypes.length ? '업로드' : '모드 선택필요'}
                            </button>
                        )}
                    </div>
                )}
                <Result onClear={setFiles} status={status} />
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
