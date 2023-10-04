import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import ball from "../../assets/ball.png";

const CircularProgressbar = ({ data }) => {
  return (
    <div className="max-w-[200px]">
      <CircularProgressbarWithChildren
        value={isNaN(data) ? 50 : data}
        strokeWidth={12}
        styles={{
          path: {
            stroke: "var(--primary)",
            strokeLinecap: "round",
          },
          trail: {
            stroke: "#9e9e9e",
          },
        }}
      >
        <img
          className="absolute left-1/2 -translate-x-1/2 w-2/3 -z-10"
          src={ball}
          alt="다은"
        />
        <div className="text-center">
          <strong className="text-2xl">
            {isNaN(parseInt(data)) ? " - " : parseInt(data)}%
          </strong>
          <div>슛 성공률</div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgressbar;
