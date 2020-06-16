import React, { Component } from "react";
import { Button, Modal } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import ChuckModal from "./ChuckModal";

export default class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <div className="chuck">
        <Button
          size="large"
          type="primary"
          shape="round"
          icon={<RocketOutlined />}
          danger
          onClick={this.showModal}
        >
          chuck that phone
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          footer={null}
          closable={false}
          title={<></>}
          className="chuck-modal"
        >
          <ChuckModal />
        </Modal>
      </div>
    );
  }
}
