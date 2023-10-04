import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const HalfChart = (props) => {
  const data = {
    datasets: [
      {
        data: [props.PM, props.PA-props.PM],
        backgroundColor: ["gray", "#e6e6e6"],
        display: true,
        borderColor: "white",
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        rotation: -90,
        circumference: 180,
        cutout: "60%",
        maintainAspectRatio: true,
        responsive: true,
      }}
    />
  );
};

export default HalfChart;
