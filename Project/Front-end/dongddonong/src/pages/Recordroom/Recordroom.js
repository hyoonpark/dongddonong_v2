import { useUserContext } from "../../contexts/userContext";

import user from "../../assets/player.png";
import user2 from "../../assets/player2.jpg";
import user3 from "../../assets/player3.jpg";
import Chart from "../../components/Recordroom/Chart";
import HalfChart from "../../components/Recordroom/HalfChart";
import Wrapper from "../../components/Wrapper";
import leftArrow from "../../assets/icon/left-arrow.png";
import rightArrow from "../../assets/icon/right-arrow.png";

const Recordroom = () => {
  const { user } = useUserContext();

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
          <div></div>
          <div className=" text-primary bg-white w-1/4">연습모드</div>
          <div className=" bg-white w-1/4">투바모드</div>
          <div className=" bg-white w-1/4">대전모드</div>
          <div></div>
        </div>

        {/* 해당 결과 통계 데이터 */}
        <div className="flex flex-col h-56 border-solid border-2 border-gray-500 mt-4 bg-white">
          <div className="flex basis-1/3 flex-col justify-center items-center">
            <div>연습모드 총 득점</div>
            <div className="text-4xl font-semibold">2,332</div>
          </div>

          <div className="flex h-2/3">
            <div className="flex items-center w-2/5 justify-center">
              <Chart labels={["2점슛", "3점슛"]}></Chart>
            </div>

            <div className="flex justify-center items-center w-3/5 gap-4">
              <div className="flex flex-col w-1/3 justify-center">
                <HalfChart></HalfChart>
                <div className="text-lg text-center">3/16회</div>
              </div>

              <div className="flex flex-col w-1/3 h-full  justify-center">
                <div className=" text-sm text-center">3점슛</div>
                <HalfChart></HalfChart>
                <div className="text-[3px] text-center">성공 / 시도</div>
                <div className="text-lg text-center">2/17회</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4 gap-3">
          <div className="h-32 border-black rounded border-2">
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

          <div className="h-32 border-black rounded border-2">
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
