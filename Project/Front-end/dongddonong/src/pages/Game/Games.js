import Wrapper from "../../components/Wrapper";
import practice from "../../assets/practice.png";
import twoBound from "../../assets/two-bound.png";
import game from "../../assets/game.png";

const Games = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-around text-center border border-black rounded-lg h-36">
          <div className="text-center">
            <img className="w-12" src={practice} alt="연습" />
            <div>연습</div>
          </div>
          <div>
            <div className="font-anton">10:15 AM</div>
            <div className="text-sm text-secondary">5'32''</div>
          </div>
          <div className="text-2xl text-primary">WIN</div>
        </div>

        <div className="flex items-center justify-around text-center border border-black h-36">
          <div>
            <img className="w-12" src={game} alt="연습" />
            <div>연습</div>
          </div>
          <div>
            <div className="font-anton">10:15 AM</div>
            <div className="text-sm text-secondary">5'32''</div>
          </div>
          <div className="text-2xl">LOSE</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Games;
