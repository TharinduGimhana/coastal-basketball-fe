import React, { useState } from "react";
import { Badge, Col, Divider, Row } from "antd";
import { MENU_ITEMS } from "constants/navigation_constants";
import "./MenuWidget.css";
import NotiIcon from "assets/png/ic_notification.png";
import CartIcon from "assets/png/ic_cart.png";
import LogoutIcon from "assets/png/ic_logout.png";
import RightBtnIcon from "assets/png/ic_right_btn.png";
const MenuWidget = () => {
  const onClickMenu = (link) => {};
  const menuUI = MENU_ITEMS.map((x, index) => {
    return (
      <div
        key={index}
        onClick={() => {
          onClickMenu(x.route);
        }}
      >
        <Row className="menu-item" gutter={[16, 16]}>
          <Col flex={"24px"}>{x.icon}</Col>
          <Col flex={"auto"}>{x.title}</Col>
          <Col flex={"24px"}>
            <img className="menu-right-icon" src={RightBtnIcon} />
          </Col>
        </Row>
        <Divider />
      </div>
    );
  });
  return (
    <div>
      <Row className="menu-item" gutter={[16, 16]}>
        <Col>
          <Badge
            count={3}
          >
            <img src={NotiIcon} className="menu-item-icon" />
          </Badge>
        </Col>
        <Col flex={"auto"}>Notifications</Col>
        <Col flex={"24px"}>
          <img className="menu-right-icon" src={RightBtnIcon} />
        </Col>
      </Row>
      <Divider />
      <Row className="menu-item" gutter={[16, 16]}>
        <Col flex={"24px"}>
          <Badge
            count={3}
          >
            <img src={CartIcon} className="menu-item-icon" />
          </Badge>
        </Col>
        <Col flex={"auto"}>My Cart</Col>
        <Col flex={"24px"}>
          <img className="menu-right-icon" src={RightBtnIcon} />
        </Col>
      </Row>
      <Divider />
      {menuUI}
      <Row className="menu-item" gutter={[16, 16]}>
        <Col flex={"24px"}><img src={LogoutIcon} className="menu-item-icon" /></Col>
        <Col flex={"auto"}>Logout</Col>
        <Col flex={"24px"}>
          <img className="menu-right-icon" src={RightBtnIcon} />
        </Col>
      </Row>
      <Divider />
      <div className="mt-20 mb-20 text-center">
        <p className="font-14">Version 5.0</p>
      </div>
    </div>
  );
};

export default MenuWidget;
