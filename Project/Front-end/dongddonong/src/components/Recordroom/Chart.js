import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["two", "three"],
  datasets: [
    {
      label: "of Votes",
      data: [2, 3],
      backgroundColor: ["#ee6730", "#f8c2ac"],
      borderColor: ["#ee6730", "#f8c2ac"],
      borderWidth: 1,
    },
  ],
};

export default function Chart(props) {
  console.log(props.labels);
  data["labels"] = props.labels;
  return <Doughnut data={data} />;
}
