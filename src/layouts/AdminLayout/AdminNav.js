import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Menu, Dropdown, Space, Typography, Modal, Button, Form, Input, Row, Col } from 'antd';
import { UserOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ModalRegistration from "components/RegistrationModal/RegistrationModal";
import ImgAvatar from 'assets/png/avatar.png';
import Toast from 'components/Toast/Toast';

import './AdminLayout.css';
import { ROUTE_ADMIN_ACADEMY, ROUTE_ADMIN_BRANCH, ROUTE_ADMIN_CBL, ROUTE_ADMIN_DASHBOARD, ROUTE_ADMIN_EVENT, ROUTE_ADMIN_HIGHSCHOOL, ROUTE_ADMIN_JCBL, ROUTE_ADMIN_PARTNER, ROUTE_ADMIN_PAYMENT, ROUTE_ADMIN_SEASON, ROUTE_ADMIN_SUBSCRIPTION, ROUTE_ADMIN_USER, ROUTE_ADMIN_WAITLIST } from 'constants/navigation_constants';
import { useLocation } from "react-router-dom";
import { apiPost } from 'ajax/apiServices';
import { UrlAdminUpdateProfile } from 'ajax/apiUrls';
import { useDispatch, useSelector } from 'react-redux';
import { clearAdminInfo } from '../../redux/reducers/adminSlice';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.admin)
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard Management");

  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle visibility for the password field
  const togglePasswordVisibility = (field) => {
    setVisiblePassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem('admin_token');
    dispatch(clearAdminInfo());
    window.location.href = "/admin/login";
  };

  const handleProfile = () => {
    setModalVisible(true);
  };

  const onFinish = async (formValues) => {
    if (formValues.new_password === formValues.confirm_password) {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formValues.email);
      formDataToSend.append("password", formValues.password);
      formDataToSend.append("new_password", formValues.new_password);

      apiPost(UrlAdminUpdateProfile, formDataToSend)
        .then((res) => {
          Toast('Profile updated successfully.', 1);
          setModalVisible(false);
        })
        .catch((err) => {
          Toast(err, 2);
        });
    } else {
      Toast("New password doesn't match with confirm password!", 2);
    }
  };

  const menuItems = [
    {
      key: 'user-info',
      disabled: true,
      label: (
        <Space direction="horizontal">
          <Avatar size="large" src={ImgAvatar} />
          <div>
            <Text strong>{adminInfo.name}</Text>
            <br />
            <Text type="secondary">{adminInfo.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      type: 'divider',
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
      key: 'logout',
      label: (
        <Button type="link" className="btn-navbar-item" onClick={handleSignOut}>
          Sign out
        </Button>
      ),
    },
  ];

  const menu = <Menu items={menuItems} />;

  useEffect(() => {
    let path = location.pathname;

    let tmpTitle = ''
    if (path == ROUTE_ADMIN_DASHBOARD) {
      tmpTitle = "Dashboard"
    } else if (path == ROUTE_ADMIN_CBL) {
      tmpTitle = "CBL"
    } else if (path == ROUTE_ADMIN_JCBL) {
      tmpTitle = "JCBL"
    } else if (path == ROUTE_ADMIN_ACADEMY) {
      tmpTitle = "Academy"
    } else if (path == ROUTE_ADMIN_HIGHSCHOOL) {
      tmpTitle = "High School"
    } else if (path == ROUTE_ADMIN_BRANCH) {
      tmpTitle = "Branch"
    } else if (path == ROUTE_ADMIN_EVENT) {
      tmpTitle = "Event"
    } else if (path == ROUTE_ADMIN_SEASON) {
      tmpTitle = "Season"
    } else if (path == ROUTE_ADMIN_USER) {
      tmpTitle = "User"
    } else if (path == ROUTE_ADMIN_PARTNER) {
      tmpTitle = "Partners"
    } else if (path == ROUTE_ADMIN_SUBSCRIPTION) {
      tmpTitle = "Membership"
    } else if (path == ROUTE_ADMIN_PAYMENT) {
      tmpTitle = "Payment"
    } else if (path == ROUTE_ADMIN_WAITLIST) {
      tmpTitle = "Waitlist"
    }
    setPageTitle(tmpTitle)
  }, [location])
  return (
    <Header className="admin-navbar">
      <Row wrap={false} style={{ width: '100%' }}>
        <Col flex="auto">
          <h1>{pageTitle} Management</h1>
        </Col>
        <Col flex="none">
          <Dropdown
            overlay={menu}
            trigger={['click']}
            onOpenChange={setOpen}
            open={open}
          >
            <span style={{ cursor: 'pointer', top: '0' }}>
              <Avatar size="large" src={ImgAvatar} />
            </span>
          </Dropdown></Col>
      </Row>

      <Modal
        wrapClassName="vertical-center-modal"
        open={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 className="mb-20">My Profile</h2>
        </div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}
          initialValues={{
            email: adminInfo.email, // Set the initial value for the email field
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type={visiblePassword.password ? "text" : "password"} // Toggle visibility
              placeholder="Password"
              suffix={
                visiblePassword.password ? (
                  <EyeInvisibleOutlined
                    onClick={() => togglePasswordVisibility("password")}
                  />
                ) : (
                  <EyeOutlined onClick={() => togglePasswordVisibility("password")} />
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="new_password"
            rules={[{ required: true, message: "Please input your New Password!" }]}
          >
            <Input
              type={visiblePassword.newPassword ? "text" : "password"} // Toggle visibility
              placeholder="New Password"
              suffix={
                visiblePassword.newPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => togglePasswordVisibility("newPassword")}
                  />
                ) : (
                  <EyeOutlined onClick={() => togglePasswordVisibility("newPassword")} />
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            rules={[{ required: true, message: "Please input your Confirm Password!" }]}
          >
            <Input
              type={visiblePassword.confirmPassword ? "text" : "password"} // Toggle visibility
              placeholder="Confirm Password"
              suffix={
                visiblePassword.confirmPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  />
                ) : (
                  <EyeOutlined onClick={() => togglePasswordVisibility("confirmPassword")} />
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
      </Modal>
    </Header>
  );
};

export default AppHeader;