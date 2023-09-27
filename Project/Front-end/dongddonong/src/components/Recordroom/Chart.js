import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Chart(props) {
  console.log(props.labels);
  const data = {
    labels: ["two", "three"],
    datasets: [
      {
        data: [props.scores['total2PM'], props.scores['total3PM']],
        backgroundColor: ["#f8c2ac", "#ee6730"],
      },
    ],
  };
  console.log(props.scores['total3PM']);
  data["labels"] = props.labels;
  return <Doughnut data={data} />;
}
