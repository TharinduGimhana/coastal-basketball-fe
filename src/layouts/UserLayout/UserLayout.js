import { FloatButton } from 'antd';
import React from 'react';
import './UserLayout.css';
import HomeNav from 'layouts/HomeLayout/HomeNav';

const UserLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <div className="user-main-content">
        <HomeNav />
        <div className="user-content">
          {children}
        </div>
      </div>
      <FloatButton.BackTop />
    </div>
  );
};

export default UserLayout;