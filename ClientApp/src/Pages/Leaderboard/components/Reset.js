import React, { Component } from "react";
import { Statistic, Row, Col, Typography } from "antd";
import { RocketOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24;

export default class Reset extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col span={14}>
          <Title className="title" level={3}>
            <RocketOutlined />
            chuckthatphone
          </Title>
        </Col>
        <Col span={8} offset={2}>
          <Countdown
            className="statistic"
            title="next reset"
            value={deadline}
          ></Countdown>
        </Col>
      </Row>
    );
  }
}
