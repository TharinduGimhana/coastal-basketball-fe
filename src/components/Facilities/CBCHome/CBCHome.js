import React from 'react';
import AnimatedSection from 'components/AnimatedSection/AnimatedSection';
import './CBCHome.css';
import { Row, Col } from 'antd';
import { FaHubspot, FaBasketballBall, FaUsers, FaRegHandshake } from 'react-icons/fa'; // Example icons from react-icons

const CBCHome = () => {
  return (
    <div className="home-basketball-section">
      <div className="header-section">

        <div className="home-basketball-text">
          <h1 className="home-basketball-title mb-10">
            <AnimatedSection type="top">THE HOME OF BASKETBALL <span className="highlight">COMPETITIONS</span></AnimatedSection>
          </h1>
          <AnimatedSection type="top">
          Coastal Basketball Centre (CBC) aims to be the centre for all competitive basketball activities in the region.
          As the dedicated home base for the Coastal Basketball League (CBL), CBC provides an environment
          for players, coaches, and fans alike.Our modern facilities are designed to host a wide range of events, 
          from high-intensitiy league games to youth development competitions, making CBC the ultimate destination
          for basketball enthusiasts.
          </AnimatedSection>
        </div>
      </div>


      <div className="icons-section">
        <Row>
          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaHubspot className="icon centralized-hub-icon" />
              <h3>CENTRALIZED HUB</h3>
              <p className='facility-icon-desc'>CBC brings together its Basketball Operations under one roof, fostering a sense of community and continuity.</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaBasketballBall className="icon top-notch-facilities-icon" />
              <h3>FACILITIES</h3>
              <p className='facility-icon-desc'>Equipped with professional courts training ares.</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaUsers className="icon player-development-icon" />
              <h3>PLAYER DEVELOPMENT</h3>
              <p className='facility-icon-desc'>CBC's resources support player growth from grassroots to elite levels, making it the ideal launchpad for budding talent.</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaRegHandshake className="icon community-engagement-icon" />
              <h3>COMMUNITY ENGAGEMENT</h3>
              <p className='facility-icon-desc'>Hosting events year-round, CBC not only serves athletes but also engages local communities, inspiring the next generation of basketball stars.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CBCHome;
