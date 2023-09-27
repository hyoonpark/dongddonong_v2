import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import Wrapper from "../../components/Wrapper";
import court from "../../assets/court.png";
import ResultData from "../../components/Game/ResultData";

const DetailPractice = () => {
  const param = useParams();
  const [data, setData] = useState({});
  const Day = new Date(data.createdAt);
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const playerHistories = data.playerHistories && data.playerHistories[0];

  useEffect(() => {
    axios.get(`/game/${param.id}`).then((resp) => {
      setData(resp.data.data);
    });
  }, [param.id]);

  return (
    <div className="relative">
      <div>
        <div className="text-white pt-4 pl-4 absolute z-10 left-0">
          {Day.getFullYear()}-{Day.getMonth() + 1}-{Day.getDate()} (
          {daysOfWeek[Day.getDay()]}) {Day.getHours()}:{Day.getMinutes()}
        </div>
        <img
          className="w-full h-72 md:h-96 brightness-50 max-h-[512px]"
          src={playerHistories && playerHistories.diffProfileImg}
          alt=""
        />
      </div>
      <Wrapper>
        <div className="mt-6">
          <div className="md:flex md:gap-4">
            <div className="md:w-1/2">
              <div className="font-bold mb-1">결과</div>
              <ResultData playerHistories={playerHistories}></ResultData>
            </div>

            <div className="mt-8 font-bold text-xl md:w-1/2 md:mt-0">
              <div className="mb-2">위치별 성공률</div>

              <img src={court} className="w-full h-48 md:h-60" alt="" />
            </div>
          </div>

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

export default DetailPractice;
