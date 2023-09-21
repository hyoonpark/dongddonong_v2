import { useState, useCallback, useEffect } from "react";

import Games from "./Games";
import Week from "../../components/Game/Week";
import Footer from "../../components/Footer";
import Calendars from "../../components/Game/Calendars";

const GamePage = () => {
  const [dates, setDates] = useState({
    selectedDate: new Date(),
    activeStartDate: new Date(),
  });

  const { selectedDate, activeStartDate } = dates;

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

  useEffect(() => {
    const currentMonth = activeStartDate.getMonth();
    setDates((prevState) => ({
      ...prevState,
      currentMonth,
    }));
  }, [activeStartDate]);

  return (
    <div>
      <div className=" bg-secondary">
        <div className="flex flex-col px-4 mx-auto max-w-7xl">
          <div className="relative">
            <Calendars
              className="absolute right-0"
              selectedDate={selectedDate}
              setSelectedDate={handleDateChange}
              activeStartDate={activeStartDate}
              setActiveStartDate={handleActiveStartDateChange}
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

      <Games />

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
