import React, { Component } from "react";
import { Table } from "antd";

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

export default class Scores extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    );
  }
}
