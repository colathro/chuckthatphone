import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";

var data = [];
var iteration = 0;

function getNewSeries() {
  iteration += 1;
  if (iteration > 10) {
    data = data.slice(1, data.length);
  }
  data.push({
    x: iteration,
    y: Math.floor(Math.random() * 10),
  });
}

function resetData() {
  // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
  data = data.slice(data.length - 50, data.length);
}

export default class ChuckModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          data: data.slice(),
        },
      ],
      options: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["#ff4d4f"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Dynamic Updating Chart",
          align: "left",
        },
        markers: {
          size: 0,
        },
        xaxis: { labels: { show: false } },
        yaxis: {
          labels: { show: false },
          max: 100,
        },
        legend: {
          show: false,
        },
      },
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      getNewSeries();

      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: data,
        },
      ]);
    }, 200);
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="90%"
        />
      </div>
    );
  }
}
