import React, { useState, useEffect } from 'react';
import './AdminLayout.css';
import { Row, Col } from 'antd';
import { Link, useLocation } from "react-router-dom";
import Logo from 'assets/png/footer_logo.png';
import { LaptopOutlined, HomeOutlined, SwitcherOutlined, BranchesOutlined, ReadOutlined, SettingOutlined, ProductOutlined, UserSwitchOutlined, AppstoreOutlined, DollarCircleFilled, DollarOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { ROUTE_ADMIN_DASHBOARD } from 'constants/navigation_constants';

const AdminSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar-content">
      <div className="d-flex justify-center">
        <img src={Logo} width="160" height="50" alt="Logo" />
      </div>
      <Row>
        <Col className={`sidebar-item ${activeItem === ROUTE_ADMIN_DASHBOARD ? 'active' : ''}`}>
          <Link
            to={ROUTE_ADMIN_DASHBOARD}
            className="sidebar-link"
            onClick={() => handleClick(ROUTE_ADMIN_DASHBOARD)}
          >
            <ProductOutlined /> Dashboard
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/cbl' ? 'active' : ''}`}>
          <Link
            to="/admin/cbl"
            className="sidebar-link"
            onClick={() => handleClick('/admin/cbl')}
          >
            <LaptopOutlined /> CBL
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/jcbl' ? 'active' : ''}`}>
          <Link
            to="/admin/jcbl"
            className="sidebar-link"
            onClick={() => handleClick('/admin/jcbl')}
          >
            <AppstoreOutlined /> JCBL
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/academy' ? 'active' : ''}`}>
          <Link
            to="/admin/academy"
            className="sidebar-link"
            onClick={() => handleClick('/admin/academy')}
          >
            <ReadOutlined />Academy
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/high_school' ? 'active' : ''}`}>
          <Link
            to="/admin/high_school"
            className="sidebar-link"
            onClick={() => handleClick('/admin/high_school')}
          >
            <HomeOutlined /> High School
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/branch' ? 'active' : ''}`}>
          <Link
            to="/admin/branch"
            className="sidebar-link"
            onClick={() => handleClick('/admin/branch')}
          >
            <BranchesOutlined /> Branch
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/event' ? 'active' : ''}`}>
          <Link
            to="/admin/event"
            className="sidebar-link"
            onClick={() => handleClick('/admin/event')}
          >
            <SwitcherOutlined /> Event
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/season' ? 'active' : ''}`}>
          <Link
            to="/admin/season"
            className="sidebar-link"
            onClick={() => handleClick('/admin/season')}
          >
            <SettingOutlined /> Season Setting
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/user' ? 'active' : ''}`}>
          <Link
            to="/admin/user"
            className="sidebar-link"
            onClick={() => handleClick('/admin/user')}
          >
            <UserSwitchOutlined /> User Management
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/wait_list' ? 'active' : ''}`}>
          <Link
            to="/admin/wait_list"
            className="sidebar-link"
            onClick={() => handleClick('/admin/wait_list')}
          >
            <UserSwitchOutlined /> Waitlist Management
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/partners' ? 'active' : ''}`}>
          <Link
            to="/admin/partners"
            className="sidebar-link"
            onClick={() => handleClick('/admin/partners')}
          >
            <UserSwitchOutlined /> Current Partners
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/subscription_setting' ? 'active' : ''}`}>
          <Link
            to="/admin/subscription_setting"
            className="sidebar-link"
            onClick={() => handleClick('/admin/subscription_setting')}
          >
            <DollarOutlined /> Membership Setting
          </Link>
        </Col>
        <Col className={`sidebar-item ${activeItem === '/admin/payment' ? 'active' : ''}`}>
          <Link
            to="/admin/payment"
            className="sidebar-link"
            onClick={() => handleClick('/admin/payment')}
          >
            <DollarCircleOutlined /> Payment
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default AdminSidebar;