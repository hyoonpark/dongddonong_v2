import practice from "../../assets/practice.png";
import twoBound from "../../assets/two-bound.png";
import game from "../../assets/game.png";

const Games = () => {
  return (
    <div className="h-96 mx-4 flex flex-col gap-4">
      <div className="flex justify-around items-center h-36 border-black border">
        <div>
          <img className="w-12" src={practice} alt="연습" />
          <div>연습</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-anton">10:15 AM</div>
          <div>5'32''</div>
        </div>
        <div className="text-primary">WIN</div>
      </div>

      <div className="flex justify-around items-center h-36 border-black border">
        <div>
          <img className="w-12" src={game} alt="연습" />
          <div>연습</div>
        </div>
        <div>
          <div>10:15 AM</div>
          <div>5'32''</div>
        </div>
        <div>LOSE</div>
      </div>
    </div>
  );
};

export default Games;
