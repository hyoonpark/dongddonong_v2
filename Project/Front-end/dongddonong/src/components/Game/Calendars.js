import { useState, useRef } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import calendar from "../../assets/icon/calendar.png";
import caret from "../../assets/icon/caret.png";
import "./Calderas.css";

const Calendars = ({
  selectedDate,
  setSelectedDate,
  activeStartDate,
  setActiveStartDate,
}) => {
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

  const handleClassName = () => {
    return `custom-calendar ${activeStartDate.getFullYear()}년 ${
      activeStartDate.getMonth() + 1
    }월`;
  };

  const tileClassNameHandler = (e) => {
    if (e.date.getMonth() !== e.activeStartDate.getMonth()) return "hide";
  };

  const tileContentHandler = (e) => {
    if (e.date.getDate()) {
      // 해당 날짜에 맞는 작업
    }

    return null;
  };

  return (
    <>
      <div
        className={`relative h-12 cursor-pointer`}
        onClick={openCalendarHandler}
      >
        <div className="flex items-center justify-center h-12 text-center">
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
        </div>
        <div
          className={
            "absolute right-0 top-6 flex w-16 items-center -translate-y-1/2 justify-end"
          }
        >
          <img src={calendar} alt="달력" className="w-7" />
          <img
            src={caret}
            alt="업"
            className={`w-5 transition ${isRotated ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      <Calendar
        onChange={handleDateChange}
        formatDay={(e, date) => moment(date).format("DD")}
        onActiveStartDateChange={handleActiveStartDateChange}
        value={selectedDate}
        activeStartDate={activeStartDate}
        className={`${handleClassName} ${
          isClick ? "show" : ""
        } absolute right-0 custom-calendar`}
        tileClassName={tileClassNameHandler}
        tileContent={tileContentHandler}
      />
    </>
  );
};

export default Calendars;
