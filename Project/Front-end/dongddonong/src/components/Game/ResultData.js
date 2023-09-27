import CircularProgressbar from "../../components/Chart/CircularProgressbar";

const ResultData = ({ playerHistories }) => {
  return (
    <div className="flex items-center gap-2 md:h-60">
      <div className="w-1/3">
        <CircularProgressbar
          data={
            playerHistories &&
            ((playerHistories.twoPts + playerHistories.threePts) /
              (playerHistories.tryTwoPts + playerHistories.tryThreePts)) *
              100
          }
        ></CircularProgressbar>
      </div>
      <div className="w-3/5">
        <div className="flex flex-col basis-1/2 mb-4 md:mb-8">
          <div className="flex justify-between ml-2 mr-2 mb-px">
            <div className="flex items-center">
              <div className="bg-analogy rounded-full w-4 h-4 mr-1"></div>
              <div>2점슛</div>
            </div>

            <div className="flex">
              <div className="text-gray-500 mr-2">
                {playerHistories && playerHistories.twoPts}/
                {playerHistories && playerHistories.tryTwoPts}
              </div>
              <div className="font-bold">
                {playerHistories &&
                  parseInt(
                    (playerHistories.twoPts / playerHistories.tryTwoPts) * 100
                  )}
                %
              </div>
            </div>
          </div>

          <div className="w-full bg-secondary h-2 rounded relative">
            <div
              style={{
                width: `${parseInt(
                  (playerHistories?.twoPts / playerHistories?.tryTwoPts) * 100
                )}%`,
              }}
              className="absolute bg-analogy z-10 h-2 rounded"
            ></div>
          </div>
        </div>

        <div className="flex flex-col basis-1/2">
          <div className="flex justify-between ml-2 mr-2 mb-px">
            <div className="flex items-center">
              <div className="bg-complement rounded-full w-4 h-4 mr-1"></div>
              <div>3 점슛</div>
            </div>

            <div className="flex">
              <div className="text-gray-500 mr-2">
                {playerHistories && playerHistories.threePts}/
                {playerHistories && playerHistories.tryThreePts}
              </div>
              <div className="font-bold">
                {playerHistories &&
                  parseInt(
                    (playerHistories.threePts / playerHistories.tryThreePts) *
                      100
                  )}
                %
              </div>
            </div>
          </div>

          <div className="w-full bg-secondary h-2 rounded relative">
            <div
              style={{
                width: `${parseInt(
                  (playerHistories?.threePts / playerHistories?.tryThreePts) *
                    100
                )}%`,
              }}
              className="absolute bg-complement z-10 h-2 rounded"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultData;
