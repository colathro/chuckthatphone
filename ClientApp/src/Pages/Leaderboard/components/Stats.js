import React, { Component } from "react";
import { Statistic, Row, Col, Typography } from "antd";

export default class Stats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row justify="space-around" align="middle">
        <Col>
          <Statistic className="statistic" title="week's chucks" value={56} />
        </Col>
        <Col>
          <Statistic
            className="statistic"
            title="chucks all time"
            value={1403}
          />
        </Col>
        <Col>
          <Statistic className="statistic" title="broken phones" value={3} />
        </Col>
      </Row>
    );
  }
}
