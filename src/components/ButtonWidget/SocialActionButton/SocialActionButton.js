import React from "react";
import { Row, Col, } from "antd";
import "./SocialActionButton.css";
import Icon from '@ant-design/icons';

const SocialActionButton = (props) => {
  const { isActive, icon, title, onClickAction } = props;

  return (
    <Row
      align={"middle"}
      gutter={8}
      className="social-action-button custom-button"
      justify={"center"}
      onClick={onClickAction}
    >
      <Col>
        <Icon
          component={icon}
          className={`newsfeed-item-button-icon ${
            isActive === true ? "newsfeed-item-button-active" : ""
          }`}
        />
      </Col>
      <Col>
        <span
          className={`${
            isActive === true ? "newsfeed-item-button-active" : ""
          }`}
        >
          {title}
        </span>
      </Col>
    </Row>
  );
};

export default SocialActionButton;
