import React from 'react';
import './CBCHome.css';
import { Row, Col } from 'antd';
import { FaHubspot, FaBasketballBall, FaUsers, FaRegHandshake } from 'react-icons/fa'; // Example icons from react-icons

const CBCHome = () => {
  return (
    <div className="home-basketball-section">
      <div className="header-section">
        <h1 className="home-basketball-title">
          THE HOME OF BASKETBALL <span className="highlight">COMPETITIONS</span>
        </h1>
        <p className="home-basketball-text">
          Coastal Basketball Centre (CBC) is the heart of all competitive basketball activities in the region.
          As the dedicated home base for the Coastal Basketball League (CBL), CBC provides a state-of-the-art environment
          for players, coaches, and fans alike.Our modern facilities are designed to host a wide range of events, 
          from high-intensitiy league games to youth development competitions, making CBC the ultimate destination
          for basketball enthusiasts.
        </p>
      </div>


      <div className="icons-section">
        <Row>
          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaHubspot className="icon centralized-hub-icon" />
              <h3>CENTRALIZED HUB</h3>
              <p>CBC brings together all major basketball competitions under one roof, fostering a sense of community and continuity.</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaBasketballBall className="icon top-notch-facilities-icon" />
              <h3>TOP-NOTCH FACILITIES</h3>
              <p>Equipped with professional courts, training ares, and spectator amenities, CBC ensures every game is played at the highest standard.</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaUsers className="icon player-development-icon" />
              <h3>PLAYER DEVELOPMENT</h3>
              <p>CBC's resources support player growth from grassroots to elite levels, making it the ideal launchpad for budding talent.</p>
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div className="icon-card">
              <FaRegHandshake className="icon community-engagement-icon" />
              <h3>COMMUNITY ENGAGEMENT</h3>
              <p>Hosting events year-round, CBC not only serves athletes but also engages local communities, inspiring the next generation of basketball stars.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CBCHome;
