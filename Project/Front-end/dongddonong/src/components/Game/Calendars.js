import { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import calendar from "../../assets/calendar.png";
import caret from "../../assets/caret.png";

const Calendars = ({ selectedDate, setSelectedDate, setActiveStartDate }) => {
  const [isClick, setIsClick] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    openCalendarHandler();
  };

  const handleActiveStartDateChange = (date) => {
    setActiveStartDate(date);
  };

  const openCalendarHandler = () => {
    setIsRotated(!isRotated);
    setIsClick(!isClick);
  };

  return (
    <div>
      <div onClick={openCalendarHandler}>
        <img
          src={caret}
          alt="업"
          className={`w-8 h-8 transition cursor-pointer ${
            isRotated ? "rotate-180" : ""
          }`}
        />
        <img src={calendar} alt="달력" className="w-10 h-10 cursor-pointer" />
      </div>
      {isClick && (
        <Calendar
          onChange={handleDateChange}
          onActiveStartDateChange={handleActiveStartDateChange}
          value={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendars;
