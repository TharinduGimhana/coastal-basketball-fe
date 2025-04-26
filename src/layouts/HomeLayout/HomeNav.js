import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Drawer, Dropdown, Space, Avatar, Modal, Button, Menu, ConfigProvider, Typography, Form, Input, DatePicker } from "antd";
import Logo from "../../assets/png/logo.png";
import ImgNavArrow from "../../assets/png/nav_arrow.png";
import { NAV_MENU_IMTES, ROUTE_COMPETITIONS, ROUTE_CBL, ROUTE_JCBL, ROUTE_PARTNERS, ROUTE_FACILITIES } from "constants/navigation_constants";
import { Link, useHistory } from "react-router-dom";
import "./HomeLayout.css";
import { RoundButton } from "components/ButtonWidget/RoundButton/RoundButton";
import { IconWidget } from "components/IconWidget/IconWidget";
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import { MenuOutlined, CloseOutlined, LinkOutlined } from "@ant-design/icons";
import ImgAvatar from 'assets/png/avatar.png';
import NavDrawer from "./NavDrawer";
import Toast from 'components/Toast/Toast';
import { showAddUserDlg } from "pages/Admin/User/AddUserDlg/showAddUserDlg";
import { UrlSignout } from "ajax/apiUrls";
import { apiGet } from "ajax/apiServices";
import { clearUserInfo, setUserInfo } from "../../redux/reducers/userSlice";
import { clearSubscription } from "../../redux/reducers/subscriptionSlice";

const { Text } = Typography;

