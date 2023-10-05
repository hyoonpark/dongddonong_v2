const ScoreBoard = ({ playerHistories, userId }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex text-center border-b">
        <div className="w-2/5">플레이어</div>
        <div className="h-4 w-px bg-secondary my-auto"></div>
        <div className="w-3/5 flex justify-around text-center">
          <div className="basis-1/5">득점</div>
          <div className="basis-1/5">2점</div>
          <div className="basis-1/5">2점%</div>
          <div className="basis-1/5">3점</div>
          <div className="basis-1/5">3점%</div>
        </div>
      </div>

      {playerHistories.map((e, i) => {
        return (
          <div
            className="flex h-32 items-center justify-between relative"
            key={i}
          >
            <div className="flex w-2/5 items-center justify-center relative">
              {e.userId === +userId ? (
                <div className="absolute top-0 right-[10%] bg-black text-white rounded-full p-1 px-2 rotate-6">
                  내 기록
                </div>
              ) : (
                ""
              )}
              <div>P{i + 1}</div>
              <img
                className="h-28 max-w-[100px] rounded-full ml-4"
                src={e.diffProfileImg}
                alt=""
              />
            </div>

            <div className="w-3/5 flex justify-around text-center">
              <div className="basis-1/5">{e.total}</div>
              <div className="basis-1/5">{e.twoPts}</div>
              <div className="basis-1/5">
                {e.twoPts}/{e.tryTwoPts}
              </div>
              <div className="basis-1/5">{e.threePts}</div>
              <div className="basis-1/5">
                {e.threePts}/{e.tryThreePts}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBoard;
