import { useState, useCallback, useEffect } from "react";
import axios from "../../api/axiosConfig";
import Games from "./Games";
import Week from "../../components/Game/Week";
import Footer from "../../components/Footer";
import Calendars from "../../components/Game/Calendars";

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
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentMonth = activeStartDate.getMonth();
      try {
        const resp = await axios.get(`/game/assign/${user.id}`, {
          params: { isAssigned: true },
        });
        setData(resp.data.data);
        const arr = resp.data.data.map((e) => new Date(e.createdAt));
        setCalendarData(arr);
        setDates((prevState) => ({
          ...prevState,
          currentMonth,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [activeStartDate, user.id]);

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
