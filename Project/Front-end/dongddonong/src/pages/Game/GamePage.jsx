import { useState } from "react";

import Week from "../../components/Game/Week";
import Footer from "../../components/Footer";
import Calendars from "../../components/Game/Calendars";

const GamePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const selectedDateHandler = (v) => {
    setSelectedDate(v);
  };

  const setActiveStartDateHandler = (v) => {
    setActiveStartDate(v);
  };

  return (
    <div>
      <h1>선택한 날짜: {selectedDate.toDateString()}</h1>
      <h2>
        현재 월:{" "}
        {activeStartDate.activeStartDate &&
          activeStartDate.activeStartDate.toDateString()}
      </h2>
      <div className="w-full">
        <Calendars
          selectedDate={selectedDate}
          setSelectedDate={selectedDateHandler}
          activeStartDate={activeStartDate}
          setActiveStartDate={setActiveStartDateHandler}
        />
        {/* <Week onChange={selectedDateHandler} selectedDate={selectedDate} /> */}
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;
