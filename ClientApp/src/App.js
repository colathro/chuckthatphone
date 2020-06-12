import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Home from "./components/Home";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    );
  }
}
