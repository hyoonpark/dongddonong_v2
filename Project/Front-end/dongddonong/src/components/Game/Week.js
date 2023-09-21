import { useCallback, useMemo, useEffect } from "react";

const Day = ({ date, onClick, isDateSelected }) => {
  const getDayClassName = () => {
    const baseClassName =
      "text-center hover:cursor-pointer border-primary hover:border-b-2";
    return isDateSelected(date) ? `${baseClassName} border-b-2` : baseClassName;
  };

  return (
    <div className={getDayClassName()} onClick={() => onClick(date)}>
      {date.getDate()}
    </div>
  );
};

const Week = ({
  selectedDate,
  setSelectedDate,
  activeStartDate,
  setActiveStartDate,
}) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const getWeekArray = (startDate) => {
    const weekArray = [];
    const startDayOfWeek = startDate.getDay();
    const firstDate = new Date(startDate);
    firstDate.setDate(startDate.getDate() - startDayOfWeek);

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDate);
      date.setDate(firstDate.getDate() + i);
      weekArray.push(date);
    }

    return weekArray;
  };

  const weekArray = useMemo(
    () => getWeekArray(activeStartDate),
    [activeStartDate]
  );

  const handleClick = useCallback(
    (date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const isDateSelected = useCallback(
    (date) => {
      return (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      );
    },
    [selectedDate]
  );

  const goToNextWeek = () => {
    const nextWeekDate = new Date(weekArray[0]);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);

    setActiveStartDate(nextWeekDate);
  };

  const goToPreviousWeek = () => {
    const previousWeekDate = new Date(weekArray[0]);
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);

    setActiveStartDate(previousWeekDate);
  };

  useEffect(() => {
    setActiveStartDate(selectedDate);
  }, [selectedDate, setActiveStartDate]);

  return (
    <div className="text-center px-4">
      <div className="flex justify-between">
        <button onClick={goToPreviousWeek}>＜</button>

        <div className="w-3/4">
          <div className="flex justify-between">
            {daysOfWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>

          <div className="flex justify-between">
            {weekArray.map((date, index) => (
              <Day
                key={index}
                date={date}
                onClick={handleClick}
                isDateSelected={isDateSelected}
              />
            ))}
          </div>
        </div>

        <button onClick={goToNextWeek}>＞</button>
      </div>
    </div>
  );
};

export default Week;
