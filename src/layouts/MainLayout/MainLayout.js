import React from 'react';
import MainNav from './MainNav';
import { FloatButton } from 'antd';
import FooterJoin from './FooterJoin/FooterJoin';
import "./MainLayout.css";
import HomeFooter from 'layouts/HomeLayout/HomeFooter';

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainNav />
      {children}
      <FooterJoin/>
      <HomeFooter />
      {/* <FloatButton.BackTop /> */}
    </div>
  );
};

export default MainLayout;
