import Wrapper from "../../components/Wrapper";
import practice from "../../assets/icon/practice.png";
import twoBound from "../../assets/icon/two-bound.png";
import game from "../../assets/icon/game.png";

const Games = ({ Data, user, selectedDate }) => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-4 mt-6">
        {Data.map((e) => {
          const today = new Date(e.createdAt);

          if (
            selectedDate.getMonth() !== today.getMonth() ||
            selectedDate.getDate() !== today.getDate()
          ) {
            return null;
          }

          const hours = today.getHours() % 12 ? today.getHours() % 12 : 12;
          const minutes =
            today.getMinutes() < 10
              ? "0" + today.getMinutes()
              : today.getMinutes();
          const ampm = today.getHours() >= 12 ? "PM" : "AM";
          const date = `${hours}:${minutes} ${ampm}`;

          const myHistory = e.playerHistories.find(
            (e) => e.userId === +user.id
          );

          let imgSrc;
          let mode;
          switch (myHistory.mode) {
            case "1":
              imgSrc = practice;
              mode = "연습";
              break;
            case "2":
              imgSrc = twoBound;
              mode = "투바운드";
              break;
            case "3":
              imgSrc = game;
              mode = "경기";
              break;

            default:
              break;
          }

          return (
            <div
              key={e.id}
              className="flex items-center justify-around text-center border border-black h-36"
            >
              <div>
                <img className="w-12" src={imgSrc} alt="모드" />
                <div>{mode}</div>
              </div>
              <div>
                <div className="font-anton">{date}</div>
                <div className="text-sm text-secondary">
                  {myHistory.playTime + "분"}
                </div>
              </div>
              <div
                className={`text-2xl ${myHistory.win ? "text-primary" : ""}`}
              >
                {myHistory.win ? "WIN" : "LOSE"}
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Games;
