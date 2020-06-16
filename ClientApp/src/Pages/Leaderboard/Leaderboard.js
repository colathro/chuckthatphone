import React, { Component } from "react";
import { Table, Statistic, Row, Col, Button, Typography } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import Reset from "./components/Reset";
import Stats from "./components/Stats";
import Scores from "./components/Scores";
import Chuck from "./components/Chuck";

import "./Leaderboard.scss";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="leaderboard">
        <Reset />
        <Stats />
        <Scores />
        <Chuck />
      </div>
    );
  }
}
