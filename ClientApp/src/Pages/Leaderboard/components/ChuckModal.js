import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";

var data = [{ x: 1, y: 1 }];
var iteration = 0;

window.addEventListener(
  "devicemotion",
  (deviceMotionEvent) => {
    var acceleration = deviceMotionEvent.accelerationIncludingGravity;
    getNewSeries(acceleration.x, acceleration.y, acceleration.z);

    ApexCharts.exec("realtime", "updateSeries", [
      {
        data: data,
      },
    ]);
  },
  true
);

function getNewSeries(x, y, z) {
  iteration += 1;
  if (iteration > 10) {
    data = data.slice(1, data.length);
  }
  data.push({
    x: iteration,
    y: (x + y + z) / 3,
  });
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
