import user2 from "../../assets/player2.jpg";
import rightArrow from "../../assets/icon/right-arrow.png";
import leftArrow from "../../assets/icon/left-arrow.png";
import { useUserContext } from "../../contexts/userContext";
import { getUserProfile } from "../../api/getUserProfile"
import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";



const RecordCard = (props) => {
  const players = [];
  const { user } = useUserContext();

  const [player1Profile, setPlayer1Profile] = useState({})
  const [player2Profile, setPlayer2Profile] = useState({})


  let isPractice = null


  for (const key in props.game) {
    players.push(key);
  }
  useEffect(() => {
    console.log(players.length, '조건문이 돌기전 마지막 불꽃')
    if (players.length > 2) {
      if (players[0] === user.id) {
        getUserProfile(players[0]).then((res) => { // 닉네임과 이미지주소를
          setPlayer1Profile({ 'nickName': res.nickName, 'total': props.game[players[0]]["total"], 'src': res.profileImgUrl })
          console.log(player1Profile)
        })

        getUserProfile(players[1]).then((res) => {
          setPlayer2Profile({ 'nickName': res.nickName, 'total': props.game[players[1]]["total"], 'src': res.profileImgUrl })
        })
      }
      else {
        getUserProfile(players[0]).then((res) => { // 닉네임과 이미지주소를
          setPlayer2Profile({ 'nickName': res.nickName, 'total': props.game[players[0]]["total"], 'src': res.profileImgUrl })
          console.log(player1Profile)
        })

        getUserProfile(players[1]).then((res) => {
          setPlayer1Profile({ 'nickName': res.nickName, 'total': props.game[players[1]]["total"], 'src': res.profileImgUrl })
        })
      }
    }
    else {
      getUserProfile(players[0]).then((res) => {
        setPlayer1Profile({ 'nickName': res.nickName, 'total': props.game[players[0]]["total"], 'src': res.profileImgUrl })
      })
      console.log('1인')
      console.log(props)
    }
  }, [props])



  if (players.length > 2) { // 투바나 대전이다
    isPractice = 1
  }


  return (
    <div className="flex flex-col mt-4 gap-3">
      <div className="h-32 border-black rounded border">
        <div className="h-4"></div>
        <div className="h-28 flex gap-1">
          <div className="flex flex-col items-center justify-evenly mr-2 ml-2 w-1/5">
            <img
              src={player1Profile.src}
              className="rounded-2xl w-14 h-16"
              alt="어웨이"
            />
            <div className="text-[12px]">{player1Profile.nickName}</div>
          </div>

          <div className="flex items-center justify-center w-3/5 relative">
            <div className="absolute top-0 text-sm">
              {props.game["gameDate"]}
            </div>

            <div className="h-1/2 flex items-center relative w-full">
              <div className="absolute left-0 text-xl">
                {player1Profile.total}
              </div>
              {isPractice &&
                player2Profile.total < player1Profile.total && (
                  <div className="absolute left-10">
                    <img
                      className="w-3 -translate-y-px"
                      src={leftArrow}
                      alt=""
                    />
                  </div>
                )}
              {isPractice &&
                player2Profile.total > player1Profile.total && (
                  <div className="absolute right-10">
                    <img
                      className="w-3 -translate-y-px"
                      src={rightArrow}
                      alt=""
                    />
                  </div>
                )}
              <div className="absolute right-0 text-xl">
                {isPractice && player2Profile.total}
              </div>
            </div>
          </div>
          {isPractice && (
            <div className="flex flex-col items-center justify-evenly ml-2 mr-2 w-1/5">
              <img src={player2Profile.src} className="rounded-2xl w-14 h-16" alt="어웨이" />
              <div className="text-[12px]">{player2Profile.nickName}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
