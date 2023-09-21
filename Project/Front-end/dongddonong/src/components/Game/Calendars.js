import { useState, Fragment } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import calendar from "../../assets/calendar.png";
import caret from "../../assets/caret.png";
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
    <Fragment>
      <div
        className="relative h-12 cursor-pointer"
        onClick={openCalendarHandler}
      >
        <div className="text-center h-12 flex justify-center items-center">
          {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
        </div>
        <div
          className={
            "absolute right-0 top-6 flex w-16 items-center -translate-y-1/2"
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

      {isClick && (
        <Calendar
          onChange={handleDateChange}
          formatDay={(e, date) => moment(date).format("DD")}
          onActiveStartDateChange={handleActiveStartDateChange}
          value={selectedDate}
          activeStartDate={activeStartDate}
          className={`${handleClassName} absolute right-0`}
          tileClassName={tileClassNameHandler}
          tileContent={tileContentHandler}
        />
      )}
    </Fragment>
  );
};

export default Calendars;
