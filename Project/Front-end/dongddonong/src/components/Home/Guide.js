import cone from "../../assets/icon/cone.png";
import length from "../../assets/icon/length.png";
import player from "../../assets/icon/basketball-player.png";

const Guide = () => {
  return (
    <div className="absolute left-[4%] bottom-[4%] md:flex flex-col md:text-xl gap-2">
      <div className="flex gap-4">
        <img className="w-12" src={cone} alt="" />
        <div>
          <b>장소</b>
          <p>양쪽 뒤에서 찍어 주세요</p>
        </div>
      </div>
      <div className="flex gap-4">
        <img className="w-12" src={length} alt="" />
        <div>
          <b>시간</b>
          <p>영상 길이는 15분 제한</p>
        </div>
      </div>
      <div className="flex gap-4">
        <img className="w-12" src={player} alt="" />
        <div>
          <b>사람</b>
          <p>플레이어를 제외한 인물은 X</p>
        </div>
      </div>
    </div>
  );
};

export default Guide;
