import React, { useEffect, useState } from "react";
import { Row, Col, Drawer, Badge, Avatar, Popover } from "antd";
import Logo from "assets/png/logo.png";
import CartBag from "assets/png/ic_cart_bag.png";
import SecurityImg from "assets/png/ic_security.png";
import AlertImg from "assets/png/ic_bell.png";
import ArrowImg from "assets/png/ic_arrow_down.png";
import MenuImg from "assets/png/ic_menu.png";
import Customer from "assets/png/customer3.png";
import CloseIcon from "assets/png/ic_close.png";
import { NAV_MAIN_MENU_IMTES } from "constants/navigation_constants";
import { useHistory } from "react-router-dom";
import { RoundButton } from "components/ButtonWidget/RoundButton/RoundButton";
import { IconWidget } from "components/IconWidget/IconWidget";
import { MenuOutlined } from "@ant-design/icons";
import { ROUTE_LOGIN, ROUTE_SIGNUP } from "constants/navigation_constants";
import MenuWidget from "components/MenuWidget/MenuWidget";
// import NavDrawer from "./NavDrawer";

const MainNav = () => {
  const history = useHistory();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const screenWidthSize = window.innerWidth;
  const handlePopoverVisibleChange = () => {
    setOpenMenu(!openMenu);
  };
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
  const menuUI = NAV_MAIN_MENU_IMTES.map((info, index) => {
    return (
      <Col
        className={`nav-main-menu-item ${
          getActiveLink(info.route) ? "active" : ""
        }`}
        key={index}
        onClick={() => {
          history.push(info.route);
        }}
      >
        {info.title}
      </Col>
    );
  });

  const MenuHeader = () => {
    return (
      <Row className="menu-header" gutter={[16, 16]} align="middle">
        <Col flex={"auto"}>
          <span className="font-16 bold">Menu</span>
        </Col>
        <Col flex={"32px"}>
          <img
            className="menu-close-icon"
            src={CloseIcon}
            onClick={() => {
              setOpenMenu(false);
            }}
          />
        </Col>
      </Row>
    );
  };
  return (
    <nav className="nav-main">
      <div className="security-alert-rect">
        <img src={SecurityImg} className="badge-img" />
        <span className="badge-cnt">
          Stay Informed! Visit the SA Department of Health's Website for
          COVID-19 Updates:{" "}
          <a
            className="security-alert-link"
            href="https://www.sacoronavirus.co.za"
          >
            www.sacoronavirus.co.za
          </a>
        </span>
      </div>
      {screenWidthSize > 768 ? (
        <Row justify="space-between" align="middle" className="nav-main-rect">
          <Col>
            <Link to="/"><IconWidget src={Logo} className="nav-logo" /></Link>
          </Col>
          {menuUI}
          <Col className="mt-10">
            <div>
              <RoundButton
                className="cart-alert-button"
                onClick={() => {
                  history.push(ROUTE_LOGIN);
                }}
              >
                <Row justify="center" align="middle">
                  <Col>
                    <img src={CartBag} className="badge-img" />
                  </Col>
                  <Col>
                    <span className="badge-cnt">0</span>
                  </Col>
                </Row>
              </RoundButton>
            </div>
          </Col>
          <Col className="mt-10">
            <Badge
              count={3}
              offset={[-10, 10]}
              style={{
                background: "var(--whiteColor)",
                color: "var(--mainColor)",
                cursor: "pointer",
              }}
            >
              <img src={AlertImg} className="bell-img" />
            </Badge>
          </Col>
          <Col className="mt-10">
            <Badge
              count={<img src={ArrowImg} className="check-img" />}
              offset={[-5, 30]}
            >
              <Avatar size="large" src={Customer} className="avatar-img" />
            </Badge>
          </Col>
          <Col className="mt-10">
            <Popover
              content={<MenuWidget />}
              title={MenuHeader}
              trigger="hover"
              overlayClassName="menu-widget"
              visible={openMenu}
              onVisibleChange={handlePopoverVisibleChange}
            >
              <img src={MenuImg} className="menu-img" />
            </Popover>
          </Col>
        </Row>
      ) : (
        <>
          <Row  align="middle" className="nav-main-rect">
            <Col flex={"auto"}>
              <IconWidget src={Logo} className="nav-logo" />
            </Col>
            <Col>
              <Badge
                count={<img src={ArrowImg} className="check-img" />}
                offset={[-5, 30]}
              >
                <Avatar size="large" src={Customer} className="avatar-img" />
              </Badge>
            </Col>
            <Col>
              <Popover
                content={<MenuWidget />}
                title={MenuHeader}
                trigger="hover"
                overlayClassName="menu-widget"
                visible={openMenu}
                onVisibleChange={handlePopoverVisibleChange}
              >
                <img src={MenuImg} className="menu-img" />
              </Popover>
            </Col>
          </Row>
          <Row justify="space-between" align="middle" className="nav-main-rect">
            {menuUI}
          </Row>
        </>
      )}
    </nav>
  );
};

export default MainNav;
