import { useState, useCallback, useEffect } from "react";
import { useUserContext } from "../../contexts/userContext";
import axios from "../../api/axiosConfig";

import Games from "./Games";
import Week from "../../components/Game/Week";
import Footer from "../../components/Footer";
import Calendars from "../../components/Game/Calendars";
import { getGameUserId } from "../../api/getGameUserIdApi";

const GamePage = () => {
  const user = {
    id: 3017361691,
  };
  const [data, setData] = useState([]);
  const [dates, setDates] = useState({
    selectedDate: new Date(),
    activeStartDate: new Date(),
  });
  const { selectedDate, activeStartDate } = dates;
  const [calendarData, SetCalendarData] = useState([]);

  useEffect(() => {
    const currentMonth = activeStartDate.getMonth();

    axios.get(`/game/assign/${user.id}`).then((resp) => {
      setData(resp.data.data);

      const arr = resp.data.data.map((e) => new Date(e.createdAt));
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

      <Games data={data} user={user} selectedDate={selectedDate} />

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
