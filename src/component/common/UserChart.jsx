import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserChart = ({ correctAnswer, correctSubmission }) => {
  const correctRatio = parseInt((correctSubmission / correctAnswer) * 100);

  const data = {
    datasets: [
      {
        data: [correctRatio, 100 - correctRatio],
        backgroundColor: ["#05A4C3", "#D7D7D7"],
        borderWidth: 0,
        cutout: "85%",
      },
    ],
  };

  const renderValueInCenter = {
    id: "renderValueInCenter",
    beforeDraw: (chart) => {
      const { width } = chart;
      const { ctx } = chart;
      const totalValue = chart.data.datasets[0].data[0];

      ctx.save();
      ctx.font = "15px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${totalValue}%`,
        width / 2,
        chart.chartArea.top + chart.chartArea.height / 2
      );
      ctx.restore();
    },
  };

  return <Doughnut data={data} plugins={[renderValueInCenter]} />;
};

export default UserChart;
