import { CircleImageButton } from "components/ButtonWidget/CircleImageButton/CircleImageButton";
import React from "react";
import "./ChatOpenWidget.css";
import { RightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
const ChatOpenWidget = (props) => {
  const { title, description, logo, chatText } = props;
  return (
    <div className="chat-open-widget">
      <div className="chat-open-content">
        <Row gutter={8}>
          <Col>
            <img src={logo} className="circle-image" />
          </Col>
          <Col>
            <p className="font-14 bold">{title}</p>
            <p className="chat-open-description">{description}</p>
          </Col>
        </Row>
      </div>
      <div className="chat-open-button">
        {chatText == undefined ? "Chat Now" : chatText}
        <RightOutlined className="chat-right" />
      </div>
    </div>
  );
};

export default ChatOpenWidget;
