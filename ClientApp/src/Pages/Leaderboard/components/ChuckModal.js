import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { accelerometer } from "react-native-sensors";

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
          text: "Phone Velocity",
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

  subscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
    getNewSeries();

    ApexCharts.exec("realtime", "updateSeries", [
      {
        data: (x + y + z) / 3,
      },
    ]);
  });

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
