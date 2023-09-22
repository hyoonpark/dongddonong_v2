import Wrapper from "../../components/Wrapper";
import practice from "../../assets/icon/practice.png";
import twoBound from "../../assets/icon/two-bound.png";
import game from "../../assets/icon/game.png";

const Games = () => {
  const Dummy = [
    {
      id: 403,
      userId: 3017361691,
      gameDate: "2023-09-21 00:00:00",
      createdAt: "2023-09-21T14:56:24.089+00:00",
      isAssigned: false,
      playerHistories: [
        {
          id: 354,
          gameId: 403,
          userId: 3019596583,
          createdAt: "2023-09-21T14:56:24.089+00:00",
          diffProfileImg: "string",
          mode: "3",
          twoPts: 7,
          threePts: 3,
          tryTwoPts: 15,
          tryThreePts: 6,
          total: 13,
          xyUrl: "string",
          playTime: 10,
          win: true,
        },
        {
          id: 355,
          gameId: 403,
          userId: 3017361691,
          createdAt: "2023-09-21T14:56:24.089+00:00",
          diffProfileImg: "string",
          mode: "3",
          twoPts: 8,
          threePts: 4,
          tryTwoPts: 15,
          tryThreePts: 6,
          total: 16,
          xyUrl: "string",
          playTime: 10,
          win: false,
        },
      ],
    },
  ];

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

          {Dummy.forEach((e) => {
            console.log(e);
          })}
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
