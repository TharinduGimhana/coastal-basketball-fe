import { FloatButton } from 'antd';
import React from 'react';
import HomeFooter from './HomeFooter';
import HomeNav from './HomeNav';


const HomeLayout = ({ children }) => {
  return (
    <div className="homelayout-content">
      <HomeNav />
      {children}
      <HomeFooter />
      <FloatButton.BackTop className="backtop-button" />
    </div>
  );
};

export default HomeLayout;
