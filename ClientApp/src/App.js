import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Leaderboard} />
      </BrowserRouter>
    );
  }
}
