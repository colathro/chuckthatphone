import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import {
  OrderedListOutlined,
  RocketOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "./Nav.scss";

const style = {
  overflow: "hidden",
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: "44px",
};

const rowStyle = {
  height: "100%",
};

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.tab,
    };
  }

  getCalculatedStyle(tab) {
    if (tab === this.state.activeTab) {
      return "icon active-icon";
    } else {
      return "icon";
    }
  }

  gotoLeaderboard() {
    this.props.history.push("/leaderboard");
  }
  gotoChuck() {
    this.props.history.push("/chuck");
  }
  gotoInfo() {
    this.props.history.push("/info");
  }

  render() {
    return <div id="nav">{this.props.children}</div>;
  }
}
