import React, { useEffect, useState } from "react";
import { Row, Col, Drawer } from "antd";
import Logo from "../../assets/png/logo_blue.png";
import {
  NAV_MENU_IMTES
} from "constants/navigation_constants";
import { useHistory } from "react-router-dom";
import "./HomeLayout.css";
import { RoundButton } from "components/ButtonWidget/RoundButton/RoundButton";
import { IconWidget } from "components/IconWidget/IconWidget";
import { MenuOutlined } from "@ant-design/icons";
import NavDrawer from "./NavDrawer";
import { ROUTE_LOGIN, ROUTE_SIGNUP } from "constants/navigation_constants";
const AuthNav = () => {
  const history = useHistory();
  const [activeClass, setActiveClass] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(false);
  const screenWidthSize = window.innerWidth;

  const getActiveLink = (route) => {
    if (history.location.pathname == route) {
      return true;
    } else {
      if (route != "/" && history.location.pathname.includes(route)) {
        return true;
      }
    }
    return false;
  };
  const menuUI = NAV_MENU_IMTES.map((info, index) => {
    return (
      <Col
        className={`login-nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
        key={index}
        onClick={() => {
          history.push(info.route);
        }}
      >
        {info.title}
      </Col>
    );
  });

  useEffect(() => {
    const handleScrollEvent = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 50) {
        setActiveClass(`nav-active`);
        return;
      }
      setActiveClass("");
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const onMenu = () => {
    setVisibleMenu(true);
  };
  if (screenWidthSize > 760) {
    return (
      <nav className={`login-nav ${activeClass}`}>
        <Row justify="space-between" align="middle" className="nav-rect">
          <Col>
            <IconWidget src={Logo} className="nav-logo" />
          </Col>
          {menuUI}
          <Col>
            <div style={{ marginTop: 10 }}>
              <RoundButton
                className="blue-border"
                onClick={() => {
                  history.push(ROUTE_SIGNUP);
                }}
              >
                REGISTER
              </RoundButton>
            </div>
          </Col>
        </Row>
      </nav>
    );
  } else {
    return (
      <nav className={`login-nav ${activeClass}`}>
        <Row justify="space-between" align="middle">
          <Col>
            <IconWidget src={Logo} className="nav-logo" />
          </Col>
          <Col>
            <MenuOutlined
              style={{
                color: "var(--mainColor)",
                cursor: "pointer",
                fontSize: 20,
                marginRight: 10,
                marginTop: 10,
              }}
              onClick={() => {
                setVisibleMenu(true);
              }}
            />
          </Col>
        </Row>
        <Drawer
          placement={"right"}
          visible={visibleMenu}
          className="custom-drawer"
          onClose={() => {
            setVisibleMenu(false);
          }}
        >
          <NavDrawer />
        </Drawer>
      </nav>
    );
  }
};

export default AuthNav;
