import React, { useState, useEffect } from "react";
import { Row, Col, Space, Avatar, Modal, Menu, Typography, Button, Dropdown, ConfigProvider, Form, DatePicker, Input } from "antd";
import Logo from "../../assets/png/logo.png";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import { NAV_MENU_IMTES } from "constants/navigation_constants";
import { Link, useHistory } from "react-router-dom";
import dayjs from 'dayjs';
import useStyle from './useStyle';
import "./HomeLayout.css";
import { RoundButton } from "components/ButtonWidget/RoundButton/RoundButton";
import { IconWidget } from "components/IconWidget/IconWidget";
import ImgAvatar from 'assets/png/avatar.png';

import { UrlSignout, UrlUpdateUserProfile } from "ajax/apiUrls";
import { apiGet, apiPost } from "ajax/apiServices";
import { clearUserInfo } from "../../redux/reducers/userSlice";
import { clearSubscription } from "../../redux/reducers/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "components/Toast/Toast";
const { Text } = Typography;


const NavDrawer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const userSubscription = useSelector((state) => state.subscription);
  const baseMembership = useSelector((state) => state.base_membership);

  const [expandedMenuIndex, setExpandedMenuIndex] = useState(null);
  const [modal2Open, setModal2Open] = useState(false);
  const [open, setOpen] = useState(false);
  const { styles } = useStyle();
  const [modalVisible, setModalVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(null);
  const [userName, setUserName] = useState("");
  const [modalLoginConfirm, setLoginConfirm] = useState(false);
  const [authInfo, setAuthInfo] = useState([]);

  useEffect(() => {
    if (userInfo?.id) {
      setUserName(userInfo.first_name);
      setAuthInfo(userInfo);
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [userInfo]);

  const handleShowLogin = (type) => {
    window.location.href = "/signin";
  };

  const handleShowRegistration = () => {
    window.location.href = "/signup";
  };

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setVisiblePassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };


  const getActiveLink = (route) => {
    if (history.location.pathname === route) {
      return true;
    } else {
      if (route !== "/" && history.location.pathname.includes(route)) {
        return true;
      }
    }
    return false;
  };

  const onFinish = async (formValues) => {
    if (formValues.new_password === formValues.confirm_password) {
      const formattedDateOfBirth = formValues.dateOfBirth ? formValues.dateOfBirth.startOf('day').format('DD-MM-YYYY') : "";
      const formData = new FormData();
      formData.append("firstName", formValues.firstName);
      formData.append("lastName", formValues.lastName);
      formData.append("dateOfBirth", formattedDateOfBirth);
      formData.append("homeAddress", formValues.homeAddress);
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);
      formData.append("new_password", formValues.new_password);

      apiPost(UrlUpdateUserProfile, formData)
        .then((res) => {
          setModalVisible(false);
          setUserName(formValues.firstName);
        })
        .catch((err) => {
          Toast(err, 2);
        });

    } else {
      Toast("New password doesn't match with confirm password!", 2);
    }
  };



  const handleProfile = () => {
    setModalVisible(true);

  };

  const handleSignOut = async () => {
    apiGet(UrlSignout)
      .then((res) => {
        const { pathname } = history.location;
        localStorage.removeItem('token');
        dispatch(clearUserInfo());
        dispatch(clearSubscription());
        window.location.href = "/";
        setIsAuth(false);
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

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    setIsAuth(isAuth);
  }, []);

  const handleMenuClick = (index) => {
    setExpandedMenuIndex(expandedMenuIndex === index ? null : index);
  };
  const items = [
    { key: '1', label: <Link to="/cbl" rel="noopener noreferrer">CBL</Link> },
    { key: '2', label: <Link to="/jcbl" rel="noopener noreferrer">JCBL</Link> },
    { key: '3', label: <Link to="/cbl-high-school" rel="noopener noreferrer">CBL High School</Link> },
  ];
  const facilities_items = [
    { key: '1', label: <Link to="/training_centre" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/training_centre") ? "active" : ""}`}>Training Centre</Link> },
    { key: '2', label: <Link to="/book_court" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/book_court") ? "active" : ""}`}>Book a court</Link> },
  ];
  const partner_items = [
    { key: '1', label: <Link to="/corporate_partners" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/corporate_partners") ? "active" : ""}`}>CORPORATE PARTNERS</Link> },
    { key: '2', label: <Link to="/player_partners" rel="noopener noreferrer" className={`nav-active-item ${getActiveLink("/player_partners") ? "active" : ""}`}>PLAYER PARTNERSHIPS</Link> },
  ];

  const renderItems = () => {
    return items.map(item => (
      <div key={item.key} className={item.key !== "2" ? "nav-item" : "nav-item-gap"}>
        <Link to={item.path} className="competitions-letter">
          {item.label}
        </Link>
      </div>
    ));
  };
  const renderFacilitiesItems = () => {
    return facilities_items.map(item => (
      <div key={item.key} className={item.key !== "2" ? "nav-item" : "nav-item-gap"}>
        <Link to={item.path} className="competitions-letter">
          {item.label}
        </Link>
      </div>
    ));
  };
  const renderPartnerItems = () => {
    return partner_items.map(item => (
      <div key={item.key} className={item.key !== "2" ? "nav-item" : "nav-item-gap"}>
        <Link to={item.path} className="competitions-letter">
          {item.label}
        </Link>
      </div>
    ));
  };

  const menuUI = NAV_MENU_IMTES.map((info, index) => {
    if (info.title === "COMPETITIONS") {
      return <div key={index} menu={{ items }} className="nav-menu-section">
        <Col
          className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
          onClick={() => handleMenuClick(index)}
        >
          <Space>
            {info.title}
          </Space>
        </Col>

        {expandedMenuIndex === index && (
          <Row className="nav-sub-items" style={{ flexDirection: 'column' }}>
            {renderItems()}
          </Row>
        )}
      </div>
    } else if (info.title === "FACILITIES") {
      return <div key={index} menu={{ items }} className="nav-menu-section">
        <Col
          className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
          onClick={() => handleMenuClick(index)}
        >
          <Space>
            {info.title}
          </Space>
        </Col>

        {expandedMenuIndex === index && (
          <Row className="nav-sub-items" style={{ flexDirection: 'column' }}>
            {renderFacilitiesItems()}
          </Row>
        )}
      </div>
    } else if (info.title === "CURRENT PARTNERS") {
      return <div key={index} menu={{ items }} className="nav-menu-section">
        <Col
          className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}
          onClick={() => handleMenuClick(index)}
        >
          <Space>
            {info.title}
          </Space>
        </Col>

        {expandedMenuIndex === index && (
          <Row className="nav-sub-items" style={{ flexDirection: 'column' }}>
            {renderPartnerItems()}
          </Row>
        )}
      </div>
    } else {
      return <div key={index} menu={{ items }} className="nav-menu-section">
        <Row key={index} className={`nav-menu-item ${getActiveLink(info.route) ? "active" : ""}`}>
          <Col onClick={() => history.push(info.route)}>
            <Space>{info.title}</Space>
          </Col>
        </Row>
      </div>
    }
  });

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
        <Button type="link" className="btn-navbar-item" style={{ marginBottom: '20px' }} onClick={handleSignOut}>
          Sign out
        </Button>
      ),
    },
  ];

  const menu = <Menu style={{ marginTop: '20px' }} items={menuItems} />;

  return (
    <nav className="nav-drawer">
      <div>
        <Link to="/"><IconWidget src={Logo} className="nav-logo" /></Link>
      </div>
      <Row className="text-left mt-40">
        {menuUI}
      </Row>
      <div style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        padding: '1px',
        background: 'none'
      }}>
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
          <div className="d-flex justify-center">
            <div style={{ padding: '1px', marginRight: '10px', background: 'none', border: !isAuth ? '1px solid var(--darkPurple)' : 'none' }}>
              <RoundButton onClick={() => handleShowLogin()}>LOGIN</RoundButton>
            </div>
            <div style={{ padding: '1px', marginRight: '10px', background: 'none', border: !isAuth ? '1px solid var(--darkPurple)' : 'none' }}>
              <RoundButton onClick={handleShowRegistration} style={{ backgroundColor: '#1b4c98' }}>SIGN UP</RoundButton>
            </div>
          </div>
        )}
        {modal2Open && <ModalRegistration modal2Open={modal2Open} setModal2Open={setModal2Open} userSubscription={userSubscription} baseMembership={baseMembership} userInfo={userInfo} />}
        <Modal
          wrapClassName="vertical-center-modal"
          open={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          footer={null}
          style={{ marginTop: '120px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2 className="mb-20">My Profile</h2>
          </div>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
              initialValues={{
                firstName: authInfo?.first_name || '',
                lastName: authInfo?.last_name || '',
                dateOfBirth: authInfo?.birthday ? dayjs(authInfo?.birthday).startOf('day') : null, // Format the date to exclude the time
                homeAddress: authInfo?.address || '',
                email: authInfo?.email || '',
              }}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input placeholder="John" />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input placeholder="Doe" />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  placeholder="Select Date"
                  value={authInfo?.birthday ? dayjs(authInfo.birthday, 'DD-MM-YYYY') : null}
                />
              </Form.Item>


              <Form.Item
                label="Home Address"
                name="homeAddress"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input.TextArea rows={2} placeholder="123 Main St, City, Country" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input placeholder="Email" disabled />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input
                  type={visiblePassword.password ? 'text' : 'password'}
                  placeholder="Password"
                  suffix={
                    visiblePassword.password ? (
                      <EyeInvisibleOutlined onClick={() => togglePasswordVisibility('password')} />
                    ) : (
                      <EyeOutlined onClick={() => togglePasswordVisibility('password')} />
                    )
                  }
                />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="new_password"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input
                  type={visiblePassword.newPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  suffix={
                    visiblePassword.newPassword ? (
                      <EyeInvisibleOutlined onClick={() => togglePasswordVisibility('newPassword')} />
                    ) : (
                      <EyeOutlined onClick={() => togglePasswordVisibility('newPassword')} />
                    )
                  }
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirm_password"
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
              >
                <Input
                  type={visiblePassword.confirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  suffix={
                    visiblePassword.confirmPassword ? (
                      <EyeInvisibleOutlined onClick={() => togglePasswordVisibility('confirmPassword')} />
                    ) : (
                      <EyeOutlined onClick={() => togglePasswordVisibility('confirmPassword')} />
                    )
                  }
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Change
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </Modal>
      </div>
      <Modal
        centered
        open={modalLoginConfirm}
        onOk={() => handleShowLogin("ok")}
        onCancel={() => handleShowLogin("cancel")}
        okText="Yes"
        cancelText="No"
        closable={false} // Removes the close (×) button
      >
        <div style={{ textAlign: 'center' }}>
          <Link to="/">
            <img src={Logo} alt="Modal Image" style={{ maxWidth: '100%', marginBottom: '20px' }} />
          </Link>
          <div style={{ marginBottom: '20px', fontSize: '18px' }}>Do you want to register or continue browsing?</div>
        </div>
      </Modal>
    </nav>
  );
};

export default NavDrawer;