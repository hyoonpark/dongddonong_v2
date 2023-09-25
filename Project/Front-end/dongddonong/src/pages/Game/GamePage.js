import { useState, useCallback, useEffect } from "react";
import { useUserContext } from "../../contexts/userContext";

import Games from "./Games";
import Week from "../../components/Game/Week";
import Footer from "../../components/Footer";
import Calendars from "../../components/Game/Calendars";

const GamePage = () => {
  const user = {
    id: 3017361691,
  };
  const [dates, setDates] = useState({
    selectedDate: new Date(),
    activeStartDate: new Date(),
  });
  const { selectedDate, activeStartDate } = dates;
  const [calendarData, SetCalendarData] = useState([]);
  const Data = [
    {
      id: 12,
      userId: 3017361691,
      gameDate: "2023-09-06 00:00:00",
      createdAt: "2023-09-25T07:58:10.336+00:00",
      isAssigned: true,
      playerHistories: [
        {
          id: 19,
          gameId: 12,
          userId: 3017361691,
          createdAt: "2023-09-25T07:58:10.336+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "3",
          twoPts: 5,
          threePts: 2,
          tryTwoPts: 10,
          tryThreePts: 3,
          total: 9,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 9,
          win: true,
        },
        {
          id: 20,
          gameId: 12,
          userId: 3035707805,
          createdAt: "2023-09-25T07:58:10.336+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "3",
          twoPts: 4,
          threePts: 2,
          tryTwoPts: 8,
          tryThreePts: 4,
          total: 8,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 9,
          win: false,
        },
      ],
    },
    {
      id: 10,
      userId: 3017361691,
      gameDate: "2023-09-10 00:00:00",
      createdAt: "2023-09-22T07:58:02.269+00:00",
      isAssigned: true,
      playerHistories: [
        {
          id: 15,
          gameId: 10,
          userId: 3019596583,
          createdAt: "2023-09-22T07:58:02.269+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "3",
          twoPts: 5,
          threePts: 2,
          tryTwoPts: 10,
          tryThreePts: 3,
          total: 9,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 9,
          win: true,
        },
        {
          id: 16,
          gameId: 10,
          userId: 3017361691,
          createdAt: "2023-09-22T07:58:02.270+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "3",
          twoPts: 4,
          threePts: 2,
          tryTwoPts: 8,
          tryThreePts: 4,
          total: 8,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 9,
          win: false,
        },
      ],
    },
    {
      id: 2,
      userId: 3017361691,
      gameDate: "2023-09-22 00:00:00",
      createdAt: "2023-09-22T07:47:29.738+00:00",
      isAssigned: true,
      playerHistories: [
        {
          id: 2,
          gameId: 2,
          userId: 3017361691,
          createdAt: "2023-09-22T07:47:29.740+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "1",
          twoPts: 6,
          threePts: 3,
          tryTwoPts: 13,
          tryThreePts: 6,
          total: 12,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 10,
          win: null,
        },
      ],
    },
    {
      id: 1,
      userId: 3017361691,
      gameDate: "2023-09-22 00:00:00",
      createdAt: "2023-09-22T07:44:48.436+00:00",
      isAssigned: true,
      playerHistories: [
        {
          id: 1,
          gameId: 1,
          userId: 3017361691,
          createdAt: "2023-09-22T07:44:48.450+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "1",
          twoPts: 5,
          threePts: 2,
          tryTwoPts: 12,
          tryThreePts: 5,
          total: 9,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 10,
          win: null,
        },
      ],
    },
    {
      id: 231,
      userId: 3017361691,
      gameDate: "2023-09-22 00:00:00",
      createdAt: "2023-08-22T07:44:48.436+00:00",
      isAssigned: true,
      playerHistories: [
        {
          id: 231,
          gameId: 1,
          userId: 3017361691,
          createdAt: "2023-09-22T07:44:48.450+00:00",
          diffProfileImg:
            "https://cdn.pixabay.com/photo/2023/09/03/11/30/fire-8230528_1280.jpg",
          mode: "1",
          twoPts: 5,
          threePts: 2,
          tryTwoPts: 12,
          tryThreePts: 5,
          total: 9,
          xyUrl:
            "https://ssafy-e204-bucket.s3.ap-northeast-2.amazonaws.com/%EC%97%B0%EC%8A%B5.csv",
          playTime: 10,
          win: null,
        },
      ],
    },
  ];

  useEffect(() => {
    const currentMonth = activeStartDate.getMonth();
    const arr = [];

    Data.map((e) => {
      arr.push(new Date(e.createdAt));
      SetCalendarData(arr);
    });

    setDates((prevState) => ({
      ...prevState,
      currentMonth,
    }));
  }, [activeStartDate]);

  const handleDateChange = useCallback((v) => {
    setDates((prevState) => ({
      ...prevState,
      selectedDate: v,
    }));
  }, []);
  const handleActiveStartDateChange = useCallback((v) => {
    setDates((prevState) => ({
      ...prevState,
      activeStartDate: v.activeStartDate || v,
    }));
  }, []);

  return (
    <div>
      <div className=" bg-secondary">
        <div className="flex flex-col px-4 mx-auto max-w-7xl">
          <div className="relative">
            <Calendars
              selectedDate={selectedDate}
              setSelectedDate={handleDateChange}
              activeStartDate={activeStartDate}
              setActiveStartDate={handleActiveStartDateChange}
              calendarData={calendarData}
            />
          </div>
          <Week
            selectedDate={selectedDate}
            setSelectedDate={handleDateChange}
            activeStartDate={activeStartDate}
            setActiveStartDate={handleActiveStartDateChange}
          />
        </div>
      </div>

      <Games Data={Data} user={user} selectedDate={selectedDate} />

      <div
        className="w-16 py-1 mx-auto mt-4 text-center text-white border cursor-pointer bg-primary rounded-xl"
        onClick={() => {
          setDates({
            selectedDate: new Date(),
            activeStartDate: new Date(),
          });
        }}
      >
        오늘
      </div>

      <Footer />
    </div>
  );
};

export default GamePage;
