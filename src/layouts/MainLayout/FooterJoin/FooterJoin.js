import { Col, Row } from "antd";
import { BottomDescription } from "components/Description/BottomDescription/BottomDescription";
import React from "react";
import "./FooterJoin.css";
import IconJoin from "../../../assets/png/join_mobile_women.png";
import IconJoinBack from "../../../assets/png/join_mobile_back.png";
import IconGoogle from "../../../assets/png/ic_google.png";
import IconApple from "../../../assets/png/ic_apple.png";
import IconHuawei from "../../../assets/png/ic_hw.png";
import { RoundButton } from "components/ButtonWidget/RoundButton/RoundButton";
import { IconWidget } from "components/IconWidget/IconWidget";
const FooterJoin = (props) => {
  const screenWidthSize = window.innerWidth;
  return (
    <div className="join-rect">
      {screenWidthSize > 768 ? (
        <Row className="join-main" justify="space-between" align="center">
          <Col className="p-50">
            <div className="font-18 bold blue mt-60">GET IT NOW</div>
            <div className="font-36 bold white mt-20">
              Download our app and shop
            </div>
            <div className="font-36 bold white">
              on-the-go 24/7 all year round
            </div>
            <div className="mt-20">
              <Row>
                <Col>
                  <IconWidget src={IconApple} className="app-button" />
                  <IconWidget src={IconGoogle} className="app-button" />
                  <IconWidget src={IconHuawei} className="app-button" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="pr-30">
            <img src={IconJoin} className="join-user-img" />
          </Col>
        </Row>
      ) : (
        <Row className="join-main" justify="space-between" align="center">
          <Col className="mt-30">
            <img src={IconJoinBack} className="join-back-img" />
          </Col>
          <Col className="pl-50 pr-50">
            <div className="font-18 bold blue mt-60">GET IT NOW</div>
            <div className="font-36 bold white mt-20">
              Download our app and shop
            </div>
            <div className="font-36 bold white">
              on-the-go 24/7 all year round
            </div>
            <div className="mt-20">
              <RoundButton
                style={{
                  background: "var(--mainColor)",
                  borderColor: "var(--mainColor)",
                  marginLeft: 0,
                  fontWeight: 600,
                }}
              >
                Sign Up
              </RoundButton>
            </div>
          </Col>
          <Col style={{ margin: "auto" }}>
            <img src={IconJoin} className="join-user-img" />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FooterJoin;