const HomeNav = () => {
  const userInfo = useSelector((state) => state.user);
  const userSubscription = useSelector((state) => state.subscription);
  const baseMembership = useSelector((state) => state.base_membership);
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeClass, setActiveClass] = useState("");
  const [visibleMenu, setVisibleMenu] = useState(false);
  const screenWidthSize = window.innerWidth;
  const [modal2Open, setModal2Open] = useState(false);

  const [open, setOpen] = useState(false);
  const [authInfo, setAuthInfo] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userInfo?.id) {
      setUserName(userInfo.first_name);
      setAuthInfo(userInfo);
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [userInfo]);

  const getActiveLink = (route) => {

    const { pathname } = history.location;

    if (pathname === route) {
      return true;
    }

    if (route === ROUTE_COMPETITIONS) {
      return pathname.includes("/cbl") || pathname.includes("/jcbl") || pathname.includes("/cbl-high-school");
    }
    if (route === ROUTE_FACILITIES) {
      return pathname.includes("/training_centre") || pathname.includes("/book_court");
    }
    if (route === ROUTE_PARTNERS) {
      return pathname.includes("/corporate_partners") || pathname.includes("/player_partners");
    }

    return false;
  };

  const competition_items = [
    { key: '1', label: <Link to="/cbl" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/cbl") ? "active" : ""}`}>CBL</Link> },
    { key: '2', label: <Link to="/jcbl" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/jcbl") ? "active" : ""}`}>JCBL</Link> },
    { key: '3', label: <Link to="/cbl-high-school" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/cbl-high-school") ? "active" : ""}`}>CBL High School</Link> },
  ];
  const facilities_items = [
    { key: '1', label: <Link to="/training_centre" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/training_centre") ? "active" : ""}`}>Training Centre</Link> },
    { key: '2', label: <Link to="/book_court" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/book_court") ? "active" : ""}`}>Book a court</Link> },
  ];
  const partner_items = [
    { key: '1', label: <Link to="/corporate_partners" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/corporate_partners") ? "active" : ""}`}>CORPORATE PARTNERS</Link> },
    { key: '2', label: <Link to="/player_partners" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/player_partners") ? "active" : ""}`}>PLAYER PARTNERSHIPS</Link> },
  ];

  const handleShowLogin = (type) => {
    window.location.href = "/signin";
  };

  const handleShowRegistration = () => {
    window.location.href = "/signup";
  };



  const menuUI = NAV_MENU_IMTES.map((info, index) => {
    if (info.title === "COMPETITIONS") {
      return <div key={index}><Dropdown menu={{ items: competition_items }}>
        <Col
          className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
          onMouseEnter={() => setActiveClass('active')}
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            {info.title}
            <img src={ImgNavArrow} width="26" height="26" alt="nav arrow" />
          </Space>
        </Col>
      </Dropdown></div>
    } else if (info.title === "FACILITIES") {
      return <div key={index}><Dropdown menu={{ items: facilities_items }}>
        <Col
          className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
          onMouseEnter={() => setActiveClass('active')}
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            {info.title}
            <img src={ImgNavArrow} width="26" height="26" alt="nav arrow" />
          </Space>
        </Col>
      </Dropdown></div>
    } else if (info.title === "CURRENT PARTNERS") {
      return <div key={index}><Dropdown menu={{ items: partner_items }}>
        <Col
          className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
          onMouseEnter={() => setActiveClass('active')}
          onClick={(e) => e.preventDefault()}
        >
          <Space>
            {info.title}
            <img src={ImgNavArrow} width="26" height="26" alt="nav arrow" />
          </Space>
        </Col>
      </Dropdown ></div>
    } else {
      return <Row
        key={index}
        className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
        onClick={() => history.push(info.route)}
      >
        <Space>{info.title}</Space>
      </Row>
    }
  });




  const handleProfile = async () => {
    let dlgRes = await showAddUserDlg({
      title: "Update Profile",
      userData: authInfo
    })
    if (dlgRes == null) return
    if (dlgRes !== 1) {
      dispatch(setUserInfo(dlgRes));
    }
  };

  const handleSignOut = async () => {
    apiGet(UrlSignout)
      .then((res) => {
        localStorage.removeItem('token');
        setIsAuth(false);
        dispatch(clearUserInfo());
        dispatch(clearSubscription());
        setTimeout(() => {
          window.location.href = "/";
        }, 500)
      })
      .catch((err) => {
        Toast(err, 2);
      });
  };

  const handleRegister = () => {
    if (localStorage.getItem("token")) {
      setModal2Open(true);
    } else {
      window.location.href = "/signin"
    }
  }

  const menuItems = [
    {
      key: 'user-info',
      disabled: true,
      label: (
        <Space direction="horizontal">
          <Avatar size="large" src={ImgAvatar} />
          <div>
            <Text strong>{userName}</Text>
            <br />
            <Text type="secondary">{authInfo?.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'register',
      label: (
        <Button type="link" className="btn-navbar-item" onClick={handleRegister}>
          Register
        </Button>
      ),
    },
    {
      key: 'profile',
      label: (
        <Button type="link" className="btn-navbar-item" onClick={handleProfile}>
          My Profile
        </Button>
      ),
    },
    {
      key: 'subscription',
      label: (
        <Button type="link" className="btn-navbar-item" onClick={() => {
          window.location.href = "/user/subscription"
        }}>
          Membership
        </Button>
      ),
    },
    {
      key: 'transaction',
      label: (
        <Button type="link" className="btn-navbar-item" onClick={() => {
          window.location.href = "/user/transaction"
        }}>
          Transaction
        </Button>
      ),
    },
    {
      key: 'logout',
      label: (
        <Button type="link" className="btn-navbar-item" onClick={handleSignOut}>
          Sign out
        </Button>
      ),
    },
  ];

  const menu = <Menu style={{ marginTop: '20px', marginBottom: '20px' }} items={menuItems} />;

  if (screenWidthSize > 768) {
    return (
      <>
        <nav className='nav nav-active client-admin-content'>
          <Row justify="space-between" align="middle" className="nav-rect">
            <Col>
              <Link to="/">
                <IconWidget src={Logo} className="nav-logo" />
              </Link>
            </Col>
            {menuUI}
            <Col>

              {isAuth ? (
                <div>
                  <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    onOpenChange={setOpen}
                    open={open}
                  >
                    <span style={{ cursor: 'pointer' }}>
                      <Avatar size="large" src={ImgAvatar} />
                    </span>
                  </Dropdown>
                </div>
              ) : (
                <div className="d-flex">
                  <div style={{ padding: '1px', marginRight: '10px', background: 'none', border: !isAuth ? '1px solid var(--darkPurple)' : 'none' }}>
                    <RoundButton onClick={handleShowLogin}>LOGIN</RoundButton>
                  </div>
                  <div style={{ padding: '1px', marginRight: '10px', background: 'none', border: !isAuth ? '1px solid var(--darkPurple)' : 'none' }}>
                    <RoundButton onClick={handleShowRegistration} style={{ backgroundColor: '#1b4c98' }}>SIGN UP</RoundButton>
                  </div>
                </div>
              )}
              {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
            </Col>
          </Row>
        </nav>

      </>
    );
  } else {
    return (
      <>
        <nav className={`nav nav-active ${activeClass}`}>
          <Row justify="space-between" align="middle">
            <Col>
              <Link to="/">
                <IconWidget src={Logo} className="nav-logo" />
              </Link>
            </Col>
            <Col>
              {visibleMenu ? (
                <CloseOutlined
                  style={{
                    color: "#003565",
                    cursor: "pointer",
                    fontSize: 20,
                    marginRight: 10
                  }}
                  onClick={() => setVisibleMenu(false)}
                />
              ) : (
                <MenuOutlined
                  style={{
                    color: "#003565",
                    cursor: "pointer",
                    fontSize: 20,
                    marginRight: 10
                  }}
                  onClick={() => setVisibleMenu(true)}
                />
              )}
            </Col>
          </Row>
          <Drawer
            placement={"right"}
            visible={visibleMenu}
            className="custom-drawer"
            onClose={() => setVisibleMenu(false)}
          >
            <NavDrawer />
          </Drawer>
        </nav>

      </>
    );
  }

};

export default HomeNav;