import React from "react";
import Wrapper from "../../components/Wrapper";
import practice from "../../assets/icon/practice.png";
import twoBound from "../../assets/icon/two-bound.png";
import game from "../../assets/icon/game.png";

const formatDate = (date) => {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
};

const Games = ({ data, user, selectedDate }) => {
  console.log(data);
  const filteredData = data.filter((e) => {
    const myHistory = e.playerHistories.find((v) => v.userId === +user.id);
    if (!myHistory) return false;
    const today = new Date(e.createdAt);
    return (
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    );
  });

  const isEmpty = filteredData.length === 0;

  return (
    <Wrapper>
      <div className="flex flex-col gap-4 mt-6">
        {filteredData.map((e) => {
          const myHistory = e.playerHistories.find(
            (v) => v.userId === +user.id
          );
          const mode = {
            1: { imgSrc: practice, label: "연습" },
            2: { imgSrc: twoBound, label: "투바운드" },
            3: { imgSrc: game, label: "경기" },
          }[myHistory.mode];

          return (
            <div className="flex">
              <div
                key={e.id}
                className="flex items-center justify-around text-center border border-black h-36 w-full md:w-3/5"
              >
                <div>
                  <img className="w-12" src={mode.imgSrc} alt="모드" />
                  <div>{mode.label}</div>
                </div>
                <div>
                  <div className="font-anton">
                    {formatDate(new Date(e.createdAt))}
                  </div>
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

              <div className="hidden w-2/5 h-36 border-r border-black border-t border-b justify-around md:flex items-center">
                <div className="basis-1/5">
                  <img
                    className="rounded-full"
                    src={myHistory.diffProfileImg}
                    alt=""
                  />
                </div>
                <div className="flex flex-col basis-3/5 max-w-xs text-center">
                  <div className="flex justify-between">
                    <div className="basis-10">득점</div>
                    <div className="basis-10">2점</div>
                    <div className="basis-10">3점</div>
                  </div>

                  <div className="flex justify-between font-bold">
                    <div className="basis-10">{myHistory.total}</div>
                    <div className="basis-10">
                      {myHistory.twoPts}/{myHistory.tryTwoPts}
                    </div>
                    <div className="basis-10">
                      {myHistory.threePts}/{myHistory.tryThreePts}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isEmpty && (
        <div className="flex justify-center items-center h-60">
          해당일에 경기가 없어요
        </div>
      )}
    </Wrapper>
  );
};

export default Games;
