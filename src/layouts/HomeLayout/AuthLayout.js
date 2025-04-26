import React from 'react';
import { FloatButton } from 'antd'; // Ensure correct import
import HomeFooter from './HomeFooter';
import AuthNav from './AuthNav';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <AuthNav />
      {children}
      <HomeFooter />
      <FloatButton.BackTop />
    </div>
  );
};

export default AuthLayout;
