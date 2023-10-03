import { useUserContext } from "../../contexts/userContext";
import { useState, useEffect } from "react";
import { getUserRecord }from "../../api/getUserRecord";


import user from "../../assets/player.png";
import user2 from "../../assets/player2.jpg";
import user3 from "../../assets/player3.jpg";
import Chart from "../../components/Recordroom/Chart";
import HalfChart from "../../components/Recordroom/HalfChart";
import Wrapper from "../../components/Wrapper";
import leftArrow from "../../assets/icon/left-arrow.png";
import rightArrow from "../../assets/icon/right-arrow.png";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import RecordCard from "../../components/Recordroom/RecordCard";
// import useUserContext from '../../contexts/userContext'

const Recordroom = () => {
  const { user } = useUserContext();
  const userId = user.id

  const modes = ['연습모드', '투바모드', '대전모드']
  const [mode, setMode] = useState()
  const [games, setGames] = useState([])
  const [total, setTotal] = useState(0)
  const [practice, setPractice] = useState([])
  const [twoBound, setTwoBound] = useState([])
  const [match, setMatch] = useState([])
  const [gameList, setGameList] = useState('')
  
  function gameChangeHandler(option) {
    if (option === '연습모드'){setGames([...practice])}
    else if (option === '투바모드'){setGames([...twoBound])}
    else if (option === '대전모드'){setGames([...match])}
     
  }
  // const practice = []
  // const twoBound = []
  // const match = []

  let gamesTotalScore = 0
  let gamesTotalTime = 0
  let userTotalScore = 0
  let total3PA = 0
  let total3PM = 0
  let total2PA = 0
  let total2PM = 0

  
    if(games.length>0){
      for (let index = 0; index < games.length; index++) {
        gamesTotalScore += games[index][userId]['total']
        gamesTotalTime += games[index][userId]['playTime']
        total2PA += games[index][userId]['tryTwoPts']
        total3PA += games[index][userId]['tryThreePts']
        total2PM += games[index][userId]['twoPts']
        total3PM += games[index][userId]['threePts']

      }
    }
  

  useEffect(()=>{
      const promise = getUserRecord(userId)
      // let gameList = []
      promise.then(data => { // data로 풀어해친다음 딱히 방법이 안보이면 그냥 data를 쓰자 어디할당하지말자
          console.log(data)
          setGameList(data)


          
      // const gameList = promise
      let game = {}
      const practice = []
      const twoBound = []
      const match = []
      for (let index = 0; index < data.length; index++) {
        const tempGame = data[index]['playerHistories'] //배열의 길이가 1,2인 두 선수 기록객체
        // console.log(data[index]['gameDate'])

        game['gameDate'] = data[index]['gameDate'] //key를 gameDate로 value를 해당 경기시작으로 객체를 만들고 game객체에 추가
        // game.push(gameDate)

        for (let index = 0; index < tempGame.length; index++) { // 현재게임의 인덱스를 순회하면서 해당유저의 아이디를 key로 value는 해당유저의 경기정보로 객체를 만들고 game객체에 추가
          game[tempGame[index]['userId']] = tempGame[index];
          // console.log(tempGame[index]['userId'])
          // console.log(tempGame[index])
          // console.log(gameObj)
        }
        // console.log(game)
        // console.log(tempGame[0]['mode'])
        userTotalScore += game[userId]['total']
        console.log(game[userId]['total'])
        console.log(userTotalScore)
        if (tempGame[0]['mode'] === '1') {
          practice.push(game)
        }
        else if (tempGame[0]['mode'] === '2') {
          twoBound.push(game)
        }
        else if (tempGame[0]['mode'] === '3') {
          match.push(game)
        }
        game = {} //game초기화

      }
      setTotal(userTotalScore)
      setPractice(practice)
      setTwoBound(twoBound)
      setMatch(match)
      setMode('연습모드')
      gameChangeHandler('연습모드')
        })
      
    }

  ,[total]); //의존성을 practice나 다른 걸로 두니까 아마 이루프에 있는 const practice의 영향을 받는듯
  //하다 total은 여기서 한번

  useEffect(() => {
     //각 배열의 첫번째는 해당 게임의 경기시각, 두번째, 세번째는 해당선수들의 기록
    console.log('현재게임',games)
    console.log(user)
  }, [])


  return (
    <Wrapper>
      <div className="flex flex-col mt-4">
        <div className="grid grid-cols-6 gap-3">
          <div className="col-start-1 col-end-3 h-24">
            <img
              src={user.profileImgUrl}
              className="rounded-3xl max-w-[100px] mx-auto"
              alt="사진이 안나와"
            />
          </div>

          <div className=" h-24 grid grid-rows-5 col-start-3 col-end-7 bg-secondary rounded-3xl">
            <div className="text-center text-lg row-start-2 font-sans">
              농구한 시간 : {gamesTotalTime}h
            </div>
            <div className="text-center text-lg row-start-4">
              전체 득점 : {total}
            </div>
          </div>
        </div>
        <div className="mt-4 h-10 bg-secondary flex text-center justify-evenly items-center">
        {modes.map((option, index) => (
            <button
              key={index}
              className={option === mode ? ' sm:w-40 bg-primary ml-2 w-20 drop-shadow-xl text-white rounded-md' : 'sm:w-40 ml-2 w-20 drop-shadow-xl text-primary bg-white rounded-md'}
              onClick={() => {
                setMode(option)
                gameChangeHandler(option)
                console.log(option)
              }}
            >

              {option}
            </button>
          ))}
        </div>

        {/* 해당 결과 통계 데이터 */}
        <div className="flex flex-col h-60 border-solid border border-black mt-4 bg-white">
          <div className="flex basis-1/3 flex-col justify-center items-center">
            <div>{mode} 총 득점</div>
            <div className="text-2xl font-bold">{gamesTotalScore}</div>
          </div>

          <div className="flex h-2/3">
            <div className="flex items-center w-2/5 justify-center pb-2">
              <Chart scores={{total2PA, total2PM, total3PA, total3PM}} labels={["2점슛", "3점슛"]}></Chart>
            </div>

            <div className="relative flex justify-between items-center w-3/5">
              <div className="flex flex-col w-1/2 h-full  justify-center">
                <div className="text-center h-1/5">2점슛</div>
                <div className="flex justify-center items-center h-3/5">
                  <HalfChart PA={total2PA} PM={total2PM}></HalfChart>
                </div>
                <div className="text-lg text-center h-1/5">{total2PM}/{total2PA}회</div>
              </div>

              <div className="flex flex-col w-1/2 h-full  justify-center">
                <div className="text-center h-1/5">3점슛</div>
                <div className="flex justify-center items-center h-3/5">
                  <HalfChart PA={total3PA} PM={total3PM} ></HalfChart>
                </div>
                <div className="text-lg text-center h-1/5">{total3PM}/{total3PA}회</div>
              </div>
            </div>
          </div>
        </div>

      {games.map((game, index) => (
        <RecordCard key={index} game={game}></RecordCard> //games 배열안에 game객체를 props로 준다. 각 game은 경기시각과 사용자별 기록을 갖고 있음
      ))}
       
        
      </div>
    </Wrapper>
  );
};

export default Recordroom;
