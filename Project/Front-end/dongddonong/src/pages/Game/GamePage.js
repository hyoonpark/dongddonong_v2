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
      <div className="flex flex-col px-4 mx-auto bg-secondary max-w-7xl">
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

      <Games />

      <Footer />
    </div>
  );
};

export default GamePage;
