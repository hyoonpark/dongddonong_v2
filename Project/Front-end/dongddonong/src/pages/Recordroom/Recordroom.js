import { useUserContext } from "../../contexts/userContext";
import { useState, useEffect } from "react";

import user from "../../assets/player.png";
import user2 from "../../assets/player2.jpg";
import user3 from "../../assets/player3.jpg";
import Chart from "../../components/Recordroom/Chart";
import HalfChart from "../../components/Recordroom/HalfChart";
import Wrapper from "../../components/Wrapper";
import leftArrow from "../../assets/icon/left-arrow.png";
import rightArrow from "../../assets/icon/right-arrow.png";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import getUserRecord from "../../api/getUserRecord";
// import useUserContext from '../../contexts/userContext'

const Recordroom = () => {
  // const { user } = useUserContext();

  const modes = ["연습모드", "투바모드", "대전모드"];
  const [mode, setMode] = useState();
  let practice = [];
  let twoBound = [];
  let match = [];
  // const userId = 3017361691
  console.log(user);

  axios
    .get(
      `https://j9e103.p.ssafy.io:8589/game/assign/${3017361691}?isAssigned=true`
    )
    .then((res) => {
      console.log(res.data.data);
      let game = [];
      const gameList = res.data.data;
      for (let index = 0; index < gameList.length; index++) {
        const tempGame = gameList[index]["playerHistories"]; //배열의 길이가 1,2인 두 선수 기록객체
        console.log(gameList[index]["gameDate"]);
        const gameDate = {};
        gameDate["gameDate"] = gameList[index]["gameDate"];
        game.push(gameDate);
        for (let index = 0; index < tempGame.length; index++) {
          const gameObj = {};
          gameObj[tempGame[index]["userId"]] = tempGame[index];
          game.push(gameObj);
          // console.log(tempGame[index]['userId'])
          // console.log(tempGame[index])
          // console.log(gameObj)
        }
        console.log(game);
        console.log(tempGame[0]["mode"]);
        if (tempGame[0]["mode"] === "1") {
          practice.push(game);
          console.log("연습");
        } else if (tempGame[0]["mode"] === "2") {
          twoBound.push(game);
          console.log("투바");
        } else if (tempGame[0]["mode"] === "3") {
          match.push(game);
          console.log(3);
        }
        game = [];
      }
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    console.log(match);
  }, [match]);

  return (
    <Wrapper>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-start-1 col-end-3 h-24">
            <img
              src={user.profileImgUrl}
              className="rounded-3xl max-w-[100px] mx-auto"
              alt="사진이 안나와"
            />
          </div>

          <div className=" h-24 grid grid-rows-5 col-start-3 col-end-7 bg-secondary rounded-3xl">
            <div className="text-center text-lg row-start-2 font-sans">
              농구한 시간 : 10h
            </div>
            <div className="text-center text-lg row-start-4">
              전체 득점 : 3,432
            </div>
          </div>
        </div>
        <div className="mt-4 h-10 bg-secondary flex text-center justify-evenly items-center">
          {modes.map((option, index) => (
            <button
              key={index}
              className={
                option === mode
                  ? "bg-primary ml-2 w-20 drop-shadow-xl text-white rounded-md"
                  : "ml-2 w-20 drop-shadow-xl text-primary bg-white rounded-md"
              }
              onClick={() => {
                setMode(option);
                console.log(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* 해당 결과 통계 데이터 */}
        <div className="flex flex-col h-60 border-solid border border-black mt-4 bg-white">
          <div className="flex basis-1/3 flex-col justify-center items-center">
            <div>연습모드 총 득점</div>
            <div className="text-2xl font-bold">2,332</div>
          </div>

          <div className="flex h-2/3">
            <div className="flex items-center w-2/5 justify-center pb-2">
              <Chart labels={["2점슛", "3점슛"]}></Chart>
            </div>

            <div className="relative flex justify-between items-center w-3/5">
              <div className="flex flex-col w-1/2 h-full  justify-center">
                <div className="text-center h-1/5">2점슛</div>
                <div className="flex justify-center items-center h-3/5">
                  <HalfChart></HalfChart>
                </div>
                <div className="text-lg text-center h-1/5">3/16회</div>
              </div>

              <div className="flex flex-col w-1/2 h-full  justify-center">
                <div className="text-center h-1/5">3점슛</div>
                <div className="flex justify-center items-center h-3/5">
                  <HalfChart></HalfChart>
                </div>
                <div className="text-lg text-center h-1/5">3/16회</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-3">
          <div className="h-32 border-black rounded border">
            <div className="h-4"></div>
            <div className="h-28 flex gap-1">
              <div className="flex flex-col items-center justify-evenly w-1/5">
                <img
                  src={user2}
                  className="rounded-2xl w-14 h-16"
                  alt="어웨이"
                />
                <div className="text-[12px]">Player 2</div>
              </div>

              <div className="flex items-center justify-center w-3/5 relative">
                <div className="absolute top-0 text-sm">2022년 8월 12일</div>

                <div className="h-1/2 flex items-center relative w-full">
                  <div className="absolute left-0 text-xl">103</div>
                  <div className="absolute right-10">
                    <img
                      className="w-3 -translate-y-px"
                      src={rightArrow}
                      alt=""
                    />
                  </div>
                  <div className="absolute right-0 text-xl">104</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-evenly w-1/5">
                <img
                  src={user2}
                  className="rounded-2xl w-14 h-16"
                  alt="어웨이"
                />
                <div className="text-[12px]">Player 2</div>
              </div>
            </div>
          </div>

          <div className="h-32 border-black rounded border">
            <div className="h-4"></div>
            <div className="h-28 flex gap-1">
              <div className="flex flex-col items-center justify-evenly w-1/5">
                <img
                  src={user2}
                  className="rounded-2xl w-14 h-16"
                  alt="어웨이"
                />
                <div className="text-[12px]">Player 2</div>
              </div>

              <div className="flex items-center justify-center w-3/5 relative">
                <div className="absolute top-0 text-sm">2022년 8월 12일</div>

                <div className="h-1/2 flex items-center relative w-full">
                  <div className="absolute left-0 text-xl">103</div>
                  <div className="absolute left-10">
                    <img
                      className="w-3 -translate-y-px"
                      src={leftArrow}
                      alt=""
                    />
                  </div>
                  <div className="absolute right-0 text-xl">104</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-evenly w-1/5">
                <img
                  src={user2}
                  className="rounded-2xl w-14 h-16"
                  alt="어웨이"
                />
                <div className="text-[12px]">Player 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Recordroom;
