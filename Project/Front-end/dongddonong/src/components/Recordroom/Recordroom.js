import classes from "./Recordroom.module.css";
import user from "../../assets/player.png";
import user2 from "../../assets/player2.jpg";
import user3 from "../../assets/player3.jpg";
import Chart from "./Chart";
import HalfChart from "./HalfChart";
import { useUserContext } from "../../constexts/userContext";

const Recordroom = () => {
  const { user } = useUserContext();

  const totalTime = 10;
  return (
    <div className="flex flex-col mt-5 ml-2 mr-2">
      <div className="grid grid-cols-6 gap-3">
        <div className="col-start-1 col-end-3 h-24">
          <p>닉네임 : {user.nickName}</p>
          <img
            src={user.profileImgUrl}
            className="rounded-3xl w-24 h-24"
            alt="사진이 안나와"
          />
        </div>

        <div className=" h-24 grid grid-rows-5 col-start-3 col-end-7 bg-slate-200 rounded-3xl">
          <div className="text-center text-lg row-start-2">
            농구한 시간 : {totalTime}h
          </div>
          <div className="text-center text-lg row-start-4">
            전체 득점 : 3,432
          </div>
        </div>
      </div>
      <div className="mt-4 h-10 bg-slate-300 flex text-center items-center gap-6 rounded-3xl">
        <div></div>
        <div className=" text-primary bg-white w-1/3 h-6">연습모드</div>
        <div className=" bg-white w-1/3 h-6">투바모드</div>
        <div className=" bg-white w-1/3 h-6">대전모드</div>
        <div></div>
      </div>
      <div className="flex flex-col h-56 border-solid border-2 border-gray-500 mt-4 bg-white">
        <div className="flex h-1/3 flex-col justify-center items-center">
          <div>연습모드 총 득점</div>
          <div className=" text-4xl font-semibold">2,332</div>
        </div>
        <div className="flex h-2/3">
          <div className="flex items-center border-solid border-2 border-gray-500 w-2/5">
            <Chart labels={["2점슛", "3점슛"]}></Chart>
            <div></div>
          </div>
          <div className="flex border-solid border-2 justify-center border-gray-500 w-3/5 gap-4">
            <div className="flex flex-col w-1/3 justify-center">
              <div className=" text-sm text-center -m-3">2점슛</div>

              <HalfChart></HalfChart>
              <div className=" text-[3px] text-center">성공 / 시도</div>
              <div className=" text-lg text-center">3/16회</div>
            </div>
            <div className="w-1/8"></div>
            <div className="flex flex-col w-1/3 justify-center">
              <div className=" text-sm text-center -m-3">3점슛</div>

              <HalfChart></HalfChart>
              <div className=" text-[3px] text-center">성공 / 시도</div>
              <div className=" text-lg text-center">2/17회</div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-4 bg-slate-700">4</div>

      <div className=" mt-4 ">
        <div className="h-20 flex gap-1 border-solid border-2 border-gray-500 bg-white">
          <div className="flex flex-col items-center justify-evenly w-1/5 ml-3">
            <img src={user2} className=" rounded-full max-h-11 " alt="홈팀" />
            <div className=" text-[3px]">팀이름</div>
          </div>
          <div className="flex flex-col w-3/5">
            <div className="h-1/2 flex flex-col items-center">
              <div className=" text-sm font-semibold h-1/3">
                2022년 8월 12일
              </div>
              {/* 왜 마진으로는 처리가 안될까 */}
              <div className=" text-xs mt-2">명지 울림체육공원</div>
            </div>
            <div className="h-1/2 flex justify-between">
              <div>103</div>
              <div>▶104</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly w-1/5 mr-3">
            <img
              src={user3}
              className=" rounded-full max-h-11 "
              alt="어웨이팀"
            />
            <div className=" text-[3px]">팀이름</div>
          </div>
        </div>
      </div>
      <div>
        <div className="h-20 flex gap-1 border-solid border-2 border-gray-500 bg-white">
          <div className="flex flex-col items-center justify-evenly w-1/5 ml-3">
            <img src={user2} className=" rounded-full max-h-11 " alt="홈팀" />
            <div className=" text-[3px]">팀이름</div>
          </div>
          <div className="flex flex-col w-3/5">
            <div className="h-1/2 flex flex-col items-center">
              <div className=" text-sm font-semibold h-1/3">
                2022년 8월 12일
              </div>
              {/* 왜 마진으로는 처리가 안될까 */}
              <div className=" text-xs mt-2">명지 울림체육공원</div>
            </div>
            <div className="h-1/2 flex justify-between">
              <div>103</div>
              <div>▶104</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly w-1/5 mr-3">
            <img
              src={user3}
              className=" rounded-full max-h-11 "
              alt="어웨이팀"
            />
            <div className=" text-[3px]">팀이름</div>
          </div>
        </div>
      </div>
      <div>
        <div className="h-20 flex gap-1 border-solid border-2 border-gray-500 bg-white">
          <div className="flex flex-col items-center justify-evenly w-1/5 ml-3">
            <img src={user2} className=" rounded-full max-h-11 " alt="홈팀" />
            <div className=" text-[3px]">팀이름</div>
          </div>
          <div className="flex flex-col w-3/5">
            <div className="h-1/2 flex flex-col items-center">
              <div className=" text-sm font-semibold h-1/3">
                2022년 8월 12일
              </div>
              {/* 왜 마진으로는 처리가 안될까 */}
              <div className=" text-xs mt-2">명지 울림체육공원</div>
            </div>
            <div className="h-1/2 flex justify-between">
              <div>103</div>
              <div>▶104</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-evenly w-1/5 mr-3">
            <img
              src={user3}
              className=" rounded-full max-h-11 "
              alt="어웨이팀"
            />
            <div className=" text-[3px]">팀이름</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recordroom;
