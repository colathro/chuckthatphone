import React, { Component } from "react";
import { Table, Statistic, Row, Col, Button, Typography } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import Nav from "../../Layout/Nav";

import "./Leaderboard.scss";

const { Title } = Typography;
const { Countdown } = Statistic;

const dataSource = [
  {
    key: "1",
    height: "33.2 ft",
    shoutOut: "@coltonlathrop",
  },
  {
    key: "2",
    height: "24.7 ft",
    shoutOut: "@arianamartens",
  },
  {
    key: "3",
    height: "10.3 ft",
    shoutOut: "@mattzent",
  },
];

const columns = [
  {
    title: "height",
    dataIndex: "height",
    key: "height",
  },
  {
    title: "shoutout",
    dataIndex: "shoutOut",
    key: "shoutOut",
  },
];

const deadline = Date.now() + 1000 * 60 * 60 * 24;

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="leaderboard">
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
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <div className="chuck">
          <Button
            size="large"
            type="primary"
            shape="round"
            icon={<RocketOutlined />}
            danger
          >
            chuck that phone
          </Button>
        </div>
      </div>
    );
  }
}
