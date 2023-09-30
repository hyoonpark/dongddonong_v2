import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../api/axiosConfig";
import Wrapper from "../../components/Wrapper";
import court from "../../assets/court.png";
import ResultData from "../../components/Game/ResultData";
import ScoreBoard from "../../components/Game/ScoreBoard";
import Classification from "../../components/Game/Classification";

const DetailGame = () => {
  const param = useParams();
  const [data, setData] = useState({});
  const Day = new Date(data.createdAt);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [playerHistories, setPlayerHistories] = useState([]);
  const [classificationIsOpen, SetClassificationIsOpen] = useState(true);

  useEffect(() => {
    axios.get(`/game/${param.id}`).then((resp) => {
      setData(resp.data.data);
      setPlayerHistories(resp.data.data.playerHistories);
    });
  }, [param.id]);

  const closeClassificationHandler = () => {
    SetClassificationIsOpen(false);
  };

  return (
    <div className="relative">
      {classificationIsOpen && (
        <Classification
          playerHistories={playerHistories}
          onClose={closeClassificationHandler}
        />
      )}

      <div>
        <div className="text-white pt-4 pl-4 absolute z-10 left-0">
          {Day.getFullYear()}-{Day.getMonth() + 1}-{Day.getDate()} (
          {daysOfWeek[Day.getDay()]}) {Day.getHours()}:{Day.getMinutes()}
        </div>
        <div className="text-white pt-10 pl-4 absolute z-10 left-0 font-sans">
          {playerHistories.length &&
            `P1 ${playerHistories[0].total}  :  ${playerHistories[1].total} P2`}
        </div>
        <img
          className="w-full h-72 md:h-96 brightness-50 max-h-[512px]"
          src="https://cdn.neomeo.co.kr/news/photo/202303/1060_1770_4018.jpg"
          alt=""
        />
      </div>

      <Wrapper>
        <div className="font-bold text-xl mt-5">스코어</div>
        <ScoreBoard playerHistories={playerHistories}></ScoreBoard>

        <div className="mt-6">
          <div className="font-bold text-xl">결과</div>
          {playerHistories.map((e, i) => {
            return (
              <div key={i} className="md:flex md:gap-4 mb-4">
                <div className="md:w-1/2">
                  <div className="mb-2 text-xl">
                    <span>Player {i + 1}</span>
                    <span
                      className={`pl-2 text-2xl font-anton ${
                        e.win ? "text-primary" : "text-gray-500"
                      }`}
                    >
                      {e.win ? "WIN" : "LOSE"}
                    </span>
                  </div>

                  {<ResultData playerHistories={e}></ResultData>}
                </div>

                <div className="mt-4 font-bold md:w-1/2 md:mt-0">
                  <div className="mb-1">위치별 성공률</div>

                  <img src={court} className="w-full h-48 md:h-60" alt="" />
                </div>
              </div>
            );
          })}
          <div className="mt-6 font-bold text-xl mb-2">최고의 순간</div>
          <div className="flex overflow-x-auto gap-4 mb-4">
            <img className="w-72 rounded-3xl" src={court} alt="" />
            <img className="w-72 rounded-3xl" src={court} alt="" />
            <img className="w-72 rounded-3xl" src={court} alt="" />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default DetailGame;
